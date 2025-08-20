<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
{
    $this->call(AdminUserSeeder::class);
    $this->call(ProjectSeeder::class);
    $this->call(ServiceSeeder::class);
    $this->call(TestimonialSeeder::class);
    $this->call(InquirySeeder::class);
}
}
