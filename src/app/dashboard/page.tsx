"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { db } from '../../../firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, LogOut, Hexagon } from 'lucide-react';
import Link from 'next/link';

export default function UserDashboard() {
  const { user, dbUser, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [conversations, setConversations] = useState<any[]>([]);
  const [loadingConvos, setLoadingConvos] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    async function fetchUserConversations() {
      if (!user) return;
      try {
        const q = query(
          collection(db, 'conversations'),
          where('userId', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        const convos = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        // Sort manually since we might not have a composite index for where+orderBy
        convos.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setConversations(convos);
      } catch (err) {
        console.error("Failed to fetch user conversations", err);
      } finally {
        setLoadingConvos(false);
      }
    }
    if (user) {
      fetchUserConversations();
    }
  }, [user]);

  // If user is actually an admin, we can give them a shortcut to the admin panel
  const isAdmin = dbUser?.role === 'admin';

  if (authLoading || !user) {
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
          className="bg-card border border-border/50 shadow-2xl rounded-3xl p-8 lg:p-16 w-full mb-8"
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

        {/* User Conversations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full text-left"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Bot className="text-primary" /> My Voice AI Transcripts
          </h2>
          
          <div className="bg-card border border-border/50 shadow-xl rounded-2xl overflow-hidden">
            {loadingConvos ? (
              <div className="p-12 flex justify-center">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : conversations.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">
                You haven't had any voice conversations with Devi yet.<br/>
                <Link href="/#consultant" className="text-primary font-medium hover:underline mt-2 inline-block">
                  Go back to home and start a call
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-secondary/50 border-b border-border text-muted-foreground">
                    <tr>
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium">Agent</th>
                      <th className="p-4 font-medium">Duration</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Transcript</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {conversations.map((conv) => (
                      <tr key={conv.id} className="hover:bg-secondary/20 transition-colors">
                        <td className="p-4 whitespace-nowrap">
                          {new Date(conv.createdAt).toLocaleString()}
                        </td>
                        <td className="p-4 font-medium">{conv.agentName || 'Devi'}</td>
                        <td className="p-4 text-muted-foreground">
                          {conv.durationSeconds ? `${conv.durationSeconds}s` : 'N/A'}
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-xs font-medium">
                            {conv.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="max-w-md line-clamp-2 text-muted-foreground text-xs italic">
                            "{conv.transcript || 'No transcript generated'}"
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
