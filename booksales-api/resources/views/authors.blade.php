<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Authors</title>
</head>
<body>
    <h1>Daftar Penulis</h1>

    @foreach ($authors as $item)
    <ul>
        <li>Nama: {{ $item['name'] }}</li>
        <li>Negara: {{ $item['country'] }}</li>
    </ul>
    @endforeach
</body>
</html>