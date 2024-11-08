<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        /**
         * 1. super: crud all
         * 2. pimpinan: view all
         * 3. admin: crud agenda
         * 4. user: read agenda
         */
        $roles = ['Super User', 'Pimpinan', 'Admin', 'User'];

        // Role::truncate();

        foreach ($roles as $role) {
            DB::table('roles')->insert([
                'name' => $role,
            ]);
        }
    }
}
