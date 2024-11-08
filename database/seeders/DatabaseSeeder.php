<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            TypeSeeder::class,
            CarSeeder::class,
            DriverSeeder::class,
            PlaceSeeder::class,
            OfficialSeeder::class,
            StatusSeeder::class,

            // has to go after others
            // ScheduleSeeder::class,
        ]);
    }
}
