import { Bell, Menu, Search, User } from 'lucide-react';
import React from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePage } from '@inertiajs/react';

type AppNavbarProps = {
    onOpenSidebar: () => void;
};

export default function AppNavbar({ onOpenSidebar }: AppNavbarProps) {

    const { notifications, notificationsNotRead } = usePage().props as any;

    return (
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onOpenSidebar}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 text-slate-700 lg:hidden"
                        aria-label="Ouvrir le menu"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">Tableau de bord</p>
                        <p className="text-sm text-slate-500">Vue d&apos;ensemble RH</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="hidden sm:block">
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                className="w-44 rounded-xl border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-800 outline-none ring-sky-300 transition focus:ring md:w-60"
                            />
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700"
                            >
                                <Bell className="h-4 w-4" />
                                Notifications <span className="text-xs text-red-500">{notificationsNotRead.length}</span>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-72">
                            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {
                                notificationsNotRead.map((notification: any) => (
                                    <DropdownMenuItem key={notification.id}>{notification.data.message}</DropdownMenuItem>
                                ))
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                type="button"
                                className="hidden items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 sm:inline-flex"
                            >
                                <User className="h-4 w-4" />
                                Admin RH
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Mon profil</DropdownMenuItem>
                            <DropdownMenuItem>Parametres</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Se deconnecter</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
