import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import React from 'react';
import type { ReactNode } from 'react';

import AppLayout from '@/layouts/app-layout';

const departments = [
    { name: 'Informatique', manager: 'Sara RH', employees: 12 },
    { name: 'Finance', manager: 'Hassan M.', employees: 7 },
    { name: 'Commercial', manager: 'Nadia L.', employees: 9 },
];

export default function DepartmentsIndex() {
    return (
        <>
            <Head title="Departements" />

            <section className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Departements</h1>
                        <p className="mt-1 text-sm text-slate-600">Organisation des equipes par departement.</p>
                    </div>

                    <Link
                        href="/departments/create"
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        <Plus className="h-4 w-4" />
                        Ajouter un departement
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {departments.map((department) => (
                        <article key={department.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h2 className="text-lg font-semibold text-slate-900">{department.name}</h2>
                            <p className="mt-2 text-sm text-slate-600">Responsable: {department.manager}</p>
                            <p className="mt-1 text-sm text-slate-600">Effectif: {department.employees} employes</p>
                        </article>
                    ))}
                </div>
            </section>
        </>
    );
}

DepartmentsIndex.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;
