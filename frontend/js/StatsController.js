app.controller('StatsController', function($scope, $rootScope) {

    // listen for dataLoaded event
    $rootScope.$on('dataLoaded', function(event, entries) {
        $scope.entries = entries;
        $scope.calculateGenreStats();
    });

    $scope.calculateGenreStats = function () {
        if (!$scope.entries) return;
        
        // create an object to store genre counts
        const genreCounts = {};
        // initialize total entry counter
        let total = 0;
    
        // loop through all entries in the scope
        $scope.entries.forEach(entry => {
            // get the genre or set it to 'unknown' if not present
            const genre = entry.genre || 'Unknown';
            // increment the count for this genre
            genreCounts[genre] = (genreCounts[genre] || 0) + 1;
            // increment the total counter
            total++;
        });
    
        // convert the genreCounts object into an array of stats
        $scope.genreStats = Object.keys(genreCounts).map(genre => ({
            name: genre,
            count: genreCounts[genre],
            // calculate percentage and round it
            percent: Math.round((genreCounts[genre] / total) * 100)
        }));
    
        // sort the stats by count in descending order
        $scope.genreStats.sort((a, b) => b.count - a.count);
        
        // broadcast genre stats to other controllers if needed
        $rootScope.$broadcast('genreStatsCalculated', $scope.genreStats);
    };

});