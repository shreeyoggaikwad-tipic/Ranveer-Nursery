<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@example.com'], // 👈 unique field
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'), // 👈 default password
                'is_admin' => true,
            ]
        );
    }
}
