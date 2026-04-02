<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DepartmentController;
use Illuminate\Support\Facades\Route;

Route::get('/', [AppController::class, 'index'])->name('home');

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.store');
});

Route::middleware('auth')->group(function () {

    Route::prefix('dashboard')->group(function () {
        Route::get('/', [AppController::class, 'dashboard'])->name('dashboard');

        Route::get('/employees', fn() => inertia('employees/index'))->name('employees.index');
        Route::get('/employees/create', fn() => inertia('employees/create'))->name('employees.create');

        Route::middleware('admin')->group(function () {
            Route::get('/departments/create', [DepartmentController::class, 'create'])->name('departments.create');
            Route::get('/departments/{department}/edit', [DepartmentController::class, 'edit'])->name('departments.edit');
            Route::post('/departments', [DepartmentController::class, 'store'])->name('departments.store');
            Route::patch('/departments/{department}', [DepartmentController::class, 'update'])->name('departments.update');
            Route::delete('/departments/{department}', [DepartmentController::class, 'destroy'])->name('departments.destroy');
        });

        Route::middleware(['rh'])->group(function () {
            Route::get('/departments', [DepartmentController::class, 'index'])->name('departments.index');
        });
    });
});
