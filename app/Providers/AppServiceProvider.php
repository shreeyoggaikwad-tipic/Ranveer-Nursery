<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\ResetPassword;
    use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }





    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ResetPassword::createUrlUsing(function ($user, string $token) {
        return env('SPA_URL') . '/admin/reset-password?token=' . $token . '&email=' . urlencode($user->email);
    });

        RateLimiter::for('password-reset', function ($request) {
        return Limit::perMinute(5)->by($request->email);
    });
    }

    
}
