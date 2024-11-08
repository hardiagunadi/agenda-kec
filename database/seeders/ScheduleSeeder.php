<?php

namespace Database\Seeders;

use App\Models\Car;
use App\Models\CarSchedule;
use App\Models\Driver;
use App\Models\EventSchedule;
use App\Models\Official;
use App\Models\OfficialSchedule;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Schedule;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        for ($i = 0; $i < 25; $i++) {
            $start_at = $faker->dateTimeInInterval('-7 days', '+3 months');
            $end_at = Carbon::parse($start_at)->addHours(3)->toDateTimeString();
            $car_end_at = Carbon::parse($start_at)->addDays(1)->toDateTimeString();

            $eventSchedule = Schedule::create([
                'type' => DB::table('types')->first()->id,
                'description' => $faker->sentence(),
                'start_at' => $start_at,
                'end_at' => $end_at,
                'note' => $faker->text(30),
                'user' => User::inRandomOrder()->first()->id,
                'place' => DB::table('places')->inRandomOrder()->first()->name,
                'status' => $faker->numberBetween(1, 4),
            ]);

            EventSchedule::create([
                'schedule' => $eventSchedule->id,
                'customer' => $faker->name(),
                'organization' => $faker->company(),
                'phone' => '082316610322',
                'participants' => $faker->randomNumber(2, false),
                'is_reschedule' => $faker->boolean(),
            ]);

            $officialSchedule = Schedule::create([
                'type' => DB::table('types')->find(2)->id,
                'description' => $faker->sentence(),
                'start_at' => $start_at,
                'end_at' => $start_at,
                'note' => $faker->text(30),
                'user' => User::inRandomOrder()->first()->id,
                'place' => $faker->city(),
            ]);

            OfficialSchedule::create([
                'schedule' => $officialSchedule->id,
                'official' => DB::table('officials')->inRandomOrder()->first()->id,
            ]);

            $carSchedule = Schedule::create([
                'type' => DB::table('types')->find(3)->id,
                'description' => $faker->sentence(),
                'start_at' => $start_at,
                'end_at' => $car_end_at,
                'user' => User::inRandomOrder()->first()->id,
                'place' => $faker->city(),
                'note' => $faker->text(30),
                'status' => $faker->numberBetween(1, 4),
            ]);

            CarSchedule::create([
                'schedule' => $carSchedule->id,
                'car' => Car::inRandomOrder()->first()->reg_number,
                'driver' => Driver::inRandomOrder()->first()->name,
                'from' => 'Wonosobo',
                'customer' => $faker->name(),
                'organization' => $faker->company(),
                'phone' => '082316610322',
                'is_reschedule' => $faker->boolean(),
            ]);
        }
    }
}
