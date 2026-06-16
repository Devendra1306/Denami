"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, dbUser, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!loading) {
      if (isLoginPage) {
        // If they are on the login page but already logged in as admin, push to admin dashboard
        if (user && dbUser?.role === 'admin') {
          router.push('/admin');
        }
      } else {
        // If they are on any other admin page
        if (!user) {
          router.push('/admin/login');
        } else if (!dbUser || dbUser.role !== 'admin') {
          router.push('/dashboard');
        }
      }
    }
  }, [user, dbUser, loading, router, isLoginPage]);

  // If it's the login page, just render it without the sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Don't render admin layout while redirecting or checking auth
  if (loading || !user || !dbUser || dbUser.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-secondary/10">
      <AdminSidebar />
      <main className="flex-1 p-8 ml-64 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
