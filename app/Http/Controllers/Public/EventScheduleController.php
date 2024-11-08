<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\EventSchedule;
use App\Models\Schedule;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EventScheduleController extends Controller
{
    public function index(Request $request)
    {
        $schedules = EventSchedule::query()
            ->join('schedules', 'schedules.id', '=', 'schedule')
            ->join('statuses', 'statuses.id', '=', 'status')
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
                $query->where('place', 'like', "%{$request->search}%")
                    ->orWhere('description', 'like', "%{$request->search}%")
                    ->orWhere('customer', 'like', "%{$request->search}%")
                    ->orWhere('organization', 'like', "%{$request->search}%")
                    ->orWhere('customer', 'like', "%{$request->search}%")
                    ->orWhere('statuses.name', 'like', "%{$request->search}%");
            })
            ->select(
                'schedules.id as id',
                'schedules.start_at',
                'schedules.end_at',
                'schedules.updated_at',
                'organization',
                'description',
                'participants',
                'note',
                'place',
                'statuses.id as status',
                'statuses.name as status_text',
                'is_reschedule',
            )
            ->orderBy('schedules.start_at', 'asc')
            ->orderBy('status', 'asc')
            ->get();

        return Inertia::render('Public/Schedule/Event/Index', [
            'request' => $request->all(),
            'schedules' => Inertia::lazy(fn () => $schedules),
        ]);
    }

    public function create()
    {
        return Inertia::render('Public/Schedule/Event/Form', []);
    }

    public function edit($id)
    {
        $schedule = EventSchedule::where('schedule', $id)
            ->join('schedules', 'schedules.id', 'event_schedules.schedule')
            ->first();

        return Inertia::render('Public/Schedule/Event/Form', [
            'schedule' => $schedule,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'place' => 'required',
        ]);

        $schedule = Schedule::create([
            'type' => DB::table('types')->where('name', 'place')->first()->id,
            'start_at' => $request->start_at,
            'end_at' => $request->end_at,
            'place' => $request->place,
            'status' => DB::table('statuses')->find(1)->id,
            'description' => $request->description,
            'note' => $request->note,
        ]);

        $eventSchedule = EventSchedule::create([
            'schedule' => $schedule->id,
            'customer' => $request->customer,
            'organization' => $request->organization,
            'phone' => $request->phone,
            'is_reschedule' => false,
            'participants' => $request->participants,
        ]);

        $schedule->save();
        $eventSchedule->save();

        return redirect()->route('public.reportEventSchedule', $schedule->id);
    }

    public function update($id, Request $request)
    {
        $schedule = Schedule::find($id);
        $eventSchedule = EventSchedule::where('schedule', $id)->first();

        $request->validate([
            'place' => 'required',
        ]);

        $schedule->fill([
            'type' => DB::table('types')->where('name', 'place')->first()->id,
            'start_at' => $request->start_at,
            'end_at' => $request->end_at,
            'place' => $request->place,
            'status' => DB::table('statuses')->find(1)->id,
            'description' => $request->description,
            'note' => $request->note,
        ]);

        $eventSchedule->fill([
            'schedule' => $schedule->id,
            'customer' => $request->customer,
            'organization' => $request->organization,
            'phone' => $request->phone,
            'is_reschedule' => true,
            'participants' => $request->participants,
        ]);

        $schedule->save();
        $eventSchedule->save();

        return redirect()->route('public.reportEventSchedule', $schedule->id);
    }

    public function report($id)
    {
        $schedule = EventSchedule::where('schedule', $id)
            ->join('schedules', 'schedules.id', 'event_schedules.schedule')
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
                'participants',
                'note',
                'place',
                'statuses.id as status',
                'statuses.name as status_text',
                'is_reschedule',
            )
            ->first();

        return Inertia::render('Public/Schedule/Report', [
            'type' => 2,
            'id' => $id,
            'schedule' => $schedule,
        ]);
    }
}
