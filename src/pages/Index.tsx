
import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, Calendar, TrendingUp, BarChart3, PieChart } from 'lucide-react';
import PageLayout from '@/components/Layout/PageLayout';
import StatCard from '@/components/Dashboard/StatCard';
import ChartCard from '@/components/Dashboard/ChartCard';
import RecentActivityCard from '@/components/Dashboard/RecentActivityCard';
import BudgetProgressCard from '@/components/Dashboard/BudgetProgressCard';

// Example data
const revenueData = [
  { name: 'Jan', value: 12000 },
  { name: 'Feb', value: 19000 },
  { name: 'Mar', value: 15000 },
  { name: 'Apr', value: 22000 },
  { name: 'May', value: 25000 },
  { name: 'Jun', value: 28000 },
  { name: 'Jul', value: 30000 },
];

const expenseData = [
  { name: 'Utilities', value: 15 },
  { name: 'Staff', value: 35 },
  { name: 'Outreach', value: 25 },
  { name: 'Events', value: 15 },
  { name: 'Facilities', value: 10 },
];

const departmentData = [
  { name: 'Worship', value: 30000 },
  { name: 'Youth', value: 25000 },
  { name: 'Missions', value: 32000 },
  { name: 'Admin', value: 18000 },
  { name: 'Community', value: 22000 },
];

const recentActivities = [
  {
    id: '1',
    title: 'New Donation Received',
    description: 'John Doe donated $500 to the Youth Ministry',
    timestamp: '2 hours ago',
    type: 'donation',
  },
  {
    id: '2',
    title: 'Expense Approved',
    description: 'New sound equipment purchase for $1,200',
    timestamp: '5 hours ago',
    type: 'expense',
  },
  {
    id: '3',
    title: 'Event Scheduled',
    description: 'Youth Summer Camp scheduled for July 15-20',
    timestamp: '1 day ago',
    type: 'event',
  },
  {
    id: '4',
    title: 'Budget Review Completed',
    description: 'Q2 budget review completed by finance team',
    timestamp: '2 days ago',
    type: 'task',
  },
];

const budgetItems = [
  {
    id: '1',
    name: 'Worship Ministry',
    spent: 25000,
    total: 30000,
    color: 'from-church-cyan to-blue-500',
  },
  {
    id: '2',
    name: 'Youth Programs',
    spent: 18000,
    total: 25000,
    color: 'from-church-purple to-church-magenta',
  },
  {
    id: '3',
    name: 'Missions & Outreach',
    spent: 30000,
    total: 32000,
    color: 'from-green-500 to-church-cyan',
  },
  {
    id: '4',
    name: 'Administrative',
    spent: 15000,
    total: 18000,
    color: 'from-church-magenta to-red-500',
  },
];

const Index = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <PageLayout>
      <div className="mb-8 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold gradient-text mb-2"
        >
          ChurchFinPro+ Dashboard
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 max-w-2xl mx-auto"
        >
          Welcome to your financial management hub. Monitor donations, track expenses, and manage departments all in one place.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Stats Overview */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Donations"
              value="$128,540"
              icon={<DollarSign className="h-5 w-5" />}
              trend={12}
              className="border-l-4 border-l-church-cyan"
            />
            <StatCard
              title="Active Members"
              value="856"
              icon={<Users className="h-5 w-5" />}
              trend={5}
              className="border-l-4 border-l-church-magenta"
            />
            <StatCard
              title="Upcoming Events"
              value="12"
              icon={<Calendar className="h-5 w-5" />}
              trend={-2}
              className="border-l-4 border-l-church-purple"
            />
            <StatCard
              title="Budget Utilization"
              value="76%"
              icon={<TrendingUp className="h-5 w-5" />}
              trend={8}
              className="border-l-4 border-l-church-blue"
            />
          </div>
        </motion.div>

        {/* Charts Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Donation Growth"
            subtitle="Monthly revenue for current year"
            type="area"
            data={revenueData}
          />
          <ChartCard
            title="Expense Breakdown"
            subtitle="Allocation of expenses by category"
            type="pie"
            data={expenseData}
          />
        </motion.div>

        {/* Department Performance and Budget Overview */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Department Funding"
            subtitle="Budget allocation by department"
            type="bar"
            data={departmentData}
          />
          <BudgetProgressCard items={budgetItems} />
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={itemVariants}>
          <RecentActivityCard activities={recentActivities} />
        </motion.div>

        {/* Quick Access */}
        <motion.div variants={itemVariants}>
          <div className="glass-card p-5">
            <h3 className="text-lg font-bold mb-4">Quick Access</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: 'Create Report', icon: <BarChart3 className="h-5 w-5" />, color: 'from-church-cyan to-blue-500' },
                { title: 'Add Donation', icon: <DollarSign className="h-5 w-5" />, color: 'from-church-magenta to-purple-500' },
                { title: 'Schedule Event', icon: <Calendar className="h-5 w-5" />, color: 'from-green-500 to-teal-500' },
                { title: 'Analyze Giving', icon: <PieChart className="h-5 w-5" />, color: 'from-yellow-500 to-red-500' },
              ].map((item, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center justify-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className={`p-3 rounded-full mb-2 bg-gradient-to-r ${item.color}`}>
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium">{item.title}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default Index;
