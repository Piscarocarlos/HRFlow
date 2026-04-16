<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContractStoreRequest;
use App\Http\Requests\ContractUpdateRequest;
use App\Models\Contract;
use App\Models\Employee;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;

class ContractController extends Controller
{
    public function index(): Response
    {
        return inertia('contracts/index', [
            'contracts' => Contract::query()
                ->with(['employee'])
                ->orderByDesc('created_at')
                ->get()
                ->map(fn (Contract $contract): array => [
                    'id' => $contract->id,
                    'employee_name' => $contract->employee->first_name.' '.$contract->employee->last_name,
                    'employee_number' => $contract->employee->employee_number,
                    'type' => $contract->type,
                    'start_date' => $contract->start_date->toDateString(),
                    'end_date' => $contract->end_date?->toDateString(),
                    'base_salary' => (string) $contract->base_salary,
                    'status' => $contract->status,
                    'document_url' => $contract->documentUrl(),
                ]),
        ]);
    }

    public function create(): Response
    {
        $employees = Employee::query()
            ->orderBy('last_name')
            ->orderBy('first_name')
            ->get(['id', 'first_name', 'last_name', 'employee_number'])
            ->map(fn (Employee $employee): array => [
                'id' => $employee->id,
                'label' => $employee->first_name.' '.$employee->last_name.' ('.$employee->employee_number.')',
            ]);

        return inertia('contracts/create', [
            'employees' => $employees,
            'selectedEmployeeId' => $this->integerFromQuery('employee_id'),
        ]);
    }

    public function store(ContractStoreRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $path = $request->file('document')->store('contracts', 'public');

        Contract::query()->create([
            ...Arr::except($validated, ['document']),
            'document_path' => $path,
        ]);

        return to_route('contracts.index');
    }

    public function show(Contract $contract): Response
    {
        $contract->load('employee');

        return inertia('contracts/show', [
            'contract' => [
                'id' => $contract->id,
                'type' => $contract->type,
                'start_date' => $contract->start_date->toDateString(),
                'end_date' => $contract->end_date?->toDateString(),
                'base_salary' => (string) $contract->base_salary,
                'status' => $contract->status,
                'document_url' => $contract->documentUrl(),
                'employee' => [
                    'id' => $contract->employee->id,
                    'name' => $contract->employee->first_name.' '.$contract->employee->last_name,
                    'employee_number' => $contract->employee->employee_number,
                ],
            ],
        ]);
    }

    public function edit(Contract $contract): Response
    {
        $contract->load('employee');

        $employees = Employee::query()
            ->orderBy('last_name')
            ->orderBy('first_name')
            ->get(['id', 'first_name', 'last_name', 'employee_number'])
            ->map(fn (Employee $employee): array => [
                'id' => $employee->id,
                'label' => $employee->first_name.' '.$employee->last_name.' ('.$employee->employee_number.')',
            ]);

        return inertia('contracts/edit', [
            'contract' => [
                'id' => $contract->id,
                'employee_id' => $contract->employee_id,
                'type' => $contract->type,
                'start_date' => $contract->start_date->toDateString(),
                'end_date' => $contract->end_date?->toDateString(),
                'base_salary' => (string) $contract->base_salary,
                'status' => $contract->status,
                'document_url' => $contract->documentUrl(),
            ],
            'employees' => $employees,
        ]);
    }

    public function update(ContractUpdateRequest $request, Contract $contract): RedirectResponse
    {
        $validated = $request->validated();
        $data = Arr::except($validated, ['document']);

        if ($request->hasFile('document')) {
            if ($contract->document_path) {
                Storage::disk('public')->delete($contract->document_path);
            }
            $data['document_path'] = $request->file('document')->store('contracts', 'public');
        }

        $contract->update($data);

        return to_route('contracts.index');
    }

    public function destroy(Contract $contract): RedirectResponse
    {
        if ($contract->document_path) {
            Storage::disk('public')->delete($contract->document_path);
        }

        $contract->delete();

        return to_route('contracts.index');
    }

    private function integerFromQuery(string $key): ?int
    {
        $value = request()->query($key);

        if ($value === null || $value === '') {
            return null;
        }

        $int = (int) $value;

        return $int > 0 ? $int : null;
    }
}
