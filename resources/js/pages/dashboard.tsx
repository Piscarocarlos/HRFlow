import { Head, Link } from '@inertiajs/react';
import React from 'react';
import type { ReactNode } from 'react';

import AppLayout from '@/layouts/app-layout';

const kpiCards = [
    { label: 'Employes actifs', value: '28', tone: 'text-sky-700' },
    { label: 'Conges en attente', value: '6', tone: 'text-amber-700' },
    { label: 'Contrats expires ce mois', value: '3', tone: 'text-rose-700' },
    { label: 'Nouveaux recrutements', value: '4', tone: 'text-emerald-700' },
];

const leaveRequests = [
    { employee: 'Karim A.', type: 'Conge annuel', dates: '02/04 - 05/04', status: 'Pending' },
    { employee: 'Sara B.', type: 'Maladie', dates: '10/04 - 12/04', status: 'Approved' },
    { employee: 'Yasmine C.', type: 'Exceptionnel', dates: '18/04', status: 'Pending' },
];

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />

            <section className="space-y-6">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Dashboard RH</h1>
                    <p className="text-sm text-slate-600 sm:text-base">
                        Vue globale des indicateurs RH pour suivre l&apos;activite quotidienne.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {kpiCards.map((card) => (
                        <article key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <p className="text-sm text-slate-500">{card.label}</p>
                            <p className={`mt-2 text-3xl font-bold ${card.tone}`}>{card.value}</p>
                        </article>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <h2 className="text-lg font-semibold text-slate-900">Demandes de conges recentes</h2>
                            <button type="button" className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700">
                                Voir tout
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-200 text-slate-500">
                                        <th className="px-2 py-2 font-medium">Employe</th>
                                        <th className="px-2 py-2 font-medium">Type</th>
                                        <th className="px-2 py-2 font-medium">Periode</th>
                                        <th className="px-2 py-2 font-medium">Statut</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaveRequests.map((request) => (
                                        <tr key={`${request.employee}-${request.dates}`} className="border-b border-slate-100">
                                            <td className="px-2 py-3 text-slate-700">{request.employee}</td>
                                            <td className="px-2 py-3 text-slate-700">{request.type}</td>
                                            <td className="px-2 py-3 text-slate-600">{request.dates}</td>
                                            <td className="px-2 py-3">
                                                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                                                    {request.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </article>

                    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-900">Actions rapides</h2>
                        <div className="mt-4 space-y-3">
                            <Link
                                href="/employees/create"
                                className="block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                                Ajouter un employe
                            </Link>
                            <Link
                                href="/departments/create"
                                className="block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                                Ajouter un departement
                            </Link>
                            <Link
                                href="/employees"
                                className="block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                                Verifier les conges
                            </Link>
                        </div>
                    </article>
                </div>
            </section>
        </>
    );
}

Dashboard.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;
