import { Head } from '@inertiajs/react';
import React from 'react';
import type { ReactNode } from 'react';

import AppLayout from '@/layouts/app-layout';

export default function EmployeesCreate() {
    return (
        <>
            <Head title="Ajouter un employe" />

            <section className="space-y-5">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Ajouter un employe</h1>
                    <p className="mt-1 text-sm text-slate-600">Formulaire de creation (UI only).</p>
                </div>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="first_name" className="block text-sm font-medium text-slate-700">
                                Prenom
                            </label>
                            <input id="first_name" type="text" className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-300 focus:ring" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="last_name" className="block text-sm font-medium text-slate-700">
                                Nom
                            </label>
                            <input id="last_name" type="text" className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-300 focus:ring" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                                Email
                            </label>
                            <input id="email" type="email" className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-300 focus:ring" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                                Telephone
                            </label>
                            <input id="phone" type="text" className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-300 focus:ring" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="department" className="block text-sm font-medium text-slate-700">
                                Departement
                            </label>
                            <select id="department" className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-300 focus:ring">
                                <option>Informatique</option>
                                <option>Finance</option>
                                <option>Commercial</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="status" className="block text-sm font-medium text-slate-700">
                                Statut
                            </label>
                            <select id="status" className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-300 focus:ring">
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
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

EmployeesCreate.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;
