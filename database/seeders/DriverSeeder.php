<?php

namespace Database\Seeders;

use App\Models\Driver;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DriverSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $drivers = [
            'Bambang Sumirat',
            'Rudi Martono',
            'Dwi Martoyo',
            'Novican'
        ];

        foreach ($drivers as $driver) {
            Driver::create([
                'name' => $driver,
            ]);
        }
    }
}
