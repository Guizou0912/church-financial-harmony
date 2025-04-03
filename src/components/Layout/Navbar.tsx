
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronDown, Menu, X, Home, BarChart3, Users, 
  Calendar, Settings, DollarSign, Package, Building 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { title: 'Tableau de Bord', icon: <Home className="w-4 h-4" />, href: '/' },
    { title: 'Finances', icon: <DollarSign className="w-4 h-4" />, href: '/finances' },
    { title: 'Départements', icon: <Users className="w-4 h-4" />, href: '/departments' },
    { title: 'Inventaire', icon: <Package className="w-4 h-4" />, href: '/inventory' },
    { title: 'Construction', icon: <Building className="w-4 h-4" />, href: '/construction' },
    { title: 'Événements', icon: <Calendar className="w-4 h-4" />, href: '/events' },
    { title: 'Rapports', icon: <BarChart3 className="w-4 h-4" />, href: '/reports' },
    { title: 'Paramètres', icon: <Settings className="w-4 h-4" />, href: '/settings' },
  ];

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

          {/* Desktop Navigation - Hidden on Mobile */}
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <Link
                      to={item.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "flex items-center gap-1 px-3 py-2 text-sm text-gray-200 hover:text-white transition-all duration-200"
                      )}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-gradient-to-r from-church-cyan to-church-purple text-white">
                Se Connecter
              </Button>
            </motion.div>
          </div>

          {/* Mobile Navigation (Hamburger Menu) */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] glassmorphism text-white">
                <div className="flex flex-col space-y-4 mt-8">
                  {menuItems.map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      className="flex items-center space-x-3 px-4 py-3 text-base rounded-md text-gray-200 hover:text-white hover:bg-white/10"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  ))}
                  <div className="pt-4">
                    <Button className="w-full bg-gradient-to-r from-church-cyan to-church-purple text-white">
                      Se Connecter
                    </Button>
                  </div>
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
