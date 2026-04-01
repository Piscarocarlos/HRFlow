<?php

namespace App\Http\Controllers;

use App\Http\Requests\DepartmentStoreRequest;
use App\Http\Requests\DepartmentUpdateRequest;
use App\Models\Department;
use Inertia\Inertia;
use App\Models\User;
use App\Notifications\DepartmentNotification;


class DepartmentController extends Controller
{
    public function index()
    {
        return inertia('departments/index', [
            'departments' => Department::query()
                ->orderBy('name')
                ->get(['id', 'name', 'description'])
                ->map(fn (Department $department): array => [
                    'id' => $department->id,
                    'name' => $department->name,
                    'description' => $department->description,
                ]),
        ]);
    }

    public function create()
    {
        return inertia('departments/create');
    }

    public function store(DepartmentStoreRequest $request)
    {
        Department::query()->create($request->validated());

        $admin = User::where('role', 'admin')->first();

        $admin->notify(new DepartmentNotification());



        return redirect()->route('departments.index');
    }

    public function edit(Department $department)
    {
        return inertia('departments/edit', [
            'department' => [
                'id' => $department->id,
                'name' => $department->name,
                'description' => $department->description,
            ],
        ]);
    }

    public function update(DepartmentUpdateRequest $request, Department $department)
    {
        $department->update($request->validated());

        return to_route('departments.index');
    }

    public function destroy(Department $department)
    {
        $department->delete();

        return to_route('departments.index');
    }
}
