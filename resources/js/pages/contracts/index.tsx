import { Form, Head, Link } from '@inertiajs/react';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import type { ReactNode } from 'react';

import {
    create as contractsCreate,
    destroy as contractsDestroy,
    edit as contractsEdit,
    show as contractsShow,
} from '@/actions/App/Http/Controllers/ContractController';
import AppLayout from '@/layouts/app-layout';

const typeLabels: Record<string, string> = {
    cdi: 'CDI',
    cdd: 'CDD',
    stage: 'Stage',
};

const statusLabels: Record<string, string> = {
    active: 'Actif',
    expired: 'Expire',
    terminated: 'Resilie',
};

type ContractRow = {
    id: number;
    employee_name: string;
    employee_number: string;
    type: string;
    start_date: string;
    end_date: string | null;
    base_salary: string;
    status: string;
    document_url: string | null;
};

type ContractsIndexProps = {
    contracts: ContractRow[];
};

export default function ContractsIndex({ contracts }: ContractsIndexProps) {
    return (
        <>
            <Head title="Contrats" />

            <section className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Contrats</h1>
                        <p className="mt-1 text-sm text-slate-600">Gestion des contrats par employe et document joint.</p>
                    </div>

                    <Link
                        href={contractsCreate.url()}
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        <Plus className="h-4 w-4" />
                        Nouveau contrat
                    </Link>
                </div>

                <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-slate-200 text-slate-500">
                                    <th className="px-2 py-2 font-medium">Employe</th>
                                    <th className="px-2 py-2 font-medium">Type</th>
                                    <th className="px-2 py-2 font-medium">Debut</th>
                                    <th className="px-2 py-2 font-medium">Fin</th>
                                    <th className="px-2 py-2 font-medium">Salaire</th>
                                    <th className="px-2 py-2 font-medium">Statut</th>
                                    <th className="px-2 py-2 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contracts.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-2 py-8 text-center text-slate-500">
                                            Aucun contrat.{' '}
                                            <Link href={contractsCreate.url()} className="font-medium text-sky-700 hover:text-sky-800">
                                                En creer un
                                            </Link>
                                            .
                                        </td>
                                    </tr>
                                ) : (
                                    contracts.map((row) => (
                                        <tr key={row.id} className="border-b border-slate-100">
                                            <td className="px-2 py-3">
                                                <div className="font-medium text-slate-900">{row.employee_name}</div>
                                                <div className="font-mono text-xs text-slate-500">{row.employee_number}</div>
                                            </td>
                                            <td className="px-2 py-3 text-slate-700">{typeLabels[row.type] ?? row.type}</td>
                                            <td className="px-2 py-3 text-slate-600">{row.start_date}</td>
                                            <td className="px-2 py-3 text-slate-600">{row.end_date || '—'}</td>
                                            <td className="px-2 py-3 text-slate-700">{row.base_salary} MAD</td>
                                            <td className="px-2 py-3">
                                                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                                                    {statusLabels[row.status] ?? row.status}
                                                </span>
                                            </td>
                                            <td className="px-2 py-3">
                                                <div className="flex items-center justify-end gap-1">
                                                    {row.document_url ? (
                                                        <a
                                                            href={row.document_url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-300 px-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                                                        >
                                                            PDF
                                                        </a>
                                                    ) : null}
                                                    <Link
                                                        href={contractsShow.url(row.id)}
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 text-slate-700 transition hover:bg-slate-50"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                    <Link
                                                        href={contractsEdit.url(row.id)}
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 text-slate-700 transition hover:bg-slate-50"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                    <Form {...contractsDestroy.form(row.id)}>
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

ContractsIndex.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;
