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
        Schema::create('car_schedules', function (Blueprint $table) {
            $table->ulid('id')->unique()->primary();

            $table->foreignUlid('schedule')->constrained('schedules');

            $table->tinyText('car')->nullable();
            $table->tinyText('driver')->nullable();

            $table->tinyText('customer')->nullable();
            $table->tinyText('organization')->nullable();
            $table->tinyText('phone')->nullable();

            $table->tinyText('from')->nullable();
            $table->boolean('is_reschedule')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car_schedules');
    }
};
