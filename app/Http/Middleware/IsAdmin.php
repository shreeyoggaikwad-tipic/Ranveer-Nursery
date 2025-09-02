<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IsAdmin
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        if (! $request->user() || ! $request->user()->is_admin) {
            return response()->json([
                'message' => 'Unauthorized. Admins only.'
            ], 403);
        }

        return $next($request);
    }
}
