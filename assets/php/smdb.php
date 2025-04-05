<?php

    // a valasz tipusa JSON lesz, a karakter kodja utf-8
    header('Content-Type: application/json; charset-utf-8');

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    // adatbazis kapcsolat behuzasa
    require 'connect.php';
    // include 'connect.php' engedi betolteni az oldalt, a require nem

    // SQL lekerdezes az adatbazis tablabol a rekordok betoltese
    $sql = "SELECT * FROM entries";

    // vegrehajtjuk a lekerdezest
    $result = mysqli_query($conn, $sql);
    // var_dump($result);

    // letrehozunk egy tombot az adatok tarolasara
    $data = [];

    $row = mysqli_num_rows($result);

    // ha van eredmeny es legalabb 1 sor erkezett
    if ($result && $row > 0) 
    {
        while ($row = mysqli_fetch_assoc($result)) 
        {
            // asszocialis tombot hoz letre, kulcsertekparokot hoz letre es ezeket beleteszi a data tombbe
            $data[] = $row;
        }
    }

    // JSON-be kodolja az asszociaclis tombot es kiiratja
    echo json_encode($data,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

?>