<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AppController;
use App\Http\Controllers\AuthController;

Route::get('/', [AppController::class, 'index'])->name('home');

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [AppController::class, 'dashboard'])->name('dashboard');
});

// Route::get('/dashboard', function () {
//     return inertia('dashboard');
// })->name('dashboard');

// Route::get('/employees', function () {
//     return inertia('employees/index');
// })->name('employees.index');

// Route::get('/employees/create', function () {
//     return inertia('employees/create');
// })->name('employees.create');

// Route::get('/departments', function () {
//     return inertia('departments/index');
// })->name('departments.index');

// Route::get('/departments/create', function () {
//     return inertia('departments/create');
// })->name('departments.create');
