app.controller('FilterController', function($scope) {

    // default mediumFilter value
    $scope.mediumFilter = 'Movie';

    // default searchDirector value
    $scope.searchDirector = '';

    // default searchTitle value
    $scope.searchTitle = '';

    // director input search
    $scope.directorFilter = function(item) {
        if (!$scope.searchDirector) return true;
        return item.director.toLowerCase().includes($scope.searchDirector.toLowerCase());
    };

    $scope.mediumTypeFilter = function(item) {
        return item.medium === $scope.mediumFilter;
    };

    // define a custom filter function that checks if the item's title starts with the search input
    $scope.startsWithFilter = function(item) 
    {
        // if there is no search input or it's empty/whitespace, return all items
        if (!$scope.searchTitle || $scope.searchTitle.trim() === '') {
            return true;
        }

        // convert both item title and search input to lowercase for case-insensitive comparison
        const title = (item.title || '').toLowerCase();
        const search = $scope.searchTitle.toLowerCase();

        // check if the title starts with the search string
        return title.indexOf(search) === 0;
    };

    // reset filters function
    $scope.resetFilters = function() {
        $scope.searchTitle = '';
        $scope.searchDirector = '';
        $scope.mediumFilter = 'Movie';
    };

});