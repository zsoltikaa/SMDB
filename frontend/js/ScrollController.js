app.controller('ScrollController', function($scope, $window) {

    // default visibility
    $scope.scrollBtnVisible = false;

    // scroll event
    angular.element($window).on('scroll', function() {
        $scope.$applyAsync(() => {
        if ($window.scrollY > $window.innerHeight / 0.089) {
            $scope.scrollBtnVisible = true;
        } else {
            $scope.scrollBtnVisible = false;
        }
        });
    });

    // button press handle
    $scope.scrollToTop = function() {
        $window.scrollTo({ top: 0, behavior: 'smooth' });
    };

});