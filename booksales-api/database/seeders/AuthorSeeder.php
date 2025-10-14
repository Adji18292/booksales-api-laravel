<?php

namespace Database\Seeders;

use App\Models\Author;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AuthorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Author::create(['name' => 'J.K. Rowling', 'bio' => 'Penulis seri Harry Potter.']);
        Author::create(['name' => 'Tere Liye', 'bio' => 'Penulis novel populer Indonesia.']);
        Author::create(['name' => 'Andrea Hirata', 'bio' => 'Penulis Laskar Pelangi.']);
        Author::create(['name' => 'George R.R. Martin', 'bio' => 'Penulis A Song of Ice and Fire.']);
        Author::create(['name' => 'Pramoedya Ananta Toer', 'bio' => 'Sastrawan besar Indonesia.']);
    }
}