<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    public function index()
    {
        $genres = Genre::all();
        return response()->json($genres); // Mengembalikan data sebagai JSON
    }

    /**
     * Menyimpan data genre baru.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:genres',
            'description' => 'nullable|string',
        ]);

        $genre = Genre::create($validatedData);

        return response()->json($genre, 201); // 201 Created
    }
}

