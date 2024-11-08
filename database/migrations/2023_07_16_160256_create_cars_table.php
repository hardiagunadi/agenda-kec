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
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->tinyText('reg_number');
            $table->tinyText('brand');
            $table->tinyText('type');
            $table->tinyText('chassis_number');
            $table->tinyText('machine_number');
            $table->tinyText('color');
            $table->tinyText('year');
            $table->tinyText('doc_number');

            $table->text('note');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
