<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Super User',
            'email' => 'seed@super',
            'role' => DB::table('roles')->find(1)->id,
            'password' => Hash::make('pandawsb'),
        ]);

        User::create([
            'name' => 'Kepala Bagian Umum',
            'email' => 'kabag@umum',
            'role' => DB::table('roles')->find(2)->id,
            'password' => Hash::make('pandawsb'),
        ]);

        User::create([
            'name' => 'Kepala Bagian Prokompim',
            'email' => 'kabag@prokompim',
            'role' => DB::table('roles')->find(2)->id,
            'password' => Hash::make('pandawsb'),
        ]);

        User::create([
            'name' => 'Ajudan Bupati',
            'email' => 'ajudan@bupati',
            'role' => DB::table('roles')->find(3)->id,
            'password' => Hash::make('pandawsb'),
        ]);

        User::create([
            'name' => 'Ajudan Wakil Bupati',
            'email' => 'ajudan@wabup',
            'role' => DB::table('roles')->find(3)->id,
            'password' => Hash::make('pandawsb'),
        ]);

        User::create([
            'name' => 'Ajudan Sekretaris Daerah',
            'email' => 'ajudan@sekda',
            'role' => DB::table('roles')->find(3)->id,
            'password' => Hash::make('pandawsb'),
        ]);

        User::create([
            'name' => 'Pengelola Kendaraan Dinas',
            'email' => 'admin@aset',
            'role' => DB::table('roles')->find(3)->id,
            'password' => Hash::make('pandawsb'),
        ]);

        User::create([
            'name' => 'Pengelola Ruang Rapat',
            'email' => 'admin@kegiatan',
            'role' => DB::table('roles')->find(3)->id,
            'password' => Hash::make('pandawsb'),
        ]);

        User::create([
            'name' => 'Staf Bagian Umum',
            'email' => 'staf@umum',
            'role' => DB::table('roles')->find(4)->id,
            'password' => Hash::make('pandawsb'),
        ]);

        User::create([
            'name' => 'Staf Bagian Umum',
            'email' => 'staf@prokompim',
            'role' => DB::table('roles')->find(4)->id,
            'password' => Hash::make('pandawsb'),
        ]);
    }
}
