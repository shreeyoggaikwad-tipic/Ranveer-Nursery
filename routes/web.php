<?php

use Illuminate\Support\Facades\Route;

// Route::get('/reset-password/{token}', function ($token) {
//     return view('auth.reset-password', ['token' => $token]);
// })->name('password.reset');

Route::get('/{any}', function () {
    return view('app');  // React root
})->where('any', '.*');


