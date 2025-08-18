<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Project name
            $table->string('location')->nullable(); // City / Area
            $table->enum('type', ['home', 'apartment', 'other'])->default('home'); 
            $table->enum('status', ['completed', 'in-progress'])->default('in-progress');
            $table->text('description')->nullable(); 
            $table->json('images')->nullable(); // Multiple images stored as JSON
            $table->decimal('budget', 12, 2)->nullable(); // Budget in INR
            $table->string('duration')->nullable(); // Example: "6 months"
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
