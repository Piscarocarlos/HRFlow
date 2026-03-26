import { Link, usePage } from '@inertiajs/react';
import { Briefcase, Building2, FileText, House, Plane, type LucideIcon } from 'lucide-react';
import React from 'react';

type AppSidebarProps = {
    onNavigate?: () => void;
};

type NavigationItem = {
    label: string;
    href: string;
    icon: LucideIcon;
};

const navigationItems: NavigationItem[] = [
    { label: 'Dashboard', href: '/dashboard', icon: House },
    { label: 'Employes', href: '/employees', icon: Briefcase },
    { label: 'Departements', href: '/departments', icon: Building2 },
    { label: 'Contrats', href: '#', icon: FileText },
    { label: 'Conges', href: '#', icon: Plane },
];

export default function AppSidebar({ onNavigate }: AppSidebarProps) {
    const { url } = usePage();

    const isItemActive = (href: string): boolean => {
        if (href === '/dashboard') {
            return url === '/dashboard';
        }

        return url === href || url.startsWith(`${href}/`);
    };

    return (
        <aside className="flex h-full w-72 flex-col border-r border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-6 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">HRFlow</p>
                <h1 className="mt-1 text-xl font-bold text-slate-900">Gestion RH</h1>
            </div>

            <nav className="flex-1 space-y-2 px-4 py-4">
                {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = isItemActive(item.href);

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={onNavigate}
                            className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                                isActive
                                    ? 'bg-sky-100 text-sky-800'
                                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                            }`}
                        >
                            <Icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t border-slate-200 px-4 py-4">
                <Link
                    href="/"
                    onClick={onNavigate}
                    className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                >
                    <House className="h-4 w-4" />
                    Retour a l&apos;accueil
                </Link>
            </div>
        </aside>
    );
}
