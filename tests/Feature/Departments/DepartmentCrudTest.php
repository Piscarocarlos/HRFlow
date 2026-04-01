<?php

use App\Models\Department;
use App\Models\User;

test('department pages can be rendered', function () {
    $user = User::factory()->create();
    $department = Department::factory()->create();

    $this->actingAs($user)->get(route('departments.index'))->assertOk();
    $this->actingAs($user)->get(route('departments.create'))->assertOk();
    $this->actingAs($user)->get(route('departments.edit', $department))->assertOk();
});

test('a department can be created', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('departments.store'), [
        'name' => 'Ressources Humaines',
        'description' => 'Gestion administrative des employes.',
    ]);

    $response->assertRedirect(route('departments.index'));

    $this->assertDatabaseHas('departments', [
        'name' => 'Ressources Humaines',
    ]);
});

test('a department can be updated', function () {
    $user = User::factory()->create();
    $department = Department::factory()->create();

    $response = $this->actingAs($user)->patch(route('departments.update', $department), [
        'name' => 'Finance',
        'description' => 'Budget et comptabilite.',
    ]);

    $response->assertRedirect(route('departments.index'));

    $department->refresh();

    expect($department->name)->toBe('Finance');
    expect($department->description)->toBe('Budget et comptabilite.');
});

test('a department can be deleted', function () {
    $user = User::factory()->create();
    $department = Department::factory()->create();

    $response = $this->actingAs($user)->delete(route('departments.destroy', $department));

    $response->assertRedirect(route('departments.index'));
    expect($department->fresh())->toBeNull();
});
