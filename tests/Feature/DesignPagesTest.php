<?php

use App\Models\User;

it('renders design pages', function () {
    $user = User::factory()->create();

    $this->actingAs($user)->get(route('employees.index'))->assertOk();
    $this->actingAs($user)->get(route('employees.create'))->assertOk();
    $this->actingAs($user)->get(route('departments.index'))->assertOk();
    $this->actingAs($user)->get(route('departments.create'))->assertOk();
});
