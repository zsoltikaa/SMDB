// FilterController - responsible for handling filters and search functionality
app.controller('FilterController', function($scope) {

    // initialization of filter-related scope variables
    $scope.mediumFilter = 'Movie';       // default filter for medium type (either 'Movie' or 'Series')
    $scope.searchDirector = '';          // stores the user's input for director name search
    $scope.searchTitle = '';             // stores the user's input for title search

    // filter function for medium type (returns true only if the item's medium matches the selected filter)
    $scope.mediumTypeFilter = function(item) {
        return item.medium === $scope.mediumFilter;
    };

    // filter function for director search
   $scope.directorFilter = function(item) {
        if (!$scope.searchDirector || $scope.searchDirector.trim() === '') {
            return true;  // no search input, show all items
        }

        const director = (item.director || '').toLowerCase();  // get director name in lowercase
        const search = $scope.searchDirector.toLowerCase();    // get search input in lowercase

        // check if director's name starts with the search string
        return director.indexOf(search) === 0;
    };

    // filter function for title search (checks if title starts with the entered text)
    $scope.startsWithFilter = function(item) {
        // if no title search is entered or it's just whitespace, do not filter out anything
        if (!$scope.searchTitle || $scope.searchTitle.trim() === '') {
            return true;
        }

        // convert both title and search term to lowercase for comparison
        const title = (item.title || '').toLowerCase();
        const search = $scope.searchTitle.toLowerCase();

        // return true only if the title starts with the search text
        return title.indexOf(search) === 0;
    };

    // function to reset all filters to their default values
    $scope.resetFilters = function() {
        $scope.mediumFilter = 'Movie';    // reset medium type to 'Movie'
        $scope.searchDirector = '';       // clear director search
        $scope.searchTitle = '';          // clear title search
    };

});