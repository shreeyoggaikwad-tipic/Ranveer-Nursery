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
    Schema::table('inquiries', function (Blueprint $table) {
        $table->boolean('request_served')->default(false)->after('message');
    });
}

public function down(): void
{
    Schema::table('inquiries', function (Blueprint $table) {
        $table->dropColumn('request_served');
    });
}
};
