<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\Schedule\CarScheduleController;
use App\Http\Controllers\Schedule\EventScheduleController;
use App\Http\Controllers\Schedule\OfficialScheduleController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Public\CarScheduleController as PublicCarScheduleController;
use App\Http\Controllers\Public\EventScheduleController as PublicEventScheduleController;
use App\Http\Controllers\Settings\PlaceController;
use App\Models\CarSchedule;
use App\Models\EventSchedule;
use Carbon\Carbon;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Homepage/Index', []);
})->name('homepage');

Route::get('/kiosk', function () {
    $today = Carbon::today();
    $schedules = EventSchedule::query()
        ->join('schedules', 'schedules.id', '=', 'schedule')
        ->whereDate('schedules.start_at', $today)
        ->where('schedules.status', 2)
        ->get();

    return Inertia::render('Kiosk', [
        'schedules' => $schedules,
    ]);
})->name('kiosk');

Route::get('/kioskab', function () {
    return Inertia::render('Kioskab', []);
})->name('kioskab');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{id}', [UserController::class, 'delete'])->name('users.delete');

    Route::prefix('pengaturan')->group(function () {
        Route::get('/', [SettingsController::class, 'index'])->name('settings');

        Route::get('/pengguna', [UserController::class, 'index'])->name('users');

        Route::prefix('tempat')
            ->controller(PlaceController::class)
            ->group(function () {
                Route::get('/', 'index')->name('settings.places');
                Route::post('/', 'create')->name('settings.places.create');
                Route::put('/{id}', 'update')->name('settings.places.update');
                Route::delete('/{id}', 'delete')->name('settings.places.delete');
            });
    });

    Route::prefix('jadwal')->group(function () {
        Route::prefix('pimpinan')
            ->controller(OfficialScheduleController::class)
            ->group(function () {
                Route::get('/', 'index')->name('officialSchedules');
                Route::post('/', 'store')->name('officialSchedules.store');
                Route::put('/{id}', 'update')->name('officialSchedules.update');
                Route::delete('/{id}', 'delete')->name('officialSchedules.delete');
                Route::patch('/{id}/delegasi', 'delegate')->name('officialSchedules.delegate');
            });

        Route::prefix('kegiatan')
            ->controller(EventScheduleController::class)
            ->group(function () {
                Route::get('/', 'index')->name('eventSchedules');
                Route::post('/', 'store')->name('eventSchedules.store');
                Route::put('/{id}', 'update')->name('eventSchedules.update');
                Route::delete('/{id}', 'delete')->name('eventSchedules.delete');
                Route::patch('/{id}/status', 'setStatus')->name('eventSchedules.setStatus');
            });

        Route::prefix('kendaraan')
            ->controller(CarScheduleController::class)
            ->group(function () {
                Route::get('/', 'index')->name('carSchedules');
                Route::post('/', 'store')->name('carSchedules.store');
                Route::put('/{id}', 'update')->name('carSchedules.update');
                Route::delete('/{id}', 'delete')->name('carSchedules.delete');
                Route::patch('/{id}/tentukan', 'assign')->name('schedules.car.assign');
                Route::patch('/{id}/status', 'setStatus')->name('carSchedules.setStatus');
            });
    });
});

/**
 * PUBLIC ROUTES
 */
Route::prefix('pinjam-pakai-kendaraan')
    ->controller(PublicCarScheduleController::class)
    ->group(function () {
        Route::get('/', 'create')->name('public.createCarSchedule');
        Route::post('/', 'store')->name('public.storeCarSchedule');
        Route::get('/{id}', 'edit')->name('public.editCarSchedule');
        Route::put('/{id}', 'update')->name('public.updateCarSchedule');
        Route::get('/{id}/selesai', 'report')->name('public.reportCarSchedule');
    });

Route::prefix('pinjam-pakai-ruangan')
    ->controller(PublicEventScheduleController::class)
    ->group(function () {
        Route::get('/cek', 'index')->name('public.event.schedules2');
        Route::get('/', 'create')->name('public.createEventSchedule');
        Route::post('/', 'store')->name('public.storeEventSchedule');
        Route::get('/{id}', 'edit')->name('public.editEventSchedule');
        Route::put('/{id}', 'update')->name('public.updateEventSchedule');
        Route::get('/{id}/selesai', 'report')->name('public.reportEventSchedule');
    });

Route::get('/cek-jadwal-ruangan', function () {
    return Inertia::render('Public/Schedule/Event/Index', []);
})->name('public.event.schedules');


require __DIR__ . '/auth.php';
