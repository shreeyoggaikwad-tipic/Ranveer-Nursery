<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => 'Super Admin',
            'email' => 'shreeyoggaikwad@gmail.com',
            'number' => '9527264942',
            'years_of_experience' => 10,
            'location' => 'Pimpri, Pune',
            'about' => 'This is the system administrator account.',
            'business_hours' => 'Mon-Fri 9am-6pm',
            'happy_clients' => 100,
            'password' => Hash::make('password'),
            'is_admin' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
