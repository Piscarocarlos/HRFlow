import { Form, Head, Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

import { index as departmentsIndex, store as departmentsStore } from '@/actions/App/Http/Controllers/DepartmentController';
import AppLayout from '@/layouts/app-layout';

export default function DepartmentsCreate() {
    return (
        <>
            <Head title="Ajouter un departement" />

            <section className="space-y-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Ajouter un departement</h1>
                        <p className="mt-1 text-sm text-slate-600">Creez un nouveau departement dans l&apos;organisation.</p>
                    </div>

                    <Link
                        href={departmentsIndex.url()}
                        className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                        Retour
                    </Link>
                </div>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <Form {...departmentsStore.form()} className="space-y-4">
                        {({ errors, processing }) => (
                            <>
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                                        Nom du departement
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-300 focus:ring"
                                    />
                                    {errors.name && <p className="text-sm text-rose-600">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="description" className="block text-sm font-medium text-slate-700">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={4}
                                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-300 focus:ring"
                                    />
                                    {errors.description ? <p className="text-sm text-rose-600">{errors.description}</p> : null}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    Enregistrer
                                </button>
                            </>
                        )}
                    </Form>
                </article>
            </section>
        </>
    );
}

DepartmentsCreate.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;
