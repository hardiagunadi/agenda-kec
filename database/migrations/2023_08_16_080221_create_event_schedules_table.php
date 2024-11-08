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
        Schema::create('event_schedules', function (Blueprint $table) {
            $table->ulid('id')->unique()->primary();

            $table->foreignUlid('schedule')->constrained('schedules');

            $table->tinyText('customer')->nullable();
            $table->tinyText('organization')->nullable();
            $table->tinyText('phone')->nullable();

            $table->boolean('is_reschedule')->nullable();

            $table->smallInteger('participants')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_schedules');
    }
};
