"use client";

import { motion } from 'framer-motion';
import { Users, MessageSquare, TrendingUp, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { name: 'Total Users', value: '1,234', change: '+12%', icon: Users, color: 'text-blue-500' },
    { name: 'Active Conversations', value: '42', change: '+5%', icon: MessageSquare, color: 'text-green-500' },
    { name: 'Avg. Session Time', value: '4m 32s', change: '+18%', icon: Activity, color: 'text-purple-500' },
    { name: 'Conversion Rate', value: '24.8%', change: '-2%', icon: TrendingUp, color: 'text-orange-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back. Here is what's happening with your projects today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith('+');
          
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-secondary rounded-xl">
                  <Icon className={stat.color} size={24} />
                </div>
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                  isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-muted-foreground text-sm font-medium mb-1">{stat.name}</h3>
              <p className="text-3xl font-bold">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center"
        >
          <Activity size={48} className="text-muted-foreground/30 mb-4" />
          <h3 className="text-xl font-bold mb-2">Analytics Engine</h3>
          <p className="text-muted-foreground max-w-sm">Connect your Google Analytics or Mixpanel workspace to visualize traffic data here.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-border rounded-2xl p-6 shadow-sm min-h-[400px] flex flex-col"
        >
          <h3 className="text-lg font-bold mb-4">Recent Users</h3>
          <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground">
            <Users size={32} className="opacity-30 mb-2" />
            <p>Go to the Users tab to view your synced MongoDB database.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
