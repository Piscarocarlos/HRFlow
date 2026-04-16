import { Head, Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

import { create as contractsCreate } from '@/actions/App/Http/Controllers/ContractController';
import { edit as employeesEdit, index as employeesIndex } from '@/actions/App/Http/Controllers/EmployeeController';
import AppLayout from '@/layouts/app-layout';

const contractTypeLabels: Record<string, string> = {
    cdi: 'CDI',
    cdd: 'CDD',
    stage: 'Stage',
};

type EmployeeContract = {
    id: number;
    type: string;
    start_date: string;
    status: string;
    document_url: string | null;
};

type EmployeeShow = {
    id: number;
    first_name: string;
    last_name: string;
    employee_number: string;
    email: string;
    phone: string | null;
    birth_date: string | null;
    hire_date: string | null;
    status: string;
    department: {
        id: number;
        name: string;
    };
    contracts: EmployeeContract[];
};

type EmployeesShowProps = {
    employee: EmployeeShow;
};

export default function EmployeesShow({ employee }: EmployeesShowProps) {
    return (
        <>
            <Head title={`${employee.first_name} ${employee.last_name}`} />

            <section className="space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <p className="text-sm font-mono text-slate-500">{employee.employee_number}</p>
                        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                            {employee.first_name} {employee.last_name}
                        </h1>
                        <p className="mt-1 text-sm text-slate-600">{employee.email}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link
                            href={employeesIndex.url()}
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                            Liste
                        </Link>
                        <Link
                            href={employeesEdit.url(employee.id)}
                            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            Modifier
                        </Link>
                        <Link
                            href={contractsCreate.url({ query: { employee_id: employee.id } })}
                            className="rounded-xl border border-sky-300 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800 transition hover:bg-sky-100"
                        >
                            Nouveau contrat
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Coordonnees</h2>
                        <dl className="mt-4 space-y-3 text-sm">
                            <div>
                                <dt className="text-slate-500">Telephone</dt>
                                <dd className="font-medium text-slate-900">{employee.phone || '—'}</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500">Date de naissance</dt>
                                <dd className="font-medium text-slate-900">{employee.birth_date || '—'}</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500">Date d&apos;embauche</dt>
                                <dd className="font-medium text-slate-900">{employee.hire_date || '—'}</dd>
                            </div>
                        </dl>
                    </article>
                    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Organisation</h2>
                        <dl className="mt-4 space-y-3 text-sm">
                            <div>
                                <dt className="text-slate-500">Departement</dt>
                                <dd className="font-medium text-slate-900">{employee.department.name}</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500">Statut</dt>
                                <dd>
                                    <span
                                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                                            employee.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                                        }`}
                                    >
                                        {employee.status === 'active' ? 'Actif' : 'Inactif'}
                                    </span>
                                </dd>
                            </div>
                        </dl>
                    </article>
                </div>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Contrats</h2>
                        <Link
                            href={contractsCreate.url({ query: { employee_id: employee.id } })}
                            className="text-sm font-medium text-sky-700 hover:text-sky-800"
                        >
                            + Ajouter un contrat
                        </Link>
                    </div>
                    {employee.contracts.length === 0 ? (
                        <p className="mt-4 text-sm text-slate-500">Aucun contrat enregistre pour cet employe.</p>
                    ) : (
                        <ul className="mt-4 divide-y divide-slate-100">
                            {employee.contracts.map((c) => (
                                <li key={c.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                                    <div>
                                        <span className="font-medium text-slate-900">{contractTypeLabels[c.type] ?? c.type}</span>
                                        <span className="text-slate-500"> — {c.start_date}</span>
                                        <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{c.status}</span>
                                    </div>
                                    {c.document_url ? (
                                        <a
                                            href={c.document_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-sky-700 hover:text-sky-800"
                                        >
                                            Document
                                        </a>
                                    ) : (
                                        <span className="text-slate-400">—</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </article>
            </section>
        </>
    );
}

EmployeesShow.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;
