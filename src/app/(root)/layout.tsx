import Header from '@/src/components/Header';
import MobileNavigation from '@/src/components/MobileNavigation';
import Sidebar from '@/src/components/Sidebar';
import { getCurrentUser } from '@/src/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';
import { Toaster } from '@/src/components/ui/sonner';

export const dynamic = 'force-dynamic';

const Layout = async ({ children }: { children: ReactNode }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return redirect('/login');
  return (
    <main className="flex h-screen">
      <Sidebar {...currentUser} />
      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation {...currentUser} />
        <Header userId={currentUser.$id} accountId={currentUser.accountId} />
        <div className="main-content">{children}</div>
      </section>
      <Toaster />
    </main>
  );
};

export default Layout;
