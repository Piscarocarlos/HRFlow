import { Head } from '@inertiajs/react';
import React from 'react';
import type { ReactNode } from 'react';

import AppLayout from '@/layouts/app-layout';

export default function DepartmentsCreate() {
    return (
        <>
            <Head title="Ajouter un departement" />

            <section className="space-y-5">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Ajouter un departement</h1>
                    <p className="mt-1 text-sm text-slate-600">Formulaire de creation (UI only).</p>
                </div>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                                Nom du departement
                            </label>
                            <input id="name" type="text" className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-300 focus:ring" />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description" className="block text-sm font-medium text-slate-700">
                                Description
                            </label>
                            <textarea
                                id="description"
                                rows={4}
                                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-300 focus:ring"
                            />
                        </div>

                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            Enregistrer
                        </button>
                    </form>
                </article>
            </section>
        </>
    );
}

DepartmentsCreate.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;
