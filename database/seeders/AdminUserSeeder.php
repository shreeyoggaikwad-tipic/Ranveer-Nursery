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
            'name' => 'Ranveer Rose Nursery',
            'email' => 'ranveerrosenursery8644@gmail.com',
            'number' => '9764203636',
            'years_of_experience' => 10,
            'location' => 'Pimpri, Pune',
            'about' => 'This is the Ranveer Rose Nursery Administrator account.',
            'business_hours' => 'Mon-Fri 8am-6pm',
            'happy_clients' => 100,
            'password' => Hash::make('password'),
            'is_admin' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
