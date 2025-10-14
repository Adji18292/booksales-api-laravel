<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Book::create(['author_id' => 1, 'genre_id' => 3, 'title' => 'Harry Potter and the Sorcerer\'s Stone', 'description' => 'Buku pertama dari seri Harry Potter.', 'price' => 150000.00]);
        Book::create(['author_id' => 2, 'genre_id' => 2, 'title' => 'Hujan', 'description' => 'Kisah cinta dan perpisahan di masa depan.', 'price' => 99000.00]);
        Book::create(['author_id' => 3, 'genre_id' => 2, 'title' => 'Laskar Pelangi', 'description' => 'Kisah inspiratif anak-anak Belitung.', 'price' => 85000.00]);
        Book::create(['author_id' => 4, 'genre_id' => 3, 'title' => 'A Game of Thrones', 'description' => 'Buku pertama dari seri A Song of Ice and Fire.', 'price' => 250000.00]);
        Book::create(['author_id' => 2, 'genre_id' => 1, 'title' => 'Negeri Para Bedebah', 'description' => 'Novel action tentang dunia keuangan.', 'price' => 110000.00]);
    }
}
