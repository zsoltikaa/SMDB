// MainController - main controller that coordinates the other controllers
app.controller('MainController', function($scope, $controller) {

    // include other controllers by injecting them into the same scope
    $controller('DataController', { $scope: $scope });    // handles data loading
    $controller('FilterController', { $scope: $scope });  // handles filtering logic
    $controller('SortController', { $scope: $scope });    // handles sorting functionality
    $controller('UIController', { $scope: $scope });      // handles ui-related logic

    // global reset function to reset filters and sorting options
    $scope.resetFilters = function() {
        // reset filter values
        $scope.mediumFilter = 'Movie';          // default to showing movies
        $scope.searchDirector = '';             // clear director search
        $scope.searchTitle = '';                // clear title search

        // reset sorting options
        $scope.selectedOption = null;           // no sorting option selected
        $scope.sortBy = '';                     // clear sorting field
        $scope.ascending = true;                // default to ascending order
        $scope.showOptions = false;             // hide sorting options dropdown
    };

    // initialization log message to confirm app startup
    console.log('SNBD application initialized successfully!');

});