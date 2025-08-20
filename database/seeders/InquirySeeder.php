<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InquirySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('inquiries')->insert([
            [
                'name' => 'Rahul Sharma',
                'email' => 'rahul@example.com',
                'phone' => '9876543210',
                'message' => 'I am interested in building a custom home. Please share details.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Priya Mehta',
                'email' => 'priya@example.com',
                'phone' => '9988776655',
                'message' => 'Do you provide apartment renovation services?',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Amit Verma',
                'email' => 'amit@example.com',
                'phone' => '9123456789',
                'message' => 'Looking for cost estimate of a 3BHK apartment construction.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Sneha Kulkarni',
                'email' => 'sneha@example.com',
                'phone' => '9765432109',
                'message' => 'Do you also take up interior design projects?',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Rohan Patil',
                'email' => 'rohan@example.com',
                'phone' => '9876501234',
                'message' => 'Can you share your past completed projects portfolio?',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Neha Gupta',
                'email' => 'neha@example.com',
                'phone' => '9090909090',
                'message' => 'What is the average timeline for villa construction?',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Vikram Singh',
                'email' => 'vikram@example.com',
                'phone' => '9801234567',
                'message' => 'I need help with structural repairs of my house.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Anjali Deshmukh',
                'email' => 'anjali@example.com',
                'phone' => '9823456780',
                'message' => 'Do you offer turnkey construction solutions?',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Karan Joshi',
                'email' => 'karan@example.com',
                'phone' => '9988007766',
                'message' => 'Please call me regarding renovation of my office space.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Meera Nair',
                'email' => 'meera@example.com',
                'phone' => '9876123456',
                'message' => 'Interested in interior design services for a 2BHK flat.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
