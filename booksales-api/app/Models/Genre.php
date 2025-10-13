<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    private $genres = [
        ['id' => 1, 'name' => 'Fiksi Sejarah'],
        ['id' => 2, 'name' => 'Fantasi'],
        ['id' => 3, 'name' => 'Roman'],
        ['id' => 4, 'name' => 'Misteri'],
        ['id' => 5, 'name' => 'Sains Fiksi'],
    ];

    public function getGenres()
    {
        return $this->genres;
    }
}