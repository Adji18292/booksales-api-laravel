<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    /**
     * Menampilkan semua data author.
     */
    public function index()
    {
        $authors = Author::all();
        return response()->json($authors);
    }

    /**
     * Menyimpan data author baru.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'bio' => 'nullable|string',
        ]);

        $author = Author::create($validatedData);

        return response()->json($author, 201); // 201 Created
    }

    /**
     * Menampilkan data author tertentu.
     */
    public function show($id)
    {
        $author = Author::find($id);

        if (!$author) {
            return response()->json(['message' => 'Author not found'], 404);
        }

        return response()->json($author);
    }

    /**
     * Memperbarui data author.
     */
    public function update(Request $request, $id)
    {
        $author = Author::find($id);

        if (!$author) {
            return response()->json(['message' => 'Author not found'], 404);
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'bio' => 'nullable|string',
        ]);

        $author->update($validatedData);

        return response()->json($author);
    }

    /**
     * Menghapus data author.
     */
    public function destroy($id)
    {
        $author = Author::find($id);

        if (!$author) {
            return response()->json(['message' => 'Author not found'], 404);
        }

        $author->delete();

        return response()->json(['message' => 'Author deleted successfully'], 200);
    }
}
