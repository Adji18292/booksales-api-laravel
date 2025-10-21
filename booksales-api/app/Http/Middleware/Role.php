<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Role
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$role): Response
    {
        $user = $request->user();
        if ($user && in_array($user->role, $role)) {
            return $next($request);
        }
        $allowed = implode(' atau ', $role); 

        return response()->json([
            'message' => "Akses ditolak. Hanya {$allowed} yang boleh mengakses.",
        ], 403);
    }
}
