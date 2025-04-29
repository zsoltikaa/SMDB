<?php

    header('Content-Type: application/json; charset=utf-8');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    require 'connect.php';

    // fetch all actor fields
    $sql = "SELECT actor FROM entries";
    $result = mysqli_query($conn, $sql);

    $actorCounts = [];

    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            // split actors by comma
            $actors = explode(',', $row['actor']);
            foreach ($actors as $actor) {
                // trim names (remove unnecessary spaces)
                $actor = trim($actor);
                if ($actor !== '') {
                    if (!isset($actorCounts[$actor])) {
                        $actorCounts[$actor] = 0;
                    }
                    $actorCounts[$actor]++;
                }
            }
        }
    }

    // sort by occurrence in descending order
    arsort($actorCounts);

    // total number of movies
    $totalMovies = array_sum($actorCounts);

    // select the top 3 actors
    $topActors = array_slice($actorCounts, 0, 3, true);

    // build the result into a formatted array
    $response = [];

    foreach ($topActors as $name => $moviesCount) {
        $percent = $totalMovies > 0 ? round(($moviesCount / $totalMovies) * 100) : 0;
        $response[] = [
            'name' => $name,
            'moviesCount' => $moviesCount,
            'percent' => $percent
        ];
    }

    echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

?>