<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        collect([
            [
                'name' => 'Informatique',
                'description' => 'Gestion des outils numeriques et du support technique.',
            ],
            [
                'name' => 'Finance',
                'description' => 'Suivi budgetaire, comptabilite et reporting financier.',
            ],
            [
                'name' => 'Commercial',
                'description' => 'Gestion des ventes et de la relation client.',
            ],
        ])->each(static fn (array $department) => Department::query()->updateOrCreate(
            ['name' => $department['name']],
            $department,
        ));
    }
}
