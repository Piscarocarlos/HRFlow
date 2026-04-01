import { Form, Head, Link } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import type { ReactNode } from 'react';

import {
    create as departmentsCreate,
    destroy as departmentsDestroy,
    edit as departmentsEdit,
} from '@/actions/App/Http/Controllers/DepartmentController';
import AppLayout from '@/layouts/app-layout';

type Department = {
    id: number;
    name: string;
    description: string | null;
};

type DepartmentsIndexProps = {
    departments: Department[];
};

export default function DepartmentsIndex({ departments }: DepartmentsIndexProps) {
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
                        href={departmentsCreate.url()}
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        <Plus className="h-4 w-4" />
                        Ajouter un departement
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {departments.map((department) => (
                        <article key={department.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-start justify-between gap-3">
                                <h2 className="text-lg font-semibold text-slate-900">{department.name}</h2>

                                <div className="flex items-center gap-2">
                                    <Link
                                        href={departmentsEdit.url(department.id)}
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 text-slate-700 transition hover:bg-slate-50"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Link>

                                    <Form {...departmentsDestroy.form(department.id)}>
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
                            </div>

                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                {department.description || 'Aucune description renseignee pour le moment.'}
                            </p>
                        </article>
                    ))}
                </div>
            </section>
        </>
    );
}

DepartmentsIndex.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;
