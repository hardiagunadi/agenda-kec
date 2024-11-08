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
        Schema::create('official_schedules', function (Blueprint $table) {
            $table->ulid('id')->unique()->primary();

            $table->boolean('is_formal')->default(true);
            $table->text('delegation')->nullable();

            $table->foreignUlid('schedule')->constrained('schedules');
            $table->foreignId('official')->constrained('officials');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('official_schedules');
    }
};
