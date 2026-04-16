<?php

namespace Database\Factories;

use App\Models\Contract;
use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Contract>
 */
class ContractFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'employee_id' => Employee::factory(),
            'type' => fake()->randomElement(['cdi', 'cdd', 'stage']),
            'start_date' => fake()->date(),
            'end_date' => fake()->optional()->date(),
            'base_salary' => fake()->randomFloat(2, 2500, 9000),
            'status' => fake()->randomElement(['active', 'expired', 'terminated']),
            'document_path' => null,
        ];
    }
}
