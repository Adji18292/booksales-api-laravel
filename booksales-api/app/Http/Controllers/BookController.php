<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {
        $data = new Book(); //Membuat objek
        $books = $data->getBooks(); //Mengakses method getBooks
        return view('books', ['books' => $books]); //Mengirim data books ke view
    }
}
