<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\GenreController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Auth (register & login)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Route Public
Route::middleware(['auth:sanctum', 'role:user,admin'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/authors', [AuthorController::class, 'index']);
    Route::get('/genres', [GenreController::class, 'index']);
});

// Route Admin
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {  
    Route::post('/authors', [AuthorController::class, 'store']); 
    Route::put('/authors/{author}', [AuthorController::class, 'update']);
    Route::delete('/authors/{author}', [AuthorController::class, 'destroy']);
    Route::post('/genres', [GenreController::class, 'store']); 
    Route::put('/genres/{genre}', [GenreController::class, 'update']);
    Route::delete('/genres/{genre}', [GenreController::class, 'destroy']);
});
