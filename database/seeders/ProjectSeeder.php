<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('projects')->insert([
            [
                'name' => 'Residential Villa',
                'location' => 'Pune',
                'type' => 'home',
                'status' => 'completed',
                'description' => 'A luxurious villa project completed with modern amenities and landscaping.',
                'images' => json_encode([
                    'https://via.placeholder.com/640x480?text=Villa1',
                    'https://via.placeholder.com/640x480?text=Villa2',
                ]),
                'budget' => 2500000,
                'duration' => '8 months',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Skyline Apartments',
                'location' => 'Mumbai',
                'type' => 'apartment',
                'status' => 'in-progress',
                'description' => 'High-rise apartment complex with premium facilities under construction.',
                'images' => json_encode([
                    'https://via.placeholder.com/640x480?text=Apartment1',
                    'https://via.placeholder.com/640x480?text=Apartment2',
                ]),
                'budget' => 5000000,
                'duration' => '12 months',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Shopping Complex',
                'location' => 'Nagpur',
                'type' => 'other',
                'status' => 'completed',
                'description' => 'A commercial shopping complex with modern infrastructure and parking facilities.',
                'images' => json_encode([
                    'https://via.placeholder.com/640x480?text=Complex1',
                    'https://via.placeholder.com/640x480?text=Complex2',
                ]),
                'budget' => 3500000,
                'duration' => '10 months',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Lakeview Homes',
                'location' => 'Bangalore',
                'type' => 'home',
                'status' => 'in-progress',
                'description' => 'Scenic residential homes located near a lake with eco-friendly design.',
                'images' => json_encode([
                    'https://via.placeholder.com/640x480?text=Lakeview1',
                    'https://via.placeholder.com/640x480?text=Lakeview2',
                ]),
                'budget' => 2200000,
                'duration' => '7 months',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Corporate Tower',
                'location' => 'Delhi',
                'type' => 'other',
                'status' => 'completed',
                'description' => 'State-of-the-art corporate tower with sustainable building practices.',
                'images' => json_encode([
                    'https://via.placeholder.com/640x480?text=Tower1',
                    'https://via.placeholder.com/640x480?text=Tower2',
                ]),
                'budget' => 4500000,
                'duration' => '11 months',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Eco Apartments',
                'location' => 'Hyderabad',
                'type' => 'apartment',
                'status' => 'completed',
                'description' => 'Energy-efficient apartments with solar power and rainwater harvesting.',
                'images' => json_encode([
                    'https://via.placeholder.com/640x480?text=Eco1',
                    'https://via.placeholder.com/640x480?text=Eco2',
                ]),
                'budget' => 2700000,
                'duration' => '9 months',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Luxury Homes',
                'location' => 'Chennai',
                'type' => 'home',
                'status' => 'in-progress',
                'description' => 'Premium homes with modern design, clubhouse, and recreational facilities.',
                'images' => json_encode([
                    'https://via.placeholder.com/640x480?text=Luxury1',
                    'https://via.placeholder.com/640x480?text=Luxury2',
                ]),
                'budget' => 3000000,
                'duration' => '10 months',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Green Residency',
                'location' => 'Indore',
                'type' => 'apartment',
                'status' => 'completed',
                'description' => 'Residency project with landscaped gardens and community areas.',
                'images' => json_encode([
                    'https://via.placeholder.com/640x480?text=Residency1',
                    'https://via.placeholder.com/640x480?text=Residency2',
                ]),
                'budget' => 2000000,
                'duration' => '6 months',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Metro Office Park',
                'location' => 'Kolkata',
                'type' => 'other',
                'status' => 'in-progress',
                'description' => 'Modern office park located near metro stations for easy accessibility.',
                'images' => json_encode([
                    'https://via.placeholder.com/640x480?text=Office1',
                    'https://via.placeholder.com/640x480?text=Office2',
                ]),
                'budget' => 4000000,
                'duration' => '12 months',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Seaside Villas',
                'location' => 'Goa',
                'type' => 'home',
                'status' => 'completed',
                'description' => 'Beachside luxury villas offering serene sea views and premium living.',
                'images' => json_encode([
                    'https://via.placeholder.com/640x480?text=Seaside1',
                    'https://via.placeholder.com/640x480?text=Seaside2',
                ]),
                'budget' => 4800000,
                'duration' => '11 months',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
