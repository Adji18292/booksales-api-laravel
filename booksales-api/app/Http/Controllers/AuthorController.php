<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public function index()
    {
        $authors = Author::all(); // Mengambil semua data penulis dari database
        return view('authors', ['authors' => $authors]); // Mengirim data ke view
    }
}