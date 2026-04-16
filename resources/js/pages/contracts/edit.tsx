import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import type { ReactNode } from 'react';

import { index as contractsIndex, update as contractsUpdate } from '@/actions/App/Http/Controllers/ContractController';
import AppLayout from '@/layouts/app-layout';

type EmployeeOption = {
    id: number;
    label: string;
};

type ContractEdit = {
    id: number;
    employee_id: number;
    type: string;
    start_date: string;
    end_date: string | null;
    base_salary: string;
    status: string;
    document_url: string | null;
};

type ContractsEditProps = {
    contract: ContractEdit;
    employees: EmployeeOption[];
};

export default function ContractsEdit({ contract, employees }: ContractsEditProps) {
    const form = useForm({
        employee_id: String(contract.employee_id),
        type: contract.type,
        start_date: contract.start_date,
        end_date: contract.end_date ?? '',
        base_salary: contract.base_salary,
        status: contract.status,
        document: null as File | null,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        form.patch(contractsUpdate.url(contract.id), {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Modifier le contrat" />

            <section className="space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Modifier le contrat</h1>
                        <p className="mt-1 text-sm text-slate-600">Mettez a jour les informations ou remplacez le fichier joint.</p>
                    </div>
                    <Link
                        href={contractsIndex.url()}
                        className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                        Retour
                    </Link>
                </div>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    {contract.document_url ? (
                        <p className="mb-4 text-sm text-slate-600">
                            Fichier actuel :{' '}
                            <a href={contract.document_url} target="_blank" rel="noreferrer" className="font-medium text-sky-700 hover:text-sky-800">
                                ouvrir
                            </a>
                        </p>
                    ) : null}

                    <form onSubmit={submit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                            <label htmlFor="employee_id" className="block text-sm font-medium text-slate-700">
                                Employe
                            </label>
                            <select
                                id="employee_id"
                                value={form.data.employee_id}
                                onChange={(e) => form.setData('employee_id', e.target.value)}
                                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-300 focus:ring"
                            >
                                {employees.map((emp) => (
                                    <option key={emp.id} value={emp.id}>
                                        {emp.label}
                                    </option>
                                ))}
                            </select>
                            {form.errors.employee_id ? <p className="text-sm text-rose-600">{form.errors.employee_id}</p> : null}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="type" className="block text-sm font-medium text-slate-700">
                                Type de contrat
                            </label>
                            <select
                                id="type"
                                value={form.data.type}
                                onChange={(e) => form.setData('type', e.target.value)}
                                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-300 focus:ring"
                            >
                                <option value="cdi">CDI</option>
                                <option value="cdd">CDD</option>
                                <option value="stage">Stage</option>
                            </select>
                            {form.errors.type ? <p className="text-sm text-rose-600">{form.errors.type}</p> : null}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="status" className="block text-sm font-medium text-slate-700">
                                Statut
                            </label>
                            <select
                                id="status"
                                value={form.data.status}
                                onChange={(e) => form.setData('status', e.target.value)}
                                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-300 focus:ring"
                            >
                                <option value="active">Actif</option>
                                <option value="expired">Expire</option>
                                <option value="terminated">Resilie</option>
                            </select>
                            {form.errors.status ? <p className="text-sm text-rose-600">{form.errors.status}</p> : null}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="start_date" className="block text-sm font-medium text-slate-700">
                                Date de debut
                            </label>
                            <input
                                id="start_date"
                                type="date"
                                value={form.data.start_date}
                                onChange={(e) => form.setData('start_date', e.target.value)}
                                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-300 focus:ring"
                            />
                            {form.errors.start_date ? <p className="text-sm text-rose-600">{form.errors.start_date}</p> : null}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="end_date" className="block text-sm font-medium text-slate-700">
                                Date de fin
                            </label>
                            <input
                                id="end_date"
                                type="date"
                                value={form.data.end_date}
                                onChange={(e) => form.setData('end_date', e.target.value)}
                                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-300 focus:ring"
                            />
                            {form.errors.end_date ? <p className="text-sm text-rose-600">{form.errors.end_date}</p> : null}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="base_salary" className="block text-sm font-medium text-slate-700">
                                Salaire brut mensuel (MAD)
                            </label>
                            <input
                                id="base_salary"
                                type="number"
                                step="0.01"
                                min="0"
                                value={form.data.base_salary}
                                onChange={(e) => form.setData('base_salary', e.target.value)}
                                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-300 focus:ring"
                            />
                            {form.errors.base_salary ? <p className="text-sm text-rose-600">{form.errors.base_salary}</p> : null}
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label htmlFor="document" className="block text-sm font-medium text-slate-700">
                                Remplacer le fichier (optionnel)
                            </label>
                            <input
                                id="document"
                                type="file"
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
                                onChange={(e) => form.setData('document', e.target.files?.[0] ?? null)}
                                className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-slate-800 hover:file:bg-slate-200"
                            />
                            {form.errors.document ? <p className="text-sm text-rose-600">{form.errors.document}</p> : null}
                        </div>

                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                disabled={form.processing}
                                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </article>
            </section>
        </>
    );
}

ContractsEdit.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;
