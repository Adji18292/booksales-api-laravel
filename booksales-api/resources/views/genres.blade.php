<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Genres</title>
</head>
<body>
    <h1>Daftar Genre</h1>

    @foreach ($genres as $item)
    <p>{{ $item['name'] }}</p>
    @endforeach
</body>
</html>