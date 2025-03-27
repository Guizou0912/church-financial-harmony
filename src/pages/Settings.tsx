
import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/components/Layout/PageLayout';
import SettingsTabs from '@/components/Settings/SettingsTabs';

const Settings = () => {
  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text">Paramètres</h1>
          <p className="text-gray-400 mt-1">Gérez les paramètres de votre application</p>
        </div>

        <div className="glass-card">
          <SettingsTabs />
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default Settings;
