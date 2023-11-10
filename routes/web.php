<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\UtilityController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/clear',[UtilityController::class,'clearCaches'])->name('clear');
Route::get('/ziggy',[UtilityController::class,'ziggy']);

Route::middleware('auth')->group(function () {
    Route::get('/reset-password', [ProfileController::class,'resetPassword'])->name('profile.resetPassword');
    Route::post('/resetPassword', [ProfileController::class,'resetPasswordStore'])->name('profile.resetPassword.store');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::controller(SettingController::class)->name('setting.')->group(function(){
        Route::get('/system-page','systemPage')->name('system');
        Route::post('/system-page','systemStore')->name('system.store');
    });

});

require __DIR__.'/auth.php';
