<?php

namespace App\Http\Controllers\Schedule;

use App\Http\Controllers\Controller;
use App\Models\CarSchedule;
use App\Models\Schedule;
use Carbon\Carbon;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CarScheduleController extends Controller
{
    public function index(Request $request)
    {
        $schedules = CarSchedule::query()
            ->join('schedules', 'schedules.id', '=', 'schedule')
            ->join('statuses', 'statuses.id', '=', 'status')
            ->leftJoin('users', 'users.id', '=', 'user')
            ->when(!$request->month || !$request->year, function ($query) {
                $today = Carbon::today();
                $query->where('schedules.start_at', '>=', $today);
            })
            ->when($request->month, function ($query, $month) {
                $query->whereMonth('schedules.start_at', $month);
            })
            ->when($request->year, function ($query, $year) {
                $query->whereYear('schedules.start_at', $year);
            })
            ->where(function ($query) use ($request) {
                $query->where('car', 'like', "%{$request->search}%")
                    ->orWhere('driver', 'like', "%{$request->search}%")
                    ->orWhere('place', 'like', "%{$request->search}%")
                    ->orWhere('from', 'like', "%{$request->search}%")
                    ->orWhere('customer', 'like', "%{$request->search}%")
                    ->orWhere('statuses.name', 'like', "%{$request->search}%");
            })
            ->select(
                'schedules.id as id',
                'schedules.start_at',
                'schedules.end_at',
                'car',
                'driver',
                'schedules.updated_at',
                'customer',
                'organization',
                'description',
                'phone',
                'from',
                'note',
                'place',
                'statuses.id as status',
                'statuses.name as status_text',
                'users.name as user',
                'is_reschedule',
            )
            ->orderBy('schedules.start_at', 'asc')
            ->orderBy('car', 'asc')
            ->orderBy('status', 'asc')
            ->get();

        return Inertia::render('Schedule/Car/Index', [
            'schedules' => Inertia::lazy(fn () => $schedules),
            'request' => $request->all(),
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
            'status' => DB::table('statuses')->find(2)->id,
            'user' => $request->user,
            'description' => $request->description,
            'note' => $request->note,
        ]);

        $schedule->save();

        $carSchedule = CarSchedule::create([
            'schedule' => $schedule->id,
            'car' => $request->car,
            'driver' => $request->driver,
            'from' => $request->from,
            'customer' => $request->customer,
            'organization' => $request->organization,
            'phone' => $request->phone,
        ]);

        $carSchedule->save();

        return;
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
            'status' => $request->status,
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
        ]);

        $schedule->save();
        $carSchedule->save();

        return;
    }

    public function delete($id)
    {
        $schedule = Schedule::find($id);
        $carSchedule = CarSchedule::where('schedule', $id)->first();

        $carSchedule->delete();
        $schedule->delete();

        return;
    }

    public function assign($id, Request $request)
    {
        $schedule = Schedule::findOrFail($id);
        $schedule->status = $request->status;
        $schedule->save();

        $carSchedule = CarSchedule::where('schedule', $id)->first();
        $carSchedule->is_reschedule = false;
        $carSchedule->car = $request->car;
        $carSchedule->driver = $request->driver;
        $carSchedule->save();

        return;
    }

    public function setStatus($id, Request $request)
    {
        $schedule = Schedule::findOrFail($id);
        $schedule->status = $request->status;
        $schedule->save();

        $carSchedule = CarSchedule::where('schedule', $id)->first();
        $carSchedule->is_reschedule = false;
        $carSchedule->save();

        return;
    }
}
