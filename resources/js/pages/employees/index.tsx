import { Form, Head, Link } from '@inertiajs/react';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import type { ReactNode } from 'react';

import {
    create as employeesCreate,
    destroy as employeesDestroy,
    edit as employeesEdit,
    show as employeesShow,
} from '@/actions/App/Http/Controllers/EmployeeController';
import AppLayout from '@/layouts/app-layout';

type EmployeeRow = {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    employee_number: string;
    department: string;
    status: string;
};

type EmployeesIndexProps = {
    employees: EmployeeRow[];
};

export default function EmployeesIndex({ employees }: EmployeesIndexProps) {
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
                        href={employeesCreate.url()}
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
                                    <th className="px-2 py-2 font-medium">Matricule</th>
                                    <th className="px-2 py-2 font-medium">Nom</th>
                                    <th className="px-2 py-2 font-medium">Email</th>
                                    <th className="px-2 py-2 font-medium">Departement</th>
                                    <th className="px-2 py-2 font-medium">Statut</th>
                                    <th className="px-2 py-2 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-2 py-8 text-center text-slate-500">
                                            Aucun employe pour le moment.{' '}
                                            <Link href={employeesCreate.url()} className="font-medium text-sky-700 hover:text-sky-800">
                                                En ajouter un
                                            </Link>
                                            .
                                        </td>
                                    </tr>
                                ) : (
                                    employees.map((employee) => (
                                        <tr key={employee.id} className="border-b border-slate-100">
                                            <td className="px-2 py-3 font-mono text-xs text-slate-600">{employee.employee_number}</td>
                                            <td className="px-2 py-3 text-slate-800">{employee.full_name}</td>
                                            <td className="px-2 py-3 text-slate-600">{employee.email}</td>
                                            <td className="px-2 py-3 text-slate-700">{employee.department}</td>
                                            <td className="px-2 py-3">
                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                        employee.status === 'active'
                                                            ? 'bg-emerald-100 text-emerald-800'
                                                            : 'bg-slate-100 text-slate-700'
                                                    }`}
                                                >
                                                    {employee.status === 'active' ? 'Actif' : 'Inactif'}
                                                </span>
                                            </td>
                                            <td className="px-2 py-3">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Link
                                                        href={employeesShow.url(employee.id)}
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 text-slate-700 transition hover:bg-slate-50"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                    <Link
                                                        href={employeesEdit.url(employee.id)}
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 text-slate-700 transition hover:bg-slate-50"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                    <Form {...employeesDestroy.form(employee.id)}>
                                                        {({ processing }) => (
                                                            <button
                                                                type="submit"
                                                                disabled={processing}
                                                                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-rose-200 text-rose-600 transition hover:bg-rose-50 disabled:opacity-60"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        )}
                                                    </Form>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </article>
            </section>
        </>
    );
}

EmployeesIndex.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;
