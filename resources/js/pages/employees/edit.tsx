import { Form, Head, Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

import { index as employeesIndex, update as employeesUpdate } from '@/actions/App/Http/Controllers/EmployeeController';
import AppLayout from '@/layouts/app-layout';

type DepartmentOption = {
    id: number;
    name: string;
};

type EmployeeEdit = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    employee_number: string;
    phone: string;
    birth_date: string | null;
    hire_date: string | null;
    department_id: number;
    status: string;
};

type EmployeesEditProps = {
    employee: EmployeeEdit;
    departments: DepartmentOption[];
};

export default function EmployeesEdit({ employee, departments }: EmployeesEditProps) {
    return (
        <>
            <Head title="Modifier un employe" />

            <section className="space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Modifier un employe</h1>
                        <p className="mt-1 text-sm text-slate-600">Mettez a jour la fiche et le compte utilisateur.</p>
                    </div>
                    <Link
                        href={employeesIndex.url()}
                        className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                        Retour
                    </Link>
                </div>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <Form {...employeesUpdate.form(employee.id)} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {({ errors, processing }) => (
                            <>
                                <div className="space-y-2">
                                    <label htmlFor="first_name" className="block text-sm font-medium text-slate-700">
                                        Prenom
                                    </label>
                                    <input
                                        id="first_name"
                                        name="first_name"
                                        type="text"
                                        defaultValue={employee.first_name}
                                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-300 focus:ring"
                                    />
                                    {errors.first_name ? <p className="text-sm text-rose-600">{errors.first_name}</p> : null}
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="last_name" className="block text-sm font-medium text-slate-700">
                                        Nom
                                    </label>
                                    <input
                                        id="last_name"
                                        name="last_name"
                                        type="text"
                                        defaultValue={employee.last_name}
                                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-300 focus:ring"
                                    />
                                    {errors.last_name ? <p className="text-sm text-rose-600">{errors.last_name}</p> : null}
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        defaultValue={employee.email}
                                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-300 focus:ring"
                                    />
                                    {errors.email ? <p className="text-sm text-rose-600">{errors.email}</p> : null}
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="employee_number" className="block text-sm font-medium text-slate-700">
                                        Matricule
                                    </label>
                                    <input
                                        id="employee_number"
                                        name="employee_number"
                                        type="text"
                                        defaultValue={employee.employee_number}
                                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-300 focus:ring"
                                    />
                                    {errors.employee_number ? <p className="text-sm text-rose-600">{errors.employee_number}</p> : null}
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Nouveau mot de passe (optionnel)</p>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                        Mot de passe
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-300 focus:ring"
                                        autoComplete="new-password"
                                    />
                                    {errors.password ? <p className="text-sm text-rose-600">{errors.password}</p> : null}
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-slate-700">
                                        Confirmation
                                    </label>
                                    <input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-300 focus:ring"
                                        autoComplete="new-password"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                                        Telephone
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        defaultValue={employee.phone}
                                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-300 focus:ring"
                                    />
                                    {errors.phone ? <p className="text-sm text-rose-600">{errors.phone}</p> : null}
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="birth_date" className="block text-sm font-medium text-slate-700">
                                        Date de naissance
                                    </label>
                                    <input
                                        id="birth_date"
                                        name="birth_date"
                                        type="date"
                                        defaultValue={employee.birth_date ?? ''}
                                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-300 focus:ring"
                                    />
                                    {errors.birth_date ? <p className="text-sm text-rose-600">{errors.birth_date}</p> : null}
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="hire_date" className="block text-sm font-medium text-slate-700">
                                        Date d&apos;embauche
                                    </label>
                                    <input
                                        id="hire_date"
                                        name="hire_date"
                                        type="date"
                                        defaultValue={employee.hire_date ?? ''}
                                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-300 focus:ring"
                                    />
                                    {errors.hire_date ? <p className="text-sm text-rose-600">{errors.hire_date}</p> : null}
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="department_id" className="block text-sm font-medium text-slate-700">
                                        Departement
                                    </label>
                                    <select
                                        id="department_id"
                                        name="department_id"
                                        defaultValue={employee.department_id}
                                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-300 focus:ring"
                                    >
                                        {departments.map((d) => (
                                            <option key={d.id} value={d.id}>
                                                {d.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.department_id ? <p className="text-sm text-rose-600">{errors.department_id}</p> : null}
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="status" className="block text-sm font-medium text-slate-700">
                                        Statut
                                    </label>
                                    <select id="status" name="status" defaultValue={employee.status} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-300 focus:ring">
                                        <option value="active">Actif</option>
                                        <option value="inactive">Inactif</option>
                                    </select>
                                    {errors.status ? <p className="text-sm text-rose-600">{errors.status}</p> : null}
                                </div>
                                <div className="md:col-span-2">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        Enregistrer les modifications
                                    </button>
                                </div>
                            </>
                        )}
                    </Form>
                </article>
            </section>
        </>
    );
}

EmployeesEdit.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;
