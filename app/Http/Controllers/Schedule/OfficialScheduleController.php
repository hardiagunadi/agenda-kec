<?php

namespace App\Http\Controllers\Schedule;

use App\Http\Controllers\Controller;
use App\Models\EventSchedule;
use App\Models\OfficialSchedule;
use App\Models\Schedule;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OfficialScheduleController extends Controller
{
    public function index(Request $request)
    {
        $schedules = OfficialSchedule::query()
            ->join('schedules', 'schedules.id', '=', 'schedule')
            ->join('statuses', 'statuses.id', '=', 'status')
            ->join('users', 'users.id', '=', 'user')
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
            ->when($request->official, function ($query, $official) {
                $query->where('official', $official);
            })
            ->where(function ($query) use ($request) {
                $query->where('place', "like", "%{$request->search}%")
                    ->orWhere('description', "like", "%{$request->search}%");
            })
            ->select(
                'schedules.id as id',
                'schedules.updated_at',
                'schedules.start_at',
                'description',
                'note',
                'place',
                'is_formal',
                'delegation',
                'users.email as user',
                'official',
            )
            ->orderby('schedules.start_at', 'asc')
            ->get();

        return Inertia::render('Schedule/Official/Index', [
            'request' => $request->all(),
            'schedules' => Inertia::lazy(fn () => $schedules),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'place' => 'required',
        ]);

        $schedule = Schedule::create([
            'type' => DB::table('types')->where('name', 'official')->first()->id,
            'start_at' => $request->start_at,
            'end_at' => $request->start_at,
            'place' => $request->place,
            'description' => $request->description,
            'note' => $request->note,
            'status' => DB::table('statuses')->find(2)->id,
            'user' => $request->user,
        ]);

        $officialSchedule = OfficialSchedule::create([
            'schedule' => $schedule->id,
            'official' => $request->official,
        ]);

        $officialSchedule->save();

        return;
    }

    public function update($id, Request $request)
    {
        $schedule = Schedule::find($id);
        $officialSchedule = OfficialSchedule::where('schedule', $id)->first();

        $request->validate([
            'place' => 'required',
        ]);

        $schedule->fill([
            'type' => DB::table('types')->where('name', 'official')->first()->id,
            'start_at' => $request->start_at,
            'end_at' => $request->start_at,
            'place' => $request->place,
            'status' => DB::table('statuses')->find(2)->id,
            'description' => $request->description,
            'note' => $request->note,
        ]);

        $officialSchedule->fill([
            'schedule' => $schedule->id,
            'official' => $request->official,
            'delegation' => $request->delegation,
        ]);

        $schedule->save();
        $officialSchedule->save();

        return;
    }

    public function delete($id)
    {
        $schedule = Schedule::find($id);
        $officialSchedule = OfficialSchedule::where('schedule', $id)->first();

        $officialSchedule->delete();
        $schedule->delete();

        return;
    }


    public function delegate($id, Request $request)
    {
        $schedule = OfficialSchedule::where('schedule', $id)->first();

        $schedule->delegation = $request->delegation;

        $schedule->save();

        return;
    }
}
