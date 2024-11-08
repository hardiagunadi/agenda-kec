<?php

namespace Database\Seeders;

use App\Models\Official;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OfficialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $officials = ['Bupati', 'Wakil Bupati', 'Sekretaris Daerah', 'Staf Ahli I', 'Staf Ahli II', 'Staf Ahli III', 'Asisten I', 'Asisten II', 'Asisten III'];

        foreach ($officials as $official) {
            DB::table('officials')->insert([
                'name' => $official,
            ]);
        }
    }
}
