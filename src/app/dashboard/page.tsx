"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, LogOut, Hexagon } from 'lucide-react';
import Link from 'next/link';

export default function UserDashboard() {
  const { user, dbUser, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  // If user is actually an admin, we can give them a shortcut to the admin panel
  const isAdmin = dbUser?.role === 'admin';

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/10 relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none z-0"></div>
      
      {/* Header */}
      <header className="h-20 bg-card/80 backdrop-blur-md border-b border-border shadow-sm flex items-center justify-between px-6 lg:px-12 relative z-10">
        <Link href="/" className="flex items-center gap-2 group">
          <Hexagon className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold tracking-tight">Denami Labs</span>
        </Link>
        <div className="flex items-center gap-4">
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-sm font-medium text-destructive hover:bg-destructive/10 px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 lg:p-12 relative z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-card border border-border/50 shadow-2xl rounded-3xl p-8 lg:p-16 w-full"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
              <Bot size={40} className="text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Welcome, {dbUser?.displayName || user.displayName || 'User'}!</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            You are successfully authenticated. Your user account does not have administrative privileges, but you're all set to interact with our platform.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-secondary/30 border border-border rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium text-muted-foreground">Email:</span> {user?.email}
                </p>
              </div>
            </div>
            <div className="bg-secondary/30 border border-border rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-2">Support & Contact</h3>
              <p className="text-sm text-muted-foreground mb-4">Need help with your account or want to upgrade?</p>
              <Link href="/#contact" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                Contact Support <Hexagon size={14} className="ml-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
