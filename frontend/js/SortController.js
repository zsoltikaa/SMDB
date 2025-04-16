// define an angularjs module named 'SMDB' and attach a controller called 'SortController'
angular.module('SMDB').controller('SortController', function($scope) {

    // a boolean flag that determines whether the dropdown options are visible
    $scope.showOptions = false;

    // holds the currently selected option from the dropdown
    $scope.selectedOption = null;

    // sort order flag: true = ascending, false = descending
    $scope.ascending = true;

    // update the actual sort string (field name, possibly with minus for descending)
    function updateSortBy() {
        if ($scope.selectedOption) {
            $scope.$parent.sortBy = $scope.ascending ? $scope.selectedOption.value : '-' + $scope.selectedOption.value;
        } else {
            $scope.$parent.sortBy = '';
        }
    }

    // toggles the dropdown open/close
    $scope.toggleDropdown = function() {
        $scope.showOptions = !$scope.showOptions;

        if ($scope.showOptions) {
            setTimeout(function() {
                document.addEventListener('click', closeDropdown);
            }, 0);
        }
    };

    // handle outside click
    function closeDropdown(event) {
        if (!event.target.closest('.custom-sort-dropdown')) {
            $scope.$apply(function() {
                $scope.showOptions = false;
            });
            document.removeEventListener('click', closeDropdown);
        }
    }

    // handle option selection
    $scope.selectOption = function(option) {
        $scope.selectedOption = option;
        $scope.showOptions = false;
        updateSortBy();
    };

    // toggle sort order
    $scope.toggleOrder = function() {
        $scope.ascending = !$scope.ascending;
        updateSortBy();
    };

    // optional: icon for sort order button
    $scope.getOrderIcon = function() {
        return $scope.ascending ? 'fa-arrow-up-wide-short' : 'fa-arrow-down-wide-short';
    };

    document.addEventListener('DOMContentLoaded', function() {
        document.addEventListener('click', function(event) {
            const sortDropdowns = document.querySelectorAll('.custom-sort-dropdown');
            sortDropdowns.forEach(dropdown => {
                if (!dropdown.contains(event.target)) {
                    const options = dropdown.querySelector('.sort-options');
                    if (options.classList.contains('show')) {
                        options.classList.remove('show');
                    }
                }
            });
        });
    });

});