
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from '@/contexts/AuthContext';
import { Lock, Mail } from 'lucide-react';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signIn, signUp, loading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Check if the mode is signin or signup from the URL query parameter
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get('mode') || 'signin';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'signup') {
      await signUp(email, password);
    } else {
      await signIn(email, password);
    }
  };
  
  const toggleMode = () => {
    navigate(`/auth?mode=${mode === 'signin' ? 'signup' : 'signin'}`);
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
            {mode === 'signin' ? 'Se Connecter' : 'Créer un Compte'}
          </h1>
          <p className="text-gray-400 mt-2">
            {mode === 'signin' 
              ? 'Connectez-vous pour accéder à votre compte' 
              : 'Inscrivez-vous pour commencer à utiliser ChurchFinPro+'}
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
          
          {mode === 'signin' && (
            <div className="text-right">
              <a href="#" className="text-sm text-church-cyan hover:underline">
                Mot de passe oublié?
              </a>
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-church-cyan to-church-purple"
            disabled={loading}
          >
            {loading 
              ? 'Chargement...' 
              : mode === 'signin' ? 'Se Connecter' : 'S\'inscrire'}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            {mode === 'signin' 
              ? 'Pas encore de compte?' 
              : 'Déjà un compte?'}
            <Button
              variant="link"
              className="text-church-cyan"
              onClick={toggleMode}
            >
              {mode === 'signin' ? 'S\'inscrire' : 'Se connecter'}
            </Button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
