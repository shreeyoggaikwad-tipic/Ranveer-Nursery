<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
{
    Schema::table('inquiries', function (Blueprint $table) {
        $table->unsignedBigInteger('company_id')->nullable();

        // $table->foreign('company_id')
        //       ->references('id')
        //       ->on('companies')
        //       ->onDelete('set null')
        //       ->onUpdate('cascade');
    });
}

public function down()
{
    Schema::table('inquiries', function (Blueprint $table) {
        // $table->dropForeign(['company_id']);
        $table->dropColumn('company_id');
    });
}

};
