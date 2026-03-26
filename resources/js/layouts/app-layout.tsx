import React, { useState } from 'react';

import AppNavbar from '@/components/app-navbar';
import AppSidebar from '@/components/app-sidebar';

type AppLayoutProps = {
    children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="flex min-h-screen">
                <div className="hidden lg:block">
                    <AppSidebar />
                </div>

                {isSidebarOpen ? (
                    <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
                        <button
                            type="button"
                            aria-label="Fermer le menu"
                            className="absolute inset-0 bg-slate-900/40"
                            onClick={closeSidebar}
                        />
                        <div className="relative z-10 h-full max-w-[82%]">
                            <AppSidebar onNavigate={closeSidebar} />
                        </div>
                    </div>
                ) : null}

                <div className="flex min-w-0 flex-1 flex-col">
                    <AppNavbar onOpenSidebar={() => setIsSidebarOpen(true)} />
                    <main className="flex-1 px-4 py-5 sm:px-6 sm:py-6">{children}</main>
                </div>
            </div>
        </div>
    );
}
