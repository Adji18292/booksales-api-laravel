<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\TransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Auth (register & login)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rute Publik (Tidak perlu autentikasi)
Route::get('/authors', [AuthorController::class, 'index']);
Route::get('/genres', [GenreController::class, 'index']);
Route::get('/books', [BookController::class, 'index']);
Route::get('/books/{book}', [BookController::class, 'show']); // Menampilkan detail satu buku secara publik

// Rute yang memerlukan autentikasi
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Rute Transaksi untuk Admin
    Route::get('/transactions', [TransactionController::class, 'index'])->middleware('role:admin');
    Route::delete('/transactions/{transaction}', [TransactionController::class, 'destroy'])->middleware('role:admin');

    // Rute Transaksi untuk Customer (User terautentikasi)
    Route::post('/transactions', [TransactionController::class, 'store']);
    Route::get('/transactions/{transaction}', [TransactionController::class, 'show']);
    Route::put('/transactions/{transaction}', [TransactionController::class, 'update']);
    
    Route::apiResource('authors', AuthorController::class)->except(['index', 'show'])->middleware('role:admin');
    Route::apiResource('genres', GenreController::class)->except(['index', 'show'])->middleware('role:admin');
    Route::apiResource('books', BookController::class)->except(['index', 'show'])->middleware('role:admin'); // Operasi CRUD buku untuk admin
});
