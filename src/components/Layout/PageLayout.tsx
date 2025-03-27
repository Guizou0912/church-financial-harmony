
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen animated-gradient-background">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        {children}
      </motion.main>
      <footer className="py-4 glassmorphism">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} ChurchFinPro+. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;
