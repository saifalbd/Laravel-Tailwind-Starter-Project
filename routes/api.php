<?php

use App\Http\Controllers\AttachmentCategoryController;
use App\Http\Controllers\AttachmentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/attachments/{attachment}',[AttachmentController::class,'show'])->name('attach.show');
Route::apiResource('/attachment_categories',AttachmentCategoryController::class)->names('attachCategory');
Route::apiResource('/attachments',AttachmentController::class)->except(['update','show'])->names('attach');
Route::post('/attachments/{attachment}',[AttachmentController::class,'update'])->name('attach.update');




Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
