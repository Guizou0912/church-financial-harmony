
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from '@/contexts/AuthContext';
import { Lock, Mail, ArrowLeft, Info } from 'lucide-react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

// Interface pour les comptes de démonstration
interface DemoAccount {
  email: string;
  password: string;
  role: string;
  description: string;
  bgClass: string;
  textClass: string;
}

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signIn, loading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);
  
  // Get the return path from URL state or default to home
  const from = location.state?.from?.pathname || '/';
  
  // Comptes de démonstration prédéfinis
  const demoAccounts: DemoAccount[] = [
    {
      email: 'admin@demo.com',
      password: 'password123',
      role: 'admin',
      description: 'Accès complet à toutes les fonctionnalités',
      bgClass: 'bg-purple-500/20',
      textClass: 'text-purple-400'
    },
    {
      email: 'manager@demo.com',
      password: 'password123',
      role: 'manager',
      description: 'Gestion des transactions et rapports',
      bgClass: 'bg-blue-500/20',
      textClass: 'text-blue-400'
    },
    {
      email: 'viewer@demo.com',
      password: 'password123',
      role: 'viewer',
      description: 'Accès en lecture seule aux données',
      bgClass: 'bg-gray-500/20',
      textClass: 'text-gray-400'
    }
  ];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
  };

  const useDemo = (account: DemoAccount) => {
    setEmail(account.email);
    setPassword(account.password);
    toast({
      title: "Compte de démonstration sélectionné",
      description: `${account.email} (${account.role}) prêt à être utilisé.`,
    });
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
        
        <div className="mt-8">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={() => setShowDemoAccounts(!showDemoAccounts)}
          >
            <Info className="h-4 w-4" />
            Utiliser un compte de démonstration
          </Button>
          
          {showDemoAccounts && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 space-y-3"
            >
              {demoAccounts.map((account, index) => (
                <Card key={index} className="bg-white/5 border-white/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <span className={`px-2 py-1 rounded-full text-xs mr-2 ${account.bgClass} ${account.textClass}`}>
                        {account.role === 'admin' ? 'Administrateur' : 
                         account.role === 'manager' ? 'Gestionnaire' : 'Observateur'}
                      </span>
                      {account.email}
                    </CardTitle>
                    <CardDescription>{account.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-2">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="w-full text-xs"
                      onClick={() => useDemo(account)}
                    >
                      Utiliser ce compte
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              <p className="text-xs text-gray-500 italic">
                Mot de passe pour tous les comptes: password123
              </p>
            </motion.div>
          )}
        </div>
        
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
