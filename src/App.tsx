
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider, RequireAuth } from "./contexts/AuthContext";
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

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <AuthProvider>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            
            <Route path="/" element={
              <RequireAuth requiredRole={["viewer", "manager", "admin"]}>
                <Index />
              </RequireAuth>
            } />
            
            <Route path="/finances" element={
              <RequireAuth requiredRole={["manager", "admin"]}>
                <Finances />
              </RequireAuth>
            } />
            
            <Route path="/departments" element={
              <RequireAuth requiredRole={["manager", "admin"]}>
                <Departments />
              </RequireAuth>
            } />
            
            <Route path="/events" element={
              <RequireAuth requiredRole={["viewer", "manager", "admin"]}>
                <Events />
              </RequireAuth>
            } />
            
            <Route path="/reports" element={
              <RequireAuth requiredRole={["viewer", "manager", "admin"]}>
                <Reports />
              </RequireAuth>
            } />
            
            <Route path="/settings" element={
              <RequireAuth requiredRole={["viewer", "manager", "admin"]}>
                <Settings />
              </RequireAuth>
            } />
            
            <Route path="/inventory" element={
              <RequireAuth requiredRole={["manager", "admin"]}>
                <Inventory />
              </RequireAuth>
            } />
            
            <Route path="/construction" element={
              <RequireAuth requiredRole={["manager", "admin"]}>
                <Construction />
              </RequireAuth>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </AuthProvider>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
