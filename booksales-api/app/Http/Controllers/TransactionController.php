<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class TransactionController extends Controller
{
    public function index()
    {
        // Menggunakan with() untuk eager loading relasi user dan book
        $transactions = Transaction::with(['user', 'book'])->get();

        return response()->json([
            'success' => true,
            'message' => $transactions->isEmpty() ? 'No transactions found.' : 'Get all transactions',
            'data' => $transactions,
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
        ]);

        $book = Book::find($request->book_id);

        if ($book->stock <= 0) {
            return response()->json(['message' => 'Book is out of stock'], 409);
        }

        $transaction = Transaction::create([
            'order_number' => 'TRX-' . Str::uuid(),
            'customer_id' => Auth::id(),
            'book_id' => $book->id,
            'total_amount' => $book->price,
        ]);

        // Kurangi stok buku
        $book->decrement('stock');

        return response()->json([
            'success' => true,
            'message' => 'Transaction created successfully',
            'data' => $transaction->load(['user', 'book']),
        ], 201);
    }

    public function show(Transaction $transaction)
    {
        // Otorisasi: Pastikan user yang login adalah pemilik transaksi
        if (Auth::id() !== $transaction->customer_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json([
            'success' => true,
            'message' => 'Transaction details',
            'data' => $transaction->load(['user', 'book']),
        ]);
    }

    public function update(Request $request, Transaction $transaction)
    {
        // Otorisasi: Pastikan user yang login adalah pemilik transaksi
        if (Auth::id() !== $transaction->customer_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Contoh validasi jika ada field yang bisa diupdate
        // Untuk kasus ini, kita asumsikan transaksi tidak bisa diubah setelah dibuat.
        // Jika ada yang bisa diubah, tambahkan validasi dan logika update di sini.
        // $request->validate([...]);
        // $transaction->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Transaction cannot be updated, but endpoint is secured.',
            'data' => $transaction->load(['user', 'book']),
        ]);
    }

    public function destroy(Transaction $transaction)
    {
        // Logika untuk mengembalikan stok buku saat transaksi dibatalkan/dihapus
        $book = Book::find($transaction->book_id);
        if ($book) {
            $book->increment('stock');
        }

        $transaction->delete();

        return response()->json([
            'success' => true,
            'message' => 'Transaction deleted successfully',
        ], 200);
    }
}
