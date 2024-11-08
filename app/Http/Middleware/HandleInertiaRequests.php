<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $permission = [];
        $placement = '';

        $user = $request->user();

        if ($user) {
            $isSuperUser = $user->role === 1;
            $placement = substr($user->email, strpos($user->email, '@'));
        }

        if ($user)
            $permission = [
                'view' => [
                    'settings' => $isSuperUser,
                ],
                'edit' => [
                    'official' => $isSuperUser,
                    'schedule' => $isSuperUser,
                ],
            ];

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
                'can' => $permission,
                'placement' => $placement,
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
            'cars' => DB::table('cars')->orderBy('reg_number')->get(),
            'drivers' => DB::table('drivers')->get(),
            'statuses' => DB::table('statuses')->get(),
            'officials' => DB::table('officials')->get(),
            'places' => DB::table('places')->get(),
        ]);
    }
}
