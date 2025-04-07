
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from "@/components/ui/use-toast";

// Define types for our context
type AppRole = 'viewer' | 'manager' | 'admin';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  userRole: AppRole | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  hasPermission: (requiredRole: AppRole | AppRole[]) => boolean;
  requiresAuth: (path: string) => boolean;
};

// Define demo accounts
const DEMO_ACCOUNTS = {
  'admin@demo.com': { role: 'admin', password: 'password123' },
  'manager@demo.com': { role: 'manager', password: 'password123' },
  'viewer@demo.com': { role: 'viewer', password: 'password123' },
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Function to fetch the user's role
  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        return null;
      }

      return data?.role as AppRole;
    } catch (error) {
      console.error('Error in fetchUserRole:', error);
      return null;
    }
  };

  // Set up auth state listener
  useEffect(() => {
    setLoading(true);

    // Set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Defer role fetching to avoid potential Supabase deadlocks
          setTimeout(async () => {
            const role = await fetchUserRole(session.user.id);
            setUserRole(role);
          }, 0);
        } else {
          setUserRole(null);
        }

        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const role = await fetchUserRole(session.user.id);
        setUserRole(role);
      }

      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Check if this is a demo account
      if (email in DEMO_ACCOUNTS && DEMO_ACCOUNTS[email as keyof typeof DEMO_ACCOUNTS].password === password) {
        const role = DEMO_ACCOUNTS[email as keyof typeof DEMO_ACCOUNTS].role as AppRole;
        
        // Create a mock user and session for demo accounts
        const mockUser = {
          id: `demo-${role}`,
          email: email,
          user_metadata: { name: `${role.charAt(0).toUpperCase() + role.slice(1)} Demo` },
          app_metadata: { role: role },
          created_at: new Date().toISOString(),
        } as unknown as User;
        
        // Mock session for demo accounts
        const mockSession = {
          access_token: `demo-token-${role}`,
          refresh_token: `demo-refresh-${role}`,
          user: mockUser,
        } as unknown as Session;
        
        // Set the mock user and session
        setUser(mockUser);
        setSession(mockSession);
        setUserRole(role);
        
        toast({
          title: "Connexion de démonstration réussie",
          description: `Vous êtes connecté en tant que compte de ${role}.`
        });
        
        navigate('/');
        return;
      }
      
      // Regular Supabase authentication
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        throw error;
      }

      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté à votre compte."
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Erreur de connexion",
        description: error?.message || "Une erreur s'est produite lors de la connexion.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      setLoading(true);
      
      // Check if this is a demo session
      if (user?.id && user.id.startsWith('demo-')) {
        // Just clear the session state for demo users
        setUser(null);
        setSession(null);
        setUserRole(null);
        
        toast({
          title: "Déconnexion réussie",
          description: "Vous avez été déconnecté avec succès."
        });
        
        navigate('/');
        return;
      }
      
      // Regular Supabase sign out
      await supabase.auth.signOut();
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès."
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Erreur de déconnexion",
        description: error?.message || "Une erreur s'est produite lors de la déconnexion.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to check if user has required permissions
  const hasPermission = (requiredRole: AppRole | AppRole[]): boolean => {
    if (!userRole) return false;
    
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(userRole);
    }
    
    // Admin has access to everything
    if (userRole === 'admin') return true;
    
    // Manager has access to manager and viewer permissions
    if (userRole === 'manager' && (requiredRole === 'manager' || requiredRole === 'viewer')) return true;
    
    // Viewer only has access to viewer permissions
    if (userRole === 'viewer' && requiredRole === 'viewer') return true;
    
    return false;
  };

  // Check if a route requires authentication
  const requiresAuth = (path: string): boolean => {
    // Routes that don't require authentication
    if (path === '/' || path.startsWith('/auth')) {
      return false;
    }
    
    // Routes requiring auth with specific roles
    const requiresManager = ['/finances', '/departments', '/inventory', '/construction'].includes(path);
    const requiresManagerOrViewer = ['/events', '/reports'].includes(path);
    
    // Settings page depends on user role - everyone can access but features are limited based on role
    const isSettingsPage = path === '/settings';

    // If the user is already authenticated, don't require auth again
    if (user) {
      return false;
    }
    
    // If the route requires specific permissions, check if user has them
    if (requiresManager) {
      return true;
    }
    
    if (requiresManagerOrViewer) {
      return true;
    }
    
    // Settings page is accessible to all authenticated users
    if (isSettingsPage) {
      return true;
    }
    
    // Default: no authentication required
    return false;
  };

  return (
    <AuthContext.Provider value={{
      session,
      user,
      userRole,
      signIn,
      signOut,
      loading,
      hasPermission,
      requiresAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Protected route component
export const RequireAuth: React.FC<{ 
  children: React.ReactNode; 
  requiredRole?: AppRole | AppRole[];
}> = ({ 
  children, 
  requiredRole = ['viewer', 'manager', 'admin']
}) => {
  const { user, userRole, loading, hasPermission } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    } else if (!loading && user && userRole && !hasPermission(requiredRole)) {
      navigate('/');
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas les permissions nécessaires pour accéder à cette page.",
        variant: "destructive"
      });
    }
  }, [loading, user, userRole, hasPermission, requiredRole, navigate]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  if (!user) return null;
  
  if (!hasPermission(requiredRole)) return null;

  return <>{children}</>;
};
