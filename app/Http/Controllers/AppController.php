<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AppController extends Controller
{
    public function index()
    {
        return inertia('welcome');
    }

    public function dashboard()
    {
        return inertia('dashboard');
    }
}
