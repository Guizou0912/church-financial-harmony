
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider, RequireAuth, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Finances from "./pages/Finances";
import Departments from "./pages/Departments";
import Events from "./pages/Events";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Inventory from "./pages/Inventory";
import Construction from "./pages/Construction";
import Auth from "./pages/Auth";

// Custom route wrapper that checks if authentication is required
const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const { requiresAuth, user } = useAuth();
  const location = useLocation();
  
  // Check if this route requires authentication
  if (requiresAuth(location.pathname) && !user) {
    // Redirect to auth page with the current location for redirect after login
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

// Component with AuthProvider for proper context initialization
const AppWithAuth = () => (
  <AuthProvider>
    <AnimatePresence mode="wait">
      <Routes>
        {/* Auth page - accessible to everyone */}
        <Route path="/auth" element={<Auth />} />
        
        {/* Dashboard - accessible to everyone without login */}
        <Route path="/" element={<Index />} />
        
        {/* Role protected pages that check authentication before access */}
        <Route path="/finances" element={
          <AuthCheck>
            <RequireAuth requiredRole={["manager", "admin"]}>
              <Finances />
            </RequireAuth>
          </AuthCheck>
        } />
        
        <Route path="/departments" element={
          <AuthCheck>
            <RequireAuth requiredRole={["manager", "admin"]}>
              <Departments />
            </RequireAuth>
          </AuthCheck>
        } />
        
        <Route path="/events" element={
          <AuthCheck>
            <RequireAuth requiredRole={["viewer", "manager", "admin"]}>
              <Events />
            </RequireAuth>
          </AuthCheck>
        } />
        
        <Route path="/reports" element={
          <AuthCheck>
            <RequireAuth requiredRole={["viewer", "manager", "admin"]}>
              <Reports />
            </RequireAuth>
          </AuthCheck>
        } />
        
        <Route path="/settings" element={
          <AuthCheck>
            <RequireAuth requiredRole={["viewer", "manager", "admin"]}>
              <Settings />
            </RequireAuth>
          </AuthCheck>
        } />
        
        <Route path="/inventory" element={
          <AuthCheck>
            <RequireAuth requiredRole={["manager", "admin"]}>
              <Inventory />
            </RequireAuth>
          </AuthCheck>
        } />
        
        <Route path="/construction" element={
          <AuthCheck>
            <RequireAuth requiredRole={["manager", "admin"]}>
              <Construction />
            </RequireAuth>
          </AuthCheck>
        } />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  </AuthProvider>
);

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <AppWithAuth />
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
