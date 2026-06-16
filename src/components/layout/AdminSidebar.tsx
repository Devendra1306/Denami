"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Bot
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  const links = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Conversations', href: '/admin/conversations', icon: MessageSquare },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-card border-r border-border shadow-xl flex flex-col z-50">
      <div className="p-6 border-b border-border flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-lg">
          <Bot className="text-primary" size={24} />
        </div>
        <div>
          <h2 className="font-bold text-lg leading-none">Denami Labs</h2>
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Admin Panel</span>
        </div>
      </div>

      <div className="flex-1 py-6 flex flex-col gap-2 px-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Link 
              key={link.name} 
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-primary text-primary-foreground font-medium shadow-md shadow-primary/20' 
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <Icon size={20} />
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-4 py-3 mb-4 bg-secondary/50 rounded-xl">
          <img 
            src={user?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"} 
            alt="Profile" 
            className="w-10 h-10 rounded-full border border-border bg-background"
          />
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">{user?.displayName || 'Admin User'}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>

        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
