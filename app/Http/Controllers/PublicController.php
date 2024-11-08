<?php

namespace App\Http\Controllers;

use App\Models\CarSchedule;
use App\Models\EventSchedule;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function getCarScheduleReceipt($id)
    {
        $carSchedule = CarSchedule::where('schedule', $id)
            ->join('schedules', 'schedules.id', '=', 'car_schedules.schedule')
            ->first();

        return Inertia::render('Public/CarScheduleReceipt', [
            'schedule' => $carSchedule,
        ]);
    }

    public function getEventScheduleReceipt($id)
    {
        $eventSchedule = EventSchedule::where('schedule', $id)
            ->join('schedules', 'schedules.id', '=', 'event_schedules.schedule')
            ->first();

        return Inertia::render('Public/EventScheduleReceipt', [
            'schedule' => $eventSchedule,
        ]);
    }

    public function createCarSchedule()
    {
        return Inertia::render('Public/Schedule/Car/Form', []);
    }

    public function createEventSchedule()
    {
        return Inertia::render('Public/Schedule/Event/Form', []);
    }

    public function editCarSchedule($id)
    {
        $schedule = CarSchedule::where('schedule', $id)
            ->join('schedules', 'schedules.id', 'car_schedules.schedule')
            ->first();

        return Inertia::render('Public/Schedule/Car/Form', [
            'schedule' => $schedule,
        ]);
    }

    public function updateCarSchedule($id, Request $request)
    {
        $schedule = Schedule::find($id);
        $carSchedule = CarSchedule::where('schedule', $id)->first();

        $request->validate([
            'place' => 'required',
        ]);

        $schedule->fill([
            'type' => DB::table('types')->find(3)->id,
            'time' => $request->time,
            'place' => $request->place,
            'status' => DB::table('statuses')->find(1)->id,
            'description' => $request->description,
            'note' => $request->note,
        ]);

        $carSchedule->fill([
            'schedule' => $schedule->id,
            'car' => $request->car,
            'driver' => $request->driver,
            'time_end' => $request->time_end,
            'from' => $request->from,
            'customer' => $request->customer,
            'organization' => $request->organization,
            'phone' => $request->phone,
        ]);

        $schedule->save();
        $carSchedule->save();

        return;
    }

    public function storeCarSchedule(Request $request)
    {
        $request->validate([
            'place' => 'required',
        ]);

        $schedule = Schedule::create([
            'type' => DB::table('types')->find(3)->id,
            'time' => $request->time,
            'place' => $request->place,
            'status' => DB::table('statuses')->find(1)->id,
            'description' => $request->description,
            'note' => $request->note,
        ]);

        $schedule->save();

        $carSchedule = CarSchedule::create([
            'schedule' => $schedule->id,
            'from' => $request->from,
            'customer' => $request->customer,
            'organization' => $request->organization,
            'phone' => $request->phone,
            'time_end' => $request->time_end,
        ]);

        $carSchedule->save();

        return redirect(route('public.getCarScheduleReceipt', $carSchedule->schedule));
    }

    public function storeEventSchedule(Request $request)
    {
        $request->validate([
            'place' => 'required',
        ]);

        $schedule = Schedule::create([
            'type' => DB::table('types')->find(3)->id,
            'time' => $request->time,
            'place' => $request->place,
            'status' => DB::table('statuses')->find(1)->id,
            'description' => $request->description,
            'note' => $request->note,
        ]);

        $schedule->save();

        $eventSchedule = EventSchedule::create([
            'schedule' => $schedule->id,
            'customer' => $request->customer,
            'organization' => $request->organization,
            'phone' => $request->phone,
            'is_reschedule' => $request->is_reschedule,
        ]);

        $eventSchedule->save();

        return redirect(route('public.getEventScheduleReceipt', $eventSchedule->schedule));
    }
}
