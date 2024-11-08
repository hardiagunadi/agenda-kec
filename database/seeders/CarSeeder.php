<?php

namespace Database\Seeders;

use App\Models\Car;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Car::create([
            'reg_number' => 'AA 9573 GF',
            'brand' => 'MITSUBISHI',
            'type' => 'L.300GP',
            'chassis_number' => 'L300GP-212849',
            'machine_number' => '4632C-476591',
            'color' => 'HIJAU TUA',
            'year' => '1994',
            'doc_number' => '2107403I',
            'note' => 'Pickup',
        ]);

        Car::create([
            'reg_number' => 'AA 1028 XF',
            'brand' => 'MITSUBISHI',
            'type' => 'T120SS',
            'chassis_number' => '4G17CS554899',
            'machine_number' => 'TROSB0411214',
            'color' => 'BIRU',
            'year' => '1995',
            'doc_number' => 'A 3728131 I',
            'note' => 'Pajero',
        ]);

        Car::create([
            'reg_number' => 'AA 1138 XF',
            'brand' => 'TOYOTA',
            'type' => 'KIJANG INNOVA V AT',
            'chassis_number' => 'MHFXW43G3E4089600',
            'machine_number' => '1TR7885946',
            'color' => 'HITAM',
            'year' => '2014',
            'doc_number' => 'L-03222815I',
            'note' => 'Bambang Sumirat',
        ]);

        Car::create([
            'reg_number' => 'AA 1148 XF',
            'brand' => 'TOYOTA',
            'type' => 'KIJANG INNOVA V AT',
            'chassis_number' => 'MHFXW43G7E4088675',
            'machine_number' => '1TR-7855114',
            'color' => 'HITAM',
            'year' => '2014',
            'doc_number' => 'L-03222816',
            'note' => 'Dwi Martoyo',
        ]);

        Car::create([
            'reg_number' => 'AA 9506 HF',
            'brand' => 'JEEP',
            'type' => 'HARDTOP',
            'chassis_number' => '2F193465',
            'machine_number' => 'FJ40255099',
            'color' => 'HITAM',
            'year' => '1977',
            'doc_number' => '24579',
            'note' => 'Rudi Martono',
        ]);

        Car::create([
            'reg_number' => 'AA 9503 YF',
            'brand' => 'TOYOTA',
            'type' => 'INOVA G A/T',
            'chassis_number' => 'MHFJW8EMMOJ2361879',
            'machine_number' => '1TRA555357',
            'color' => 'HITAM',
            'year' => '2018',
            'doc_number' => 'O-00801838',
            'note' => 'Bambang Sumirat',
        ]);

        Car::create([
            'reg_number' => 'AA 9505 P',
            'brand' => 'TOYOTA',
            'type' => 'KIJANG INOVA TGN40R',
            'chassis_number' => 'MHFXW42G4A2157961',
            'machine_number' => '1TR6901795',
            'color' => 'HITAM',
            'year' => '2010',
            'doc_number' => '27169361',
            'note' => '',
        ]);

        Car::create([
            'reg_number' => 'AA 26 F',
            'brand' => 'TOYOTA',
            'type' => 'INNOVA E',
            'chassis_number' => 'MHFXW41G5D0059765',
            'machine_number' => '1TR7666706',
            'color' => 'ABU ABU METALIK',
            'year' => '2013',
            'doc_number' => 'K064780461',
            'note' => '',
        ]);

        Car::create([
            'reg_number' => 'AA 8109 XF',
            'brand' => 'MITSUBISHI',
            'type' => 'L.300 CYCLONE',
            'chassis_number' => 'MK2L0PU39HK011787',
            'machine_number' => '4D56CR00485',
            'color' => 'HITAM',
            'year' => '2017',
            'doc_number' => 'N02095227I',
            'note' => '',
        ]);

        Car::create([
            'reg_number' => 'AA 37 F',
            'brand' => 'TOYOTA',
            'type' => 'KIJANG INNOVA G DSL',
            'chassis_number' => 'MHFXS42G3D2545599',
            'machine_number' => '2KDU260906',
            'color' => 'ABU ABU METALIK',
            'year' => '2013',
            'doc_number' => 'K028437151',
            'note' => '',
        ]);

        Car::create([
            'reg_number' => 'AA 1152 XF',
            'brand' => 'TOYOTA',
            'type' => 'KIJANG INNOVA V MT',
            'chassis_number' => 'MHFXW43G4D4O7732',
            'machine_number' => '1TR7532415',
            'color' => 'HITAM METALIK',
            'year' => '2013',
            'doc_number' => '',
            'note' => '',
        ]);
    }
}
