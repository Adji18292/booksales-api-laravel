<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public function index()
    {
        $authors = Author::all(); // Mengambil semua data penulis dari database
        return response()->json($authors); // Mengirim data sebagai respons JSON
    }
}