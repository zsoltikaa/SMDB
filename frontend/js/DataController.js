app.controller('DataController', function($scope, $http, $rootScope) {

    // fetch data from the backend api using http get request
    $http.get("http://localhost/SMDB/backend/api/smdb.php").then(function(response) 
    {
        // if the request is successful, store the returned data in the 'entries' array
        $scope.entries = response.data;
        
        // broadcast event when data is loaded
        $rootScope.$broadcast('dataLoaded', $scope.entries);
        
    })
    .catch(function(error) {
        // log an error message if the http request fails
        console.error('Error when loading data:', error);
    });

    // fetch top actors data
    $http.get("http://localhost/SMDB/backend/api/topactors.php")
    .then(function(response) {
        $scope.topActors = response.data;
        
        // broadcast event when top actors data is loaded
        $rootScope.$broadcast('topActorsLoaded', $scope.topActors);
    })
    .catch(function(error) {
        console.error('Error when loading top actors:', error);
    });

});