<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('services')->insert([
            [
                'title' => 'Home Renovation',
                'description' => 'Complete home renovation services including structural, electrical, and finishing work.',
                'benefits' => 'Increased property value, Modern design, Better space utilization',
                'photos' => json_encode([
                    'https://via.placeholder.com/640x480?text=Renovation1',
                    'https://via.placeholder.com/640x480?text=Renovation2',
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Interior Design',
                'description' => 'Creative and modern interior design solutions for residential and commercial spaces.',
                'benefits' => 'Stylish interiors, Personalized layouts, Comfort and functionality',
                'photos' => json_encode([
                    'https://via.placeholder.com/640x480?text=Interior1',
                    'https://via.placeholder.com/640x480?text=Interior2',
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Commercial Construction',
                'description' => 'Full-scale commercial building construction with premium quality materials.',
                'benefits' => 'Durable structures, Efficient planning, Cost-effective solutions',
                'photos' => json_encode([
                    'https://via.placeholder.com/640x480?text=Commercial1',
                    'https://via.placeholder.com/640x480?text=Commercial2',
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Structural Repairs',
                'description' => 'Expert repair services for cracks, foundation issues, and structural reinforcements.',
                'benefits' => 'Improved safety, Longer building lifespan, Prevents future damage',
                'photos' => json_encode([
                    'https://via.placeholder.com/640x480?text=Repair1',
                    'https://via.placeholder.com/640x480?text=Repair2',
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Landscaping',
                'description' => 'Professional garden and outdoor landscaping to enhance property aesthetics.',
                'benefits' => 'Beautiful outdoors, Eco-friendly design, Better property value',
                'photos' => json_encode([
                    'https://via.placeholder.com/640x480?text=Landscape1',
                    'https://via.placeholder.com/640x480?text=Landscape2',
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Painting & Finishing',
                'description' => 'High-quality painting and finishing services for interiors and exteriors.',
                'benefits' => 'Durable finish, Modern color palette, Fresh new look',
                'photos' => json_encode([
                    'https://via.placeholder.com/640x480?text=Painting1',
                    'https://via.placeholder.com/640x480?text=Painting2',
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Plumbing & Electrical',
                'description' => 'Reliable plumbing and electrical solutions for new and existing properties.',
                'benefits' => 'Safe wiring, Leak-free plumbing, Long-lasting installations',
                'photos' => json_encode([
                    'https://via.placeholder.com/640x480?text=Plumbing1',
                    'https://via.placeholder.com/640x480?text=Electrical1',
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Modular Kitchen',
                'description' => 'Customized modular kitchen designs with modern storage solutions.',
                'benefits' => 'Space efficiency, Modern design, Easy maintenance',
                'photos' => json_encode([
                    'https://via.placeholder.com/640x480?text=Kitchen1',
                    'https://via.placeholder.com/640x480?text=Kitchen2',
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'False Ceiling',
                'description' => 'Designer false ceilings with lighting solutions for stylish interiors.',
                'benefits' => 'Improved aesthetics, Better lighting, Acoustic control',
                'photos' => json_encode([
                    'https://via.placeholder.com/640x480?text=Ceiling1',
                    'https://via.placeholder.com/640x480?text=Ceiling2',
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Tile & Flooring',
                'description' => 'Premium tile and flooring installation services for all property types.',
                'benefits' => 'Durable surfaces, Wide design choices, Easy cleaning',
                'photos' => json_encode([
                    'https://via.placeholder.com/640x480?text=Floor1',
                    'https://via.placeholder.com/640x480?text=Floor2',
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
