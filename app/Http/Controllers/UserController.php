<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::query()
            ->join('roles', 'roles.id', '=', 'users.role')
            ->when($request, function ($query, $request) {
                if ($request->search)
                    $query->where('users.name', 'like', "%{$request->search}%")
                        ->orWhere('users.email', 'like', "%{$request->search}%");
            })
            ->select(
                'users.id',
                'users.email',
                'users.name',
                'roles.name as role',
            )
            ->orderBy('users.name')
            ->paginate(10);

        return Inertia::render('Settings/User/Index', [
            'pagination' => [
                'current' => $users->currentPage(),
                'last' => $users->lastPage(),
                'total' => $users->total(),
            ],
            'users' => Inertia::lazy(fn () => $users->all()),
        ]);
    }

    public function create()
    {
        return Inertia::render('User/Form', [
            'roles' => DB::table('roles')->select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:' . User::class,
            'password' => 'required',
            'role' => 'required',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        $user->save();

        return redirect()->route('users');
    }

    public function edit($id)
    {
        return Inertia::render('User/Form', [
            'user' => User::find($id),
            'roles' => DB::table('roles')->select('id', 'name')->get(),
        ]);
    }

    public function update($id, Request $request)
    {
        $user = User::find($id);

        $request->validate([
            'name' => 'required',
            'email' => [
                'required',
                Rule::unique('users')->ignore($user->id),
            ],
            'role' => 'required',
        ]);

        $user->fill([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? Hash::make($request->password) : $user->password,
            'role' => $request->role,
        ]);

        $user->save();

        return redirect()->route('users');
    }

    public function delete($id)
    {
        $user = User::find($id);

        $user->delete();

        return redirect()->route('users');
    }
}
