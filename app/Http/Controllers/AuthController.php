<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function showLoginForm()
    {
        return inertia('auth/login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return redirect()->back()->withErrors(['email' => 'Email ou mot de passe incorrect']);
        }

        if (!Hash::check($request->password, $user->password)) {
            return redirect()->back()->withErrors(['password' => 'Mot de passe incorrect']);
        }

        if(!$user->is_active) {
            return redirect()->back()->withErrors(['email' => 'Votre compte est inactif. Veuillez contacter l\'administrateur.']);
        }

        Auth::login($user, $request->remember);

        return redirect()->route('dashboard');
    }
}
