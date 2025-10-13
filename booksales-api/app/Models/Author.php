<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    private $authors = [
        ['id' => 1, 'name' => 'Tere Liye', 'country' => 'Indonesia'],
        ['id' => 2, 'name' => 'Andrea Hirata', 'country' => 'Indonesia'],
        ['id' => 3, 'name' => 'Pramoedya Ananta Toer', 'country' => 'Indonesia'],
        ['id' => 4, 'name' => 'J.K. Rowling', 'country' => 'United Kingdom'],
        ['id' => 5, 'name' => 'Haruki Murakami', 'country' => 'Japan'],
    ];

    public function getAuthors()
    {
        return $this->authors;
    }
}