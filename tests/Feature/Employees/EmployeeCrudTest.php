<?php

use App\Models\Department;
use App\Models\Employee;
use App\Models\User;

test('employee pages can be rendered', function () {
    $rh = User::factory()->rh()->create();
    $employee = Employee::factory()->create();

    $this->actingAs($rh)->get(route('employees.index'))->assertOk();
    $this->actingAs($rh)->get(route('employees.create'))->assertOk();
    $this->actingAs($rh)->get(route('employees.show', $employee))->assertOk();
    $this->actingAs($rh)->get(route('employees.edit', $employee))->assertOk();
});

test('an employee can be created with a user account', function () {
    $rh = User::factory()->rh()->create();
    $department = Department::factory()->create();

    $response = $this->actingAs($rh)->post(route('employees.store'), [
        'first_name' => 'Karim',
        'last_name' => 'Benali',
        'email' => 'karim@hrflow.test',
        'password' => 'Password123!',
        'password_confirmation' => 'Password123!',
        'employee_number' => 'EMP-100',
        'phone' => '0600000000',
        'birth_date' => '1995-01-15',
        'hire_date' => '2024-03-01',
        'department_id' => $department->id,
        'status' => 'active',
    ]);

    $response->assertRedirect(route('employees.index'));

    $this->assertDatabaseHas('employees', [
        'employee_number' => 'EMP-100',
        'first_name' => 'Karim',
        'last_name' => 'Benali',
    ]);

    $this->assertDatabaseHas('users', [
        'email' => 'karim@hrflow.test',
        'role' => 'employee',
    ]);
});

test('an employee can be updated', function () {
    $rh = User::factory()->rh()->create();
    $employee = Employee::factory()->create([
        'first_name' => 'Old',
        'last_name' => 'Name',
    ]);

    $newDepartment = Department::factory()->create();

    $response = $this->actingAs($rh)->patch(route('employees.update', $employee), [
        'first_name' => 'New',
        'last_name' => 'Person',
        'email' => $employee->user->email,
        'employee_number' => $employee->employee_number,
        'phone' => null,
        'birth_date' => null,
        'hire_date' => $employee->hire_date->toDateString(),
        'department_id' => $newDepartment->id,
        'status' => 'inactive',
    ]);

    $response->assertRedirect(route('employees.index'));

    $employee->refresh();

    expect($employee->first_name)->toBe('New');
    expect($employee->last_name)->toBe('Person');
    expect($employee->status)->toBe('inactive');
    expect($employee->department_id)->toBe($newDepartment->id);
});

test('an employee can be deleted', function () {
    $rh = User::factory()->rh()->create();
    $employee = Employee::factory()->create();
    $userId = $employee->user_id;
    $employeeId = $employee->id;

    $response = $this->actingAs($rh)->delete(route('employees.destroy', $employee));

    $response->assertRedirect(route('employees.index'));

    $deletedEmployee = Employee::withTrashed()->find($employeeId);
    expect($deletedEmployee)->not->toBeNull();
    expect($deletedEmployee->trashed())->toBeTrue();

    expect(User::withTrashed()->find($userId)?->trashed())->toBeTrue();
});
