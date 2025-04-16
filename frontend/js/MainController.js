app.controller('MainController', function($scope, $http) {

    // fetch data from the backend api using http get request
    $http.get("http://localhost/Padar_Zsolt/SMDB/backend/api/smdb.php").then(function(response) 
    {
        // if the request is successful, store the returned data in the 'entries' array
        $scope.entries = response.data;
    })
    .catch(function(error) {
        // log an error message if the http request fails
        console.error('Error when loading data:', error);
    });

    // initialize the sortBy model which is used for sorting entries in the view
    $scope.sortBy = "";

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

});