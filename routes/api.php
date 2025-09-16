<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

// Authentication routes
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/auth/reset-password', [AuthController::class, 'resetPassword']);

// Contact/Inquiry submission (public)
Route::post('/inquiries1', [InquiryController::class, 'store1']);
Route::post('/inquiries2', [InquiryController::class, 'store2']);
Route::post('/inquiries3', [InquiryController::class, 'store3']);

Route::get('/users/{id}', [UserController::class, 'show']);

// Protected Admin routes
Route::middleware(['auth:sanctum', 'is_admin'])->group(function () {
    
    // View inquiries (Admin only)
    Route::get('/inquiries1', [InquiryController::class, 'index1']);
    Route::get('/inquiries2', [InquiryController::class, 'index2']);
    Route::get('/inquiries3', [InquiryController::class, 'index3']);
    Route::get('/inquiries/export', [InquiryController::class, 'export']);
    Route::delete('/inquiries/{id}', [InquiryController::class, 'destroy']);
    Route::patch('/inquiries/{id}/toggle-served', [InquiryController::class, 'toggleRequestServed']);

    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/profile', [AuthController::class, 'getAdminProfile']);
    Route::put('/profile', [AuthController::class, 'updateAdminProfile']);
});