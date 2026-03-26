import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import React from 'react';
import type { ReactNode } from 'react';

import AppLayout from '@/layouts/app-layout';

const employees = [
    { name: 'Karim El Idrissi', email: 'karim@hrflow.ma', department: 'Informatique', status: 'Active' },
    { name: 'Sara Benali', email: 'sara@hrflow.ma', department: 'Finance', status: 'Active' },
    { name: 'Yassine Ait', email: 'yassine@hrflow.ma', department: 'Commercial', status: 'Inactive' },
];

export default function EmployeesIndex() {
    return (
        <>
            <Head title="Employes" />

            <section className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Employes</h1>
                        <p className="mt-1 text-sm text-slate-600">Liste des employes de l&apos;entreprise.</p>
                    </div>

                    <Link
                        href="/employees/create"
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        <Plus className="h-4 w-4" />
                        Ajouter un employe
                    </Link>
                </div>

                <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-slate-200 text-slate-500">
                                    <th className="px-2 py-2 font-medium">Nom</th>
                                    <th className="px-2 py-2 font-medium">Email</th>
                                    <th className="px-2 py-2 font-medium">Departement</th>
                                    <th className="px-2 py-2 font-medium">Statut</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee) => (
                                    <tr key={employee.email} className="border-b border-slate-100">
                                        <td className="px-2 py-3 text-slate-800">{employee.name}</td>
                                        <td className="px-2 py-3 text-slate-600">{employee.email}</td>
                                        <td className="px-2 py-3 text-slate-700">{employee.department}</td>
                                        <td className="px-2 py-3">
                                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                                                {employee.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </article>
            </section>
        </>
    );
}

EmployeesIndex.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;
