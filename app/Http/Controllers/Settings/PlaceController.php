<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Place;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlaceController extends Controller
{
    public function index(Request $request)
    {
        $places = Place::query()
            ->when($request->name, function ($query, $name) {
                $query->where('name', 'like', $name);
            })
            ->orderBy('name')
            ->get();

        return Inertia::render(
            'Settings/Place/Index',
            [
                'request' => $request->all(),
                'places' => Inertia::lazy(fn () => $places),
            ]
        );
    }

    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'capacity' => 'required',
        ]);

        $place = Place::create([
            'name' => $request->name,
            'capacity' => $request->capacity,
            'note' => $request->note,
        ]);

        $success = $place->save();

        return;
    }

    public function update($id, Request $request)
    {
        $place = Place::find($id);

        $request->validate([
            'name' => 'required',
            'capacity' => 'required',
        ]);

        $place->fill([
            'name' => $request->name,
            'capacity' => $request->capacity,
            'note' => $request->note,
        ]);

        $success = $place->save();

        return;
    }

    public function delete($id)
    {
        $place = Place::find($id);

        $place->delete();

        return;
    }
}
