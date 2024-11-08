<?php

namespace App\Http\Controllers\Schedule;

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
                $query->where('place', 'like', "%{$request->search}%")
                    ->orWhere('description', 'like', "%{$request->search}%")
                    ->orWhere('customer', 'like', "%{$request->search}%")
                    ->orWhere('organization', 'like', "%{$request->search}%")
                    ->orWhere('customer', 'like', "%{$request->search}%")
                    ->orWhere('statuses.name', 'like', "%{$request->search}%");
            })
            ->select(
                'schedules.id as id',
                'schedules.updated_at',
                'schedules.start_at',
                'schedules.end_at',
                'customer',
                'organization',
                'description',
                'participants',
                'phone',
                'note',
                'place',
                'statuses.id as status',
                'statuses.name as status_text',
                'users.name as user',
                'is_reschedule',
            )
            ->orderBy('schedules.start_at', 'asc')
            ->orderBy('status', 'asc')
            ->get();

        return Inertia::render('Schedule/Event/Index', [
            'request' => $request->all(),
            'schedules' => Inertia::lazy(fn () => $schedules),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'customer' => 'required',
        ]);

        $schedule  = Schedule::create([
            'type' => DB::table('types')->where('name', 'place')->first()->id,
            'start_at' => $request->start_at,
            'end_at' => $request->end_at,
            'place' => $request->place['name'],
            'status' => $request->status,
            'user' => $request->user,
            'description' => $request->description,
            'note' => $request->note,
        ]);

        $schedule->save();

        $eventSchedule = EventSchedule::create([
            'schedule' => $schedule->id,
            'customer' => $request->customer,
            'organization' => $request->organization,
            'phone' => $request->phone,
            'participants' => $request->participants,
        ]);

        $eventSchedule->save();

        return;
    }

    public function update($id, Request $request)
    {
        $schedule = Schedule::find($id);
        $eventSchedule = EventSchedule::where('schedule', $id)->first();

        $request->validate([
            'customer' => 'required',
        ]);

        $schedule->fill([
            'type' => DB::table('types')->where('name', 'place')->first()->id,
            'start_at' => $request->start_at,
            'end_at' => $request->end_at,
            'place' => $request->place['name'],
            'status' => $request->status,
            'user' => $request->user,
            'description' => $request->description,
            'note' => $request->note,
        ]);

        $eventSchedule->fill([
            'schedule' => $schedule->id,
            'customer' => $request->customer,
            'organization' => $request->organization,
            'phone' => $request->phone,
            'participants' => $request->participants,
        ]);

        $schedule->save();
        $eventSchedule->save();

        return;
    }

    public function delete($id)
    {
        $schedule = Schedule::find($id);
        $eventSchedule = EventSchedule::where('schedule', $id)->first();

        $eventSchedule->delete();
        $schedule->delete();

        return;
    }

    public function setStatus($id, Request $request)
    {
        $schedule = Schedule::findOrFail($id);
        $schedule->status = $request->status;
        $schedule->save();

        $eventSchedule = EventSchedule::where('schedule', $id)->first();
        $eventSchedule->is_reschedule = false;
        $eventSchedule->save();

        return;
    }
}
