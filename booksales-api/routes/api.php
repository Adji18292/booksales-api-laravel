<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\GenreController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route untuk Books, Genres, dan Authors
Route::get('/books', [BookController::class, 'index']);

Route::apiResource('/genres', GenreController::class);
Route::apiResource('/authors', AuthorController::class);