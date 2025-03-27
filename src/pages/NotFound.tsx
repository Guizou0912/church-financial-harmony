
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import PageLayout from "@/components/Layout/PageLayout";

const NotFound = () => {
  return (
    <PageLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center glass-card p-10 max-w-md"
        >
          <h1 className="text-6xl font-bold gradient-text mb-6">404</h1>
          <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-white/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M12 4a8 8 0 100 16 8 8 0 000-16z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-3">Page Not Found</h2>
          <p className="text-gray-400 mb-8">
            The page you're looking for is currently under development or doesn't exist.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 rounded-md bg-gradient-to-r from-church-cyan to-church-purple text-white font-medium"
            >
              <Home className="mr-2 h-4 w-4" /> Return to Dashboard
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
