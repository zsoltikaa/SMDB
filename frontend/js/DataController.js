// DataController - responsible for loading and managing data
app.controller('DataController', function($scope, $http) {

    // initialization of variables used to store data
    $scope.entries = [];       // stores all movie/series entries
    $scope.topActors = [];     // stores top actor data
    $scope.genreStats = [];    // stores calculated genre statistics
    $scope.movieCount = 0;     // total number of movies
    $scope.seriesCount = 0;    // total number of series

    // function to load the main list of entries (movies and series)
    $scope.loadEntries = function() {
        // make an http get request to fetch entries from the backend
        $http.get("http://localhost/SMDB/backend/api/smdb.php")
        .then(function(response) {
            // store the response data in entries
            $scope.entries = response.data;
            
            // calculate how many entries are movies
            $scope.movieCount = $scope.entries.filter(x => x.medium === 'Movie').length;

            // calculate how many entries are series
            $scope.seriesCount = $scope.entries.filter(x => x.medium === 'Series').length;
            
            // compute genre statistics based on the loaded entries
            $scope.calculateGenreStats();
        })
        .catch(function(error) {
            // handle errors if the request fails
            console.error('error when loading data:', error);
        });
    };

    // function to load the top actors from a separate backend endpoint
    $scope.loadTopActors = function() {
        // make an http get request to fetch top actors
        $http.get("http://localhost/SMDB/backend/api/topactors.php")
        .then(function(response) {
            // store the response data in topActors
            $scope.topActors = response.data;
        })
        .catch(function(error) {
            // handle errors if the request fails
            console.error('error when loading top actors:', error);
        });
    };

    // function to calculate statistics about genres
    $scope.calculateGenreStats = function() {
        const genreCounts = {}; // object to count how many times each genre appears
        let total = 0;          // total number of entries (for percentage calculation)
    
        // loop through each entry to count genres
        $scope.entries.forEach(entry => {
            // use the genre from the entry, or 'unknown' if not specified
            const genre = entry.genre || 'Unknown';

            // increment the count for the genre
            genreCounts[genre] = (genreCounts[genre] || 0) + 1;
            total++;
        });
    
        // convert the genreCounts object into an array with count and percentage
        $scope.genreStats = Object.keys(genreCounts).map(genre => ({
            name: genre,                         // name of the genre
            count: genreCounts[genre],           // how many entries have this genre
            percent: Math.round((genreCounts[genre] / total) * 100) // percentage of total
        }));
    
        // sort the genreStats array in descending order by count
        $scope.genreStats.sort((a, b) => b.count - a.count);
    };

    // automatically load entries and top actors when the controller is initialized
    $scope.loadEntries();
    $scope.loadTopActors();

});