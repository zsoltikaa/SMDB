app.controller('MainController', function($scope, $rootScope) {

    // default sortBy value
    $scope.sortBy = "";

    // initialize shared data
    $scope.entries = [];
    $scope.topActors = [];
    $scope.genreStats = [];

    // listen for data events from other controllers
    $rootScope.$on('dataLoaded', function(event, entries) {
        $scope.entries = entries;
    });

    $rootScope.$on('topActorsLoaded', function(event, topActors) {
        $scope.topActors = topActors;
    });

    $rootScope.$on('genreStatsCalculated', function(event, genreStats) {
        $scope.genreStats = genreStats;
    });

    // sort order function for the template
    $scope.sortOrder = function() {
        // this will be handled by SortController
        return false; // default ascending
    };

});