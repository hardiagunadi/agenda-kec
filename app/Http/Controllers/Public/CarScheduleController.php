<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\CarSchedule;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CarScheduleController extends Controller
{
    public function create()
    {
        return Inertia::render('Public/Schedule/Car/Form', []);
    }

    public function edit($id)
    {
        $schedule = CarSchedule::where('schedule', $id)
            ->join('schedules', 'schedules.id', 'car_schedules.schedule')
            ->first();

        return Inertia::render('Public/Schedule/Car/Form', [
            'schedule' => $schedule,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'place' => 'required',
        ]);

        $schedule = Schedule::create([
            'type' => DB::table('types')->where('name', 'car')->first()->id,
            'start_at' => $request->start_at,
            'end_at' => $request->end_at,
            'place' => $request->place,
            'status' => DB::table('statuses')->find(1)->id,
            'description' => $request->description,
            'note' => $request->note,
        ]);

        $carSchedule = CarSchedule::create([
            'schedule' => $schedule->id,
            'from' => $request->from,
            'customer' => $request->customer,
            'organization' => $request->organization,
            'phone' => $request->phone,
        ]);

        $schedule->save();
        $carSchedule->save();

        return redirect()->route('public.reportCarSchedule', $schedule->id);
    }

    public function update($id, Request $request)
    {
        $schedule = Schedule::find($id);
        $carSchedule = CarSchedule::where('schedule', $id)->first();

        $request->validate([
            'place' => 'required',
        ]);

        $schedule->fill([
            'type' => DB::table('types')->where('name', 'car')->first()->id,
            'start_at' => $request->start_at,
            'end_at' => $request->end_at,
            'place' => $request->place,
            'status' => DB::table('statuses')->find(1)->id,
            'description' => $request->description,
            'note' => $request->note,
        ]);

        $carSchedule->fill([
            'schedule' => $schedule->id,
            'car' => $request->car,
            'driver' => $request->driver,
            'from' => $request->from,
            'customer' => $request->customer,
            'organization' => $request->organization,
            'phone' => $request->phone,
            'is_reschedule' => true,
        ]);

        $schedule->save();
        $carSchedule->save();

        return redirect()->route('public.reportCarSchedule', $schedule->id);
    }

    public function report($id)
    {
        $schedule = CarSchedule::where('schedule', $id)
            ->join('schedules', 'schedules.id', 'car_schedules.schedule')
            ->join('statuses', 'statuses.id', '=', 'status')
            ->select(
                'schedules.id as id',
                'schedules.start_at',
                'schedules.end_at',
                'schedules.updated_at',
                'customer',
                'phone',
                'organization',
                'description',
                'note',
                'place',
                'statuses.id as status',
                'statuses.name as status_text',
                'is_reschedule',
            )
            ->first();

        return Inertia::render('Public/Schedule/Report', [
            'type' => 3,
            'id' => $id,
            'schedule' => $schedule,
        ]);
    }
}
