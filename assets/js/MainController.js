app.controller('MainController', function($scope, $http) {

    $http.get("http://localhost/SMDB/assets/php/smdb.php")
        .then(function(response) {
            console.log(response.data);

            $scope.entries = response.data;
        })
        .catch(function(error) {
            console.error('Error when loading data:', error);
        });

        $scope.sortBy = "";

});