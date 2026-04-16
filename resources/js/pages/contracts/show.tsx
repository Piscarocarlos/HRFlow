import { Head, Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

import { edit as contractsEdit, index as contractsIndex } from '@/actions/App/Http/Controllers/ContractController';
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

type ContractShow = {
    id: number;
    type: string;
    start_date: string;
    end_date: string | null;
    base_salary: string;
    status: string;
    document_url: string | null;
    employee: {
        id: number;
        name: string;
        employee_number: string;
    };
};

type ContractsShowProps = {
    contract: ContractShow;
};

export default function ContractsShow({ contract }: ContractsShowProps) {
    return (
        <>
            <Head title={`Contrat — ${contract.employee.name}`} />

            <section className="space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <p className="text-sm text-slate-500">{typeLabels[contract.type] ?? contract.type}</p>
                        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Contrat</h1>
                        <p className="mt-1 text-sm text-slate-600">
                            {contract.employee.name}{' '}
                            <span className="font-mono text-slate-500">({contract.employee.employee_number})</span>
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link
                            href={contractsIndex.url()}
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                            Liste
                        </Link>
                        <Link
                            href={contractsEdit.url(contract.id)}
                            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            Modifier
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Dates & salaire</h2>
                        <dl className="mt-4 space-y-3 text-sm">
                            <div>
                                <dt className="text-slate-500">Debut</dt>
                                <dd className="font-medium text-slate-900">{contract.start_date}</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500">Fin</dt>
                                <dd className="font-medium text-slate-900">{contract.end_date || '—'}</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500">Salaire brut mensuel</dt>
                                <dd className="font-medium text-slate-900">{contract.base_salary} MAD</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500">Statut</dt>
                                <dd>
                                    <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                                        {statusLabels[contract.status] ?? contract.status}
                                    </span>
                                </dd>
                            </div>
                        </dl>
                    </article>
                    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Document</h2>
                        {contract.document_url ? (
                            <a
                                href={contract.document_url}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-4 inline-flex rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
                            >
                                Telecharger / ouvrir le fichier
                            </a>
                        ) : (
                            <p className="mt-4 text-sm text-slate-500">Aucun fichier joint.</p>
                        )}
                    </article>
                </div>
            </section>
        </>
    );
}

ContractsShow.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;
