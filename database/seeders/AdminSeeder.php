<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = new User();

        $user->name = 'Carlos Alognon';
        $user->email = 'carlos@gmail.com';
        $user->password = Hash::make('password');
        $user->role = 'admin';
        $user->save();

    }
}
