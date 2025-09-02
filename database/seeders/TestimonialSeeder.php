<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('testimonials')->insert([
            [
                'name' => 'Rahul Sharma',
                'photo' => 'photos/testimonials/rahul.jpg',
                'feedback' => 'The team did an excellent job. Our home renovation was smooth and on time!',
                'rating' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Priya Mehta',
                'photo' => 'photos/testimonials/priya.jpg',
                'feedback' => 'Very professional and reliable. Highly recommended for construction projects.',
                'rating' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Amit Patel',
                'photo' => 'photos/testimonials/amit.jpg',
                'feedback' => 'Quality work with great attention to detail. Would definitely work with them again.',
                'rating' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Neha Singh',
                'photo' => 'photos/testimonials/neha.jpg',
                'feedback' => 'They made the process very smooth and stress-free. Excellent service!',
                'rating' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Vikram Joshi',
                'photo' => 'photos/testimonials/vikram.jpg',
                'feedback' => 'Affordable pricing and timely delivery. Great experience overall.',
                'rating' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Sneha Kulkarni',
                'photo' => 'photos/testimonials/sneha.jpg',
                'feedback' => 'We are very happy with the new interior design. It looks beautiful!',
                'rating' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Anil Deshmukh',
                'photo' => 'photos/testimonials/anil.jpg',
                'feedback' => 'Reliable team with great project management skills.',
                'rating' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Kavita Rao',
                'photo' => 'photos/testimonials/kavita.jpg',
                'feedback' => 'The apartment construction exceeded our expectations. Very satisfied.',
                'rating' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Rohit Verma',
                'photo' => 'photos/testimonials/rohit.jpg',
                'feedback' => 'Their customer service is amazing. They always kept us updated.',
                'rating' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Pooja Nair',
                'photo' => 'photos/testimonials/pooja.jpg',
                'feedback' => 'Professional, punctual, and high-quality work. Totally recommend!',
                'rating' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
