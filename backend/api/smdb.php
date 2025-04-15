<?php

    // this header sets the content type of the response to JSON with UTF-8 encoding
    // it's important because the client (like a web browser or API client) will know that the response is in JSON format
    header('Content-Type: application/json; charset=utf-8'); // informs the client that the response will be JSON in UTF-8 encoding

    // these headers allow the API to be accessed from any origin (cross-origin resource sharing, or CORS)
    // this means that this API can be called from different websites or applications, not just from the same domain
    header("Access-Control-Allow-Origin: *"); // allows any domain to access this resource
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // specifies which HTTP methods are allowed (GET, POST, and OPTIONS in this case)
    header("Access-Control-Allow-Headers: Content-Type"); // allows the client to send a header with the request specifying the content type (typically application/json)

    // include the external 'connect.php' file which contains the database connection setup
    // this file is where the database connection will be established, so it's included to avoid redundancy
    require 'connect.php'; // connects to the database by requiring the 'connect.php' file

    // define an SQL query to fetch all entries from the 'entries' table
    $sql = "SELECT * FROM entries"; // the SQL query retrieves all rows and columns from the 'entries' table

    // execute the SQL query using the connection and store the result
    $result = mysqli_query($conn, $sql); // $conn is the connection from 'connect.php', and the query is run on it

    // initialize an empty array to store the data fetched from the database
    $data = []; // this array will hold the results from the database in a format that can be returned as JSON

    // check how many rows were returned by the query
    $row = mysqli_num_rows($result); // mysqli_num_rows gives the number of rows returned by the query

    // if the query was successful and there are rows in the result
    if ($result && $row > 0) 
    {
        // loop through each row of the result set
        // fetch each row as an associative array and append it to the $data array
        while ($row = mysqli_fetch_assoc($result)) 
        {
            $data[] = $row; // each row of the result is added to the $data array
        }
    }

    // encode the data array into a JSON format and return it
    // the JSON_UNESCAPED_UNICODE flag ensures that non-ASCII characters are not escaped (e.g., special characters in other languages)
    // the JSON_PRETTY_PRINT flag formats the output in a readable, human-friendly way with indentation
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT); // output the $data as a JSON response

?>