import { Head } from '@inertiajs/react';
import React from 'react';
import { useForm } from '@inertiajs/react';
import AuthLayout from '@/layouts/auth-layout';

export default function Login() {

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });


    function submit(e: any) {
        e.preventDefault();
        post('/login');
    }


    return (
        <>
            <Head title="Connexion" />

            <AuthLayout
                title="Bienvenue sur HRFlow"
                subtitle="Connectez-vous pour acceder a votre espace RH. Cette page sert de base de design pour les ecrans d'authentification."
            >
                <div className="space-y-6">
                    <header className="space-y-1">
                        <h2 className="text-2xl font-bold text-slate-900">Se connecter</h2>
                        <p className="text-sm text-slate-600">Entrez vos informations de connexion.</p>
                    </header>

                    <form className="space-y-4" onSubmit={submit}>
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                placeholder="vous@hrflow.ma"
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none ring-sky-300 transition focus:ring"
                            />
                            {errors.email && <div className="text-red-500">{errors.email}</div>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                Mot de passe
                            </label>
                            <input
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                type="password"
                                placeholder="********"
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none ring-sky-300 transition focus:ring"
                            />
                            {errors.password && <div className="text-red-500">{errors.password}</div>}
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="inline-flex items-center gap-2 text-sm text-slate-600">
                                <input type="checkbox"
                                    checked={data.remember}
                                    name="remember"
                                    onChange={e => setData('remember', e.target.checked)}
                                    className="h-4 w-4 rounded border-slate-300 text-sky-600" />
                                Se souvenir de moi
                            </label>
                            <a href="#" className="text-sm font-medium text-sky-700 hover:text-sky-800">
                                Mot de passe oublie ?
                            </a>
                        </div>

                        <button
                            type="button"
                            className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                            disabled={processing}
                            onClick={() => post('/login')}
                        >
                            {processing ? 'Connexion en cours...' : 'Connexion'}
                        </button>
                    </form>
                </div>
            </AuthLayout>
        </>
    );
}
