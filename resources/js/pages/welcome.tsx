import { Link, usePage } from '@inertiajs/react'
import React from 'react'

function Welcome() {

    const { auth } = usePage().props

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <div className="relative isolate overflow-hidden">
                <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.18),transparent_55%)]" />
                <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-96 -translate-y-1/2 bg-[radial-gradient(circle,rgba(99,102,241,0.12),transparent_60%)]" />

                <div className="mx-auto max-w-6xl px-6 py-8">
                    <header className="flex items-center justify-end">
                        {
                            auth?.user ? (
                                <Link
                                    href="/dashboard"
                                    className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-sky-300 hover:text-sky-700"
                                >
                                    Tableau de bord
                                </Link>

                            ) : (
                                <Link
                                    href="/login"
                                    className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-sky-300 hover:text-sky-700"
                                >
                                    Se connecter
                                </Link>
                            )
                        }
                    </header>
                </div>

                <div className="mx-auto flex min-h-[calc(100vh-88px)] max-w-6xl items-center px-6 pb-20">
                    <section className="w-full space-y-10">
                        <span className="inline-flex items-center rounded-full border border-sky-300 bg-sky-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                            Projet de classe - Gestion RH
                        </span>

                        <div className="max-w-4xl space-y-5">
                            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                                HRFlow
                            </h1>
                            <p className="text-lg text-slate-600 sm:text-xl">
                                Une application de gestion des ressources humaines construite
                                avec Laravel, React et Inertia.js pour apprendre en conditions
                                reelles sur un cas concret d&apos;entreprise.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <p className="text-xs font-semibold uppercase tracking-widest text-sky-300">
                                    Module 1
                                </p>
                                <h2 className="mt-2 text-lg font-semibold text-slate-900">
                                    Authentification & roles
                                </h2>
                                <p className="mt-2 text-sm text-slate-600">
                                    Connexion securisee, middleware et gestion de 3 profils
                                    d&apos;utilisateurs.
                                </p>
                            </article>

                            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
                                    Modules 2 - 4
                                </p>
                                <h2 className="mt-2 text-lg font-semibold text-slate-900">
                                    Employes, departements, contrats
                                </h2>
                                <p className="mt-2 text-sm text-slate-600">
                                    CRUD complet pour structurer les donnees RH essentielles d&apos;une
                                    PME.
                                </p>
                            </article>

                            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
                                    Module 5
                                </p>
                                <h2 className="mt-2 text-lg font-semibold text-slate-900">
                                    Conges & validation
                                </h2>
                                <p className="mt-2 text-sm text-slate-600">
                                    Demandes de conge avec statuts, approbation RH et suivi simple
                                    des absences.
                                </p>
                            </article>
                        </div>

                        <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                            <span className="rounded-full border border-slate-300 bg-white px-3 py-1">
                                Laravel
                            </span>
                            <span className="rounded-full border border-slate-300 bg-white px-3 py-1">
                                React
                            </span>
                            <span className="rounded-full border border-slate-300 bg-white px-3 py-1">
                                Inertia.js
                            </span>
                            <span className="rounded-full border border-slate-300 bg-white px-3 py-1">
                                TailwindCSS
                            </span>
                            <span className="rounded-full border border-slate-300 bg-white px-3 py-1">
                                MySQL
                            </span>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}

export default Welcome
