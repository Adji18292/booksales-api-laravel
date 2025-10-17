<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    /**
     * Menampilkan semua data genre.
     */
    public function index()
    {
        $genres = Genre::all();

        if ($genres->isEmpty()) {
            return response()->json(['message' => 'No genres found'], 404);
        }

        return response()->json($genres);
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

        return response()->json($genre, 201);
    }

    /**
     * Menampilkan satu genre berdasarkan ID.
     */
    public function show($id)
    {
        $genre = Genre::find($id);

        if (!$genre) {
            return response()->json(['message' => 'Genre not found'], 404);
        }

        return response()->json($genre);
    }

    /**
     * Memperbarui data genre.
     */
    public function update(Request $request, $id)
    {
        $genre = Genre::find($id);

        if (!$genre) {
            return response()->json(['message' => 'Genre not found'], 404);
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:genres,name,' . $id,
            'description' => 'nullable|string',
        ]);

        $genre->update($validatedData);

        return response()->json($genre);
    }

    /**
     * Menghapus genre.
     */
    public function destroy($id)
    {
        $genre = Genre::find($id);

        if (!$genre) {
            return response()->json(['message' => 'Genre not found'], 404);
        }

        $genre->delete();

        return response()->json(['message' => 'Genre deleted successfully'], 200);
    }
}
