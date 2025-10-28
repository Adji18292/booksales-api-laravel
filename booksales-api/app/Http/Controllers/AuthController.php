<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Mendaftarkan user baru dan langsung memberikan token (auto-login).
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password, 
        ]);

        // Buat token untuk user yang baru mendaftar
        $token = $user->createToken('api-token')->plainTextToken;

        // Kembalikan data user dan token
        return response()->json([
            'user'  => $user,
            'token' => $token
        ], 201);
    }

    /**
     * Login user dan membuat token.
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Kredensial yang diberikan tidak cocok dengan catatan kami.'],
            ]);
        }

        // Buat token untuk user yang login
        $token = $user->createToken('api-token')->plainTextToken;

        // Kembalikan data user dan token
        return response()->json([
            'user'  => $user,
            'token' => $token
        ]);
    }

    /**
     * Logout user (mencabut token).
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Berhasil logout.']);
    }
}
