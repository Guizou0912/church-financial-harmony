
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Menu, X, Home, BarChart3, Users, Calendar, Settings, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { title: 'Dashboard', icon: <Home className="w-4 h-4" />, href: '/' },
    { title: 'Finances', icon: <DollarSign className="w-4 h-4" />, href: '/finances' },
    { title: 'Departments', icon: <Users className="w-4 h-4" />, href: '/departments' },
    { title: 'Events', icon: <Calendar className="w-4 h-4" />, href: '/events' },
    { title: 'Reports', icon: <BarChart3 className="w-4 h-4" />, href: '/reports' },
    { title: 'Settings', icon: <Settings className="w-4 h-4" />, href: '/settings' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {menuItems.map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.href}
                    className="flex items-center px-3 py-2 text-sm rounded-md text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200"
                  >
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-gradient-to-r from-church-cyan to-church-purple text-white">
                Sign In
              </Button>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
          isMenuOpen ? "max-h-screen" : "max-h-0"
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 glassmorphism">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className="flex items-center px-3 py-2 text-base rounded-md text-gray-200 hover:text-white hover:bg-white/10"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.icon}
              <span className="ml-3">{item.title}</span>
            </Link>
          ))}
          <div className="pt-2">
            <Button className="w-full bg-gradient-to-r from-church-cyan to-church-purple text-white">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
