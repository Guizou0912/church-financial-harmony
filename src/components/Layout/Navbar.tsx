import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, BarChart3, Users, 
  Calendar, Settings, DollarSign, Package, Building, LogOut,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, userRole, signOut, requiresAuth } = useAuth();
  const location = useLocation();

  // Define menu items - ensure Events, Reports, and Settings are included
  const menuItems = [
    { title: 'Tableau de Bord', icon: <Home className="w-4 h-4" />, href: '/', roles: ['viewer', 'manager', 'admin'] },
    { title: 'Finances', icon: <DollarSign className="w-4 h-4" />, href: '/finances', roles: ['manager', 'admin'] },
    { title: 'Départements', icon: <Users className="w-4 h-4" />, href: '/departments', roles: ['manager', 'admin'] },
    { title: 'Inventaire', icon: <Package className="w-4 h-4" />, href: '/inventory', roles: ['manager', 'admin'] },
    { title: 'Construction', icon: <Building className="w-4 h-4" />, href: '/construction', roles: ['manager', 'admin'] },
    { title: 'Événements', icon: <Calendar className="w-4 h-4" />, href: '/events', roles: ['viewer', 'manager', 'admin'] },
    { title: 'Rapports', icon: <BarChart3 className="w-4 h-4" />, href: '/reports', roles: ['viewer', 'manager', 'admin'] },
    { title: 'Paramètres', icon: <Settings className="w-4 h-4" />, href: '/settings', roles: ['viewer', 'manager', 'admin'] },
  ];

  // Get user's initials for avatar
  const getUserInitials = () => {
    if (!user?.email) return '?';
    return user.email.substring(0, 2).toUpperCase();
  };

  // Handle menu item click - direct to login page if authentication required
  const handleMenuItemClick = (path: string) => {
    // We don't need to do anything special here
    // The AuthCheck component in App.tsx will handle redirecting to auth if needed
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed w-full z-50 glassmorphism"
    >
      <div className="px-6 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center"
              >
                <span className="text-2xl font-bold gradient-text mr-1">Church</span>
                <span className="text-2xl font-bold text-white">FinPro+</span>
              </motion.div>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="hidden md:flex items-center space-x-2">
                {userRole && (
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    userRole === 'admin' ? 'bg-purple-500/20 text-purple-400' : 
                    userRole === 'manager' ? 'bg-blue-500/20 text-blue-400' : 
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {userRole === 'admin' ? 'Administrateur' : 
                     userRole === 'manager' ? 'Gestionnaire' : 'Observateur'}
                  </span>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative rounded-full" size="icon">
                      <Avatar>
                        <AvatarFallback className="bg-church-purple text-white">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Paramètres</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={signOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Se déconnecter</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block"
              >
                <Button 
                  className="bg-gradient-to-r from-church-cyan to-church-purple text-white"
                  asChild
                >
                  <Link to="/auth">Se Connecter</Link>
                </Button>
              </motion.div>
            )}
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] glassmorphism text-white">
                <div className="flex flex-col space-y-4 mt-8">
                  {user && (
                    <div className="flex items-center gap-2 px-4 py-2 mb-2">
                      <Avatar>
                        <AvatarFallback className="bg-church-purple text-white">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.email}</p>
                        {userRole && (
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            userRole === 'admin' ? 'bg-purple-500/20 text-purple-400' : 
                            userRole === 'manager' ? 'bg-blue-500/20 text-blue-400' : 
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {userRole === 'admin' ? 'Administrateur' : 
                             userRole === 'manager' ? 'Gestionnaire' : 'Observateur'}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {menuItems.map((item) => {
                    // Determine if this menu item should show a login prompt based on roles
                    const needsAuth = !user && item.roles.every(role => role !== 'viewer');
                    const isDisabled = user && userRole && !item.roles.includes(userRole);
                    
                    return (
                      <Link
                        key={item.title}
                        to={needsAuth ? "/auth" : isDisabled ? "#" : item.href}
                        state={needsAuth ? { from: { pathname: item.href } } : undefined}
                        className={cn(
                          "flex items-center space-x-3 px-4 py-3 text-base rounded-md",
                          isDisabled 
                            ? "text-gray-500 cursor-not-allowed"
                            : "text-gray-200 hover:text-white hover:bg-white/10"
                        )}
                        onClick={() => handleMenuItemClick(item.href)}
                      >
                        {item.icon}
                        <span>{item.title}</span>
                        {needsAuth && (
                          <span className="ml-auto text-xs text-gray-400">🔒</span>
                        )}
                      </Link>
                    );
                  })}
                  
                  {user ? (
                    <Button 
                      variant="outline" 
                      className="mt-4 mx-4"
                      onClick={signOut}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Se déconnecter
                    </Button>
                  ) : (
                    <div className="pt-4 mx-4">
                      <Button 
                        className="w-full bg-gradient-to-r from-church-cyan to-church-purple text-white"
                        asChild
                      >
                        <Link to="/auth">Se Connecter</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
