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
            'years_of_experience' => 11,
            'location' => 'A/p. Koregaon Mul, Pune Solapur Road, Near Uruli Kanchan, tal. Haveli, Pune-412202 NH9',
            'about' => 'This is the Ranveer Rose Nursery Administrator account.',
            'business_hours' => 'Mon-Fri 9am-6pm',
            'happy_clients' => 100,
            'password' => Hash::make('ranveer@123'),
            'is_admin' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
