import React from 'react';

type AuthLayoutProps = {
    title: string;
    subtitle: string;
    children: React.ReactNode;
};

export default function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-8 px-6 py-12 lg:grid-cols-2">
                <section className="space-y-5">
                    <span className="inline-flex items-center rounded-full border border-sky-300 bg-sky-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">
                        HRFlow - Authentification
                    </span>

                    <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                        {title}
                    </h1>

                    <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                        {subtitle}
                    </p>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-wider text-sky-700">Simple</p>
                            <p className="mt-1 text-sm text-slate-600">UI claire pour debuter rapidement.</p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700">Pedagogique</p>
                            <p className="mt-1 text-sm text-slate-600">Une structure reutilisable pour toutes les pages auth.</p>
                        </div>
                    </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">{children}</section>
            </div>
        </main>
    );
}
