<?php

use App\Models\Contract;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('contract pages can be rendered for rh users', function () {
    Storage::fake('public');

    $rh = User::factory()->rh()->create();
    $employee = Employee::factory()->create();
    $contract = Contract::factory()->create([
        'employee_id' => $employee->id,
        'document_path' => 'contracts/old.pdf',
    ]);
    Storage::disk('public')->put('contracts/old.pdf', 'x');

    $this->actingAs($rh)->get(route('contracts.index'))->assertOk();
    $this->actingAs($rh)->get(route('contracts.create'))->assertOk();
    $this->actingAs($rh)->get(route('contracts.create', ['employee_id' => $employee->id]))->assertOk();
    $this->actingAs($rh)->get(route('contracts.show', $contract))->assertOk();
    $this->actingAs($rh)->get(route('contracts.edit', $contract))->assertOk();
});

test('a contract can be created with an uploaded document', function () {
    Storage::fake('public');

    $rh = User::factory()->rh()->create();
    $employee = Employee::factory()->create();
    $file = UploadedFile::fake()->create('contrat.pdf', 120, 'application/pdf');

    $response = $this->actingAs($rh)->post(route('contracts.store'), [
        'employee_id' => $employee->id,
        'type' => 'cdi',
        'start_date' => '2025-01-01',
        'end_date' => null,
        'base_salary' => '3500.50',
        'status' => 'active',
        'document' => $file,
    ]);

    $response->assertRedirect(route('contracts.index'));

    $contract = Contract::query()->where('employee_id', $employee->id)->first();
    expect($contract)->not->toBeNull();
    expect($contract->type)->toBe('cdi');
    expect($contract->document_path)->not->toBeNull();

    Storage::disk('public')->assertExists($contract->document_path);
});

test('a contract document can be replaced on update', function () {
    Storage::fake('public');

    $rh = User::factory()->rh()->create();
    $employee = Employee::factory()->create();
    $oldPath = 'contracts/original.pdf';
    Storage::disk('public')->put($oldPath, 'old');

    $contract = Contract::factory()->create([
        'employee_id' => $employee->id,
        'document_path' => $oldPath,
        'type' => 'cdd',
        'start_date' => '2025-06-01',
        'end_date' => '2025-12-31',
        'base_salary' => 3000,
        'status' => 'active',
    ]);

    $newFile = UploadedFile::fake()->create('nouveau.pdf', 80, 'application/pdf');

    $response = $this->actingAs($rh)->patch(route('contracts.update', $contract), [
        'employee_id' => $employee->id,
        'type' => 'cdd',
        'start_date' => '2025-06-01',
        'end_date' => '2025-12-31',
        'base_salary' => '3100.00',
        'status' => 'active',
        'document' => $newFile,
    ]);

    $response->assertRedirect(route('contracts.index'));

    $contract->refresh();

    Storage::disk('public')->assertMissing($oldPath);
    Storage::disk('public')->assertExists($contract->document_path);
    expect($contract->document_path)->not->toBe($oldPath);
});

test('a contract and its file can be deleted', function () {
    Storage::fake('public');

    $rh = User::factory()->rh()->create();
    $path = 'contracts/to-delete.pdf';
    Storage::disk('public')->put($path, 'content');

    $contract = Contract::factory()->create([
        'document_path' => $path,
    ]);

    $response = $this->actingAs($rh)->delete(route('contracts.destroy', $contract));

    $response->assertRedirect(route('contracts.index'));

    expect(Contract::query()->find($contract->id))->toBeNull();
    Storage::disk('public')->assertMissing($path);
});

test('employee show page includes contracts with document urls', function () {
    Storage::fake('public');

    $rh = User::factory()->rh()->create();
    $employee = Employee::factory()->create();
    $path = 'contracts/emp-contract.pdf';
    Storage::disk('public')->put($path, 'pdf');

    Contract::factory()->create([
        'employee_id' => $employee->id,
        'type' => 'cdi',
        'start_date' => '2024-04-01',
        'status' => 'active',
        'document_path' => $path,
    ]);

    $this->actingAs($rh)
        ->get(route('employees.show', $employee))
        ->assertInertia(fn (Assert $page) => $page
            ->component('employees/show')
            ->has('employee.contracts', 1)
            ->where('employee.contracts.0.type', 'cdi')
            ->where('employee.contracts.0.status', 'active')
            ->where('employee.contracts.0.document_url', Storage::disk('public')->url($path)),
        );
});

test('non rh users are redirected away from contracts', function () {
    $employeeUser = User::factory()->create(['role' => 'employee']);

    $this->actingAs($employeeUser)
        ->get(route('contracts.index'))
        ->assertRedirect(route('dashboard'));
});
