<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::table('projects', function (Blueprint $table) {
        $table->dropColumn('images'); // Remove JSON column
        $table->string('image')->nullable(); // Add single image column
    });
}

public function down(): void
{
    Schema::table('projects', function (Blueprint $table) {
        $table->dropColumn('image');
        $table->json('images')->nullable();
    });
}

};
