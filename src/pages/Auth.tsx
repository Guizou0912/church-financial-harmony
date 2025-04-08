
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from '@/contexts/AuthContext';
import { Lock, Mail, ArrowLeft } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signIn, loading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Get the return path from URL state or default to home
  const from = location.state?.from?.pathname || '/';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-church-cyan/5 to-church-purple/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glassmorphism p-8 rounded-lg max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text">
            Se Connecter
          </h1>
          <p className="text-gray-400 mt-2">
            Connectez-vous pour accéder aux fonctionnalités avancées
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="text-right">
            <a href="#" className="text-sm text-church-cyan hover:underline">
              Mot de passe oublié?
            </a>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-church-cyan to-church-purple"
            disabled={loading}
          >
            {loading ? 'Chargement...' : 'Se Connecter'}
          </Button>
        </form>
        
        <div className="mt-6 flex justify-center">
          <Button
            variant="ghost"
            className="flex items-center text-gray-400"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retourner au tableau de bord
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
