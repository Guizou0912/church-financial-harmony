
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl font-bold gradient-text mb-4"
        >
          404
        </motion.h1>
        <h2 className="text-2xl font-bold text-white mb-2">Page Non Trouvée</h2>
        <p className="text-gray-300 mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/">
          <Button className="bg-gradient-to-r from-church-cyan to-church-purple text-white">
            <Home className="w-4 h-4 mr-2" />
            Retour à l'Accueil
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
