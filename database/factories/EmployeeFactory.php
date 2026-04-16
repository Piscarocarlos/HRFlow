<?php

namespace Database\Factories;

use App\Models\Department;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $firstName = fake()->firstName();
        $lastName = fake()->lastName();

        return [
            'user_id' => User::factory()->state([
                'name' => $firstName.' '.$lastName,
                'role' => 'employee',
            ]),
            'employee_number' => 'EMP-'.fake()->unique()->numerify('####'),
            'first_name' => $firstName,
            'last_name' => $lastName,
            'phone' => fake()->optional()->phoneNumber(),
            'hire_date' => fake()->date(),
            'birth_date' => fake()->optional()->date(),
            'department_id' => Department::factory(),
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }
}
