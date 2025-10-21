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
            'name' => 'required|string|max:255|unique:authors,name',
            'bio' => 'nullable|string',
        ]);

        $author = Author::create($validatedData);

        return response()->json($author, 201); // 201 Created
    }

    /**
     * Menampilkan data author tertentu.
     */
    public function show(Author $author)
    {
        return response()->json($author);
    }

    /**
     * Memperbarui data author.
     */
    public function update(Request $request, Author $author)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:authors,name,' . $author->id,
            'bio' => 'nullable|string',
        ]);
 
        $author->update($validatedData);
 
        return response()->json($author);
    }

    /**
     * Menghapus data author.
     */
    public function destroy(Author $author)
    {
        $author->delete();

        return response()->json(['message' => 'Author deleted successfully'], 200);
    }
}
