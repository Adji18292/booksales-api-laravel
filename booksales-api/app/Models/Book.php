<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    private $books = [
        [
            'title' => 'Pulang',
            'description' => 'Petualangan pulang ke kampung halaman',
            'price' => 40000,
            'stock' => 15,
            'cover_photo' => 'https://example.com/pulang.jpg',
            'genre_id' => 1,
            'author_id' => 1,
        ],
    ];

    public function getBooks()
    {
        return $this->books;
    }
}
