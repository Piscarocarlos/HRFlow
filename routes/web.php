<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [AppController::class, 'index'])->name('home');

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.store');
});

Route::middleware('auth')->group(function () {

    Route::prefix('dashboard')->group(function () {
        Route::get('/', [AppController::class, 'dashboard'])->name('dashboard');

        Route::middleware('rh')->group(function () {
            Route::resource('employees', EmployeeController::class);
            Route::resource('contracts', ContractController::class);
        });

        Route::middleware('admin')->group(function () {
            Route::resource('departments', DepartmentController::class);
        });

        Route::middleware(['rh'])->group(function () {
            Route::get('/departments', [DepartmentController::class, 'index'])->name('departments.index');
        });
    });
});
