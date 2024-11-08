<?php

namespace App\Http\Controllers;

use App\Models\CarSchedule;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\OfficialSchedule;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();

        $officialSchedules = OfficialSchedule::query()
            ->join('schedules', 'schedules.id', '=', 'schedule')
            ->where('schedules.start_at', '>=', $today)
            ->get();

        $carSchedules = CarSchedule::query()
            ->join('schedules', 'schedules.id', '=', 'schedule')
            ->where('schedules.start_at', '>=', $today)
            ->get();

        return Inertia::render('Dashboard', [
            'schedules' => [
                'official' => $officialSchedules,
                'car' => $carSchedules,
            ]
        ]);
    }
}
