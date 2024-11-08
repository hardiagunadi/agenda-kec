<?php

namespace Database\Seeders;

use App\Models\Place;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Place::create([
            'name' => 'Pendopo Bupati',
            'capacity' => 100,
        ]);

        Place::create([
            'name' => 'Pendopo Wakil Bupati',
            'capacity' => 50,
        ]);

        Place::create([
            'name' => 'Ruang Rapat Soerjohadikoesoemo',
            'capacity' => 25,
            'note' => 'Eks. Kendali Bawah'
        ]);

        Place::create([
            'name' => 'Ruang Rapat Mangoenkoesoemo',
            'capacity' => 88
        ]);

        Place::create([
            'name' => 'Ruang Rapat Kertonegoro',
            'capacity' => 15,
        ]);

        Place::create([
            'name' => 'Ruang Rapat Tjokroadisoerdjo',
            'capacity' => 10,
        ]);
    }
}
