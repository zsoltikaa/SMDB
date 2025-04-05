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

        $scope.startsWithFilter = function(item) {
            if (!$scope.searchTitle || $scope.searchTitle.trim() === '') {
                return true;
            }
        
            const title = (item.title || '').toLowerCase();
            const search = $scope.searchTitle.toLowerCase();
        
            return title.indexOf(search) === 0;
        };

});
