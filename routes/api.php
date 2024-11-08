<?php

use App\Http\Controllers\APIController;
use App\Models\EventSchedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/', function () {
    return response([
        'message' => 'testing ok'
    ]);
})->name('api');

Route::get('/jadwal/kegiatan/tempat/{tempat}/mulai/{mulai}/sampai/{sampai}', function ($tempat, $mulai, $sampai) {
    $found = EventSchedule::query()
        ->join('schedules', 'schedules.id', '=', 'schedule')
        ->where('schedules.place', $tempat)
        ->where(function ($query) use ($mulai, $sampai) {
            $query->where(function ($q) use ($mulai, $sampai) {
                $q->where('schedules.start_at', '>=', $mulai)
                    ->where('schedules.start_at', '<', $sampai);
            })->orWhere(function ($q) use ($mulai, $sampai) {
                $q->where('schedules.start_at', '<=', $mulai)
                    ->where('schedules.end_at', '>', $sampai);
            })->orWhere(function ($q) use ($mulai, $sampai) {
                $q->where('schedules.end_at', '>', $mulai)
                    ->where('schedules.end_at', '<=', $sampai);
            })->orWhere(function ($q) use ($mulai, $sampai) {
                $q->where('schedules.start_at', '>=', $mulai)
                    ->where('schedules.end_at', '<=', $sampai);
            });
        })
        ->select(
            'schedules.id as id',
            'description',
        )
        ->first();

    if ($found) return response([
        'message' => 'berhasil mencari data',
        'data' => $found,
    ]);

    if (!$found) return response([
        'message' => 'tidak ada data',
    ], 204);

    return response([
        'message' => 'terjadi kesalahan!',
    ], 500);
})->name('api.getEvent');

Route::get('/jadwal/kegiatan/{place}/{start_at}/{end_at}', function ($place, $start_at, $end_at) {
    $found = EventSchedule::query()
        ->join('schedules', 'schedules.id', '=', 'schedule')
        ->where('schedules.place', $place)
        ->where(function ($query) use ($start_at, $end_at) {
            $query->where(function ($q) use ($start_at, $end_at) {
                $q->where('schedules.start_at', '>=', $start_at)
                    ->where('schedules.start_at', '<', $end_at);
            })->orWhere(function ($q) use ($start_at, $end_at) {
                $q->where('schedules.start_at', '<=', $start_at)
                    ->where('schedules.end_at', '>', $end_at);
            })->orWhere(function ($q) use ($start_at, $end_at) {
                $q->where('schedules.end_at', '>', $start_at)
                    ->where('schedules.end_at', '<=', $end_at);
            })->orWhere(function ($q) use ($start_at, $end_at) {
                $q->where('schedules.start_at', '>=', $start_at)
                    ->where('schedules.end_at', '<=', $end_at);
            });
        })
        ->select(
            'schedules.id as id',
            'description',
        )
        ->first();

    if (!$found) return response('tidak ditemukan', 204);

    return response($found);
})->name('api.getEventByPlaceAndTime');
