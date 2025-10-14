<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Genres</title>
</head>
<body>
    <h1>Halaman bertugas untuk menampilkan data genre dari table</h1>

    @foreach ($genres as $item)
    <ul>
        <li>Nama: {{ $item['name'] }}</li>
        <li>Deskripsi: {{ $item['description'] }}</li>
    <ul>
    @endforeach
</body>
</html>