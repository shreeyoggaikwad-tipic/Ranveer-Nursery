<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
    $table->id();
    $table->string('title'); // Service name (e.g., Renovation)
    $table->text('description')->nullable();
    $table->text('benefits')->nullable(); // Store as text (could be JSON if multiple benefits)
    $table->json('photos')->nullable(); // Array of photo URLs/paths
    $table->timestamps();
});
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
