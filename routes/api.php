<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

// Authentication routes
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/auth/reset-password', [AuthController::class, 'resetPassword']);

// Public routes (accessible without authentication)
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{id}', [ProjectController::class, 'show']);
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{id}', [ServiceController::class, 'show']);
Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/testimonials/{id}', [TestimonialController::class, 'show']);

// Contact/Inquiry submission (public)
Route::post('/inquiries', [InquiryController::class, 'store']);

Route::get('/users/{id}', [UserController::class, 'show']);

// Protected Admin routes
Route::middleware(['auth:sanctum', 'is_admin'])->group(function () {
    // Projects management (Admin only)
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::put('/projects/{id}', [ProjectController::class, 'update']);
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);
    
    // Services management (Admin only)
    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']);
    
    // Testimonials management (Admin only)
    Route::post('/testimonials', [TestimonialController::class, 'store']);
    Route::put('/testimonials/{id}', [TestimonialController::class, 'update']);
    Route::delete('/testimonials/{id}', [TestimonialController::class, 'destroy']);
    
    // View inquiries (Admin only)
    Route::get('/inquiries', [InquiryController::class, 'index']);
    Route::get('/inquiries/export', [InquiryController::class, 'export']);
    // Route::get('/inquiries/{id}', [InquiryController::class, 'show']); // To be Checked
    Route::delete('/inquiries/{id}', [InquiryController::class, 'destroy']);
    Route::patch('/inquiries/{id}/toggle-served', [InquiryController::class, 'toggleRequestServed']);

    
    // Admin user info
    // Route::get('/user', function (Request $request) {
    //     return $request->user();
    // });
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/profile', [AuthController::class, 'getAdminProfile']);
    Route::put('/profile', [AuthController::class, 'updateAdminProfile']);
});