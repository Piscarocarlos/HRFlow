<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeStoreRequest;
use App\Http\Requests\EmployeeUpdateRequest;
use App\Models\Contract;
use App\Models\Department;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Response;

class EmployeeController extends Controller
{
    public function index(): Response
    {
        return inertia('employees/index', [
            'employees' => Employee::query()
                ->with(['user:id,name,email', 'department:id,name'])
                ->orderBy('last_name')
                ->orderBy('first_name')
                ->get()
                ->map(fn (Employee $employee): array => [
                    'id' => $employee->id,
                    'first_name' => $employee->first_name,
                    'last_name' => $employee->last_name,
                    'full_name' => $employee->first_name.' '.$employee->last_name,
                    'email' => $employee->user->email,
                    'employee_number' => $employee->employee_number,
                    'department' => $employee->department->name,
                    'status' => $employee->status,
                ]),
        ]);
    }

    public function create(): Response
    {
        return inertia('employees/create', [
            'departments' => Department::query()->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(EmployeeStoreRequest $request): RedirectResponse
    {
        $data = $request->validated();

        DB::transaction(function () use ($data): void {
            $user = User::query()->create([
                'name' => $data['first_name'].' '.$data['last_name'],
                'email' => $data['email'],
                'password' => $data['password'],
                'role' => 'employee',
            ]);

            Employee::query()->create([
                'user_id' => $user->id,
                'employee_number' => $data['employee_number'],
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'phone' => $data['phone'] ?? null,
                'birth_date' => $data['birth_date'] ?? null,
                'hire_date' => $data['hire_date'],
                'department_id' => $data['department_id'],
                'status' => $data['status'],
            ]);
        });

        return to_route('employees.index');
    }

    public function show(Employee $employee): Response
    {
        $employee->load(['user', 'department', 'contracts']);

        return inertia('employees/show', [
            'employee' => [
                'id' => $employee->id,
                'first_name' => $employee->first_name,
                'last_name' => $employee->last_name,
                'employee_number' => $employee->employee_number,
                'email' => $employee->user->email,
                'phone' => $employee->phone,
                'birth_date' => $employee->birth_date?->toDateString(),
                'hire_date' => $employee->hire_date?->toDateString(),
                'status' => $employee->status,
                'department' => [
                    'id' => $employee->department->id,
                    'name' => $employee->department->name,
                ],
                'contracts' => $employee->contracts
                    ->sortByDesc('created_at')
                    ->values()
                    ->map(fn (Contract $contract): array => [
                        'id' => $contract->id,
                        'type' => $contract->type,
                        'start_date' => $contract->start_date->toDateString(),
                        'status' => $contract->status,
                        'document_url' => $contract->documentUrl(),
                    ]),
            ],
        ]);
    }

    public function edit(Employee $employee): Response
    {
        $employee->load(['user', 'department']);

        return inertia('employees/edit', [
            'employee' => [
                'id' => $employee->id,
                'first_name' => $employee->first_name,
                'last_name' => $employee->last_name,
                'email' => $employee->user->email,
                'employee_number' => $employee->employee_number,
                'phone' => $employee->phone ?? '',
                'birth_date' => $employee->birth_date?->toDateString(),
                'hire_date' => $employee->hire_date?->toDateString(),
                'department_id' => $employee->department_id,
                'status' => $employee->status,
            ],
            'departments' => Department::query()->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(EmployeeUpdateRequest $request, Employee $employee): RedirectResponse
    {
        $data = $request->validated();

        DB::transaction(function () use ($data, $employee): void {
            $userData = [
                'name' => $data['first_name'].' '.$data['last_name'],
                'email' => $data['email'],
            ];

            if (! empty($data['password'])) {
                $userData['password'] = $data['password'];
            }

            $employee->user->update($userData);

            $employee->update([
                'employee_number' => $data['employee_number'],
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'phone' => $data['phone'] ?? null,
                'birth_date' => $data['birth_date'] ?? null,
                'hire_date' => $data['hire_date'],
                'department_id' => $data['department_id'],
                'status' => $data['status'],
            ]);
        });

        return to_route('employees.index');
    }

    public function destroy(Employee $employee): RedirectResponse
    {
        DB::transaction(function () use ($employee): void {
            $employee->user->delete();
            $employee->delete();
        });

        return to_route('employees.index');
    }
}
