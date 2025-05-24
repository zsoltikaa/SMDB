// SortController - responsible for handling sorting functionality
app.controller('SortController', function($scope) {

    // initialization of sorting-related variables
    $scope.sortBy = "";               // the active sort field (can be empty or prefixed with '-' for descending)
    $scope.showOptions = false;       // controls visibility of the dropdown menu
    $scope.selectedOption = null;     // currently selected sorting option
    $scope.ascending = true;          // sort order (true = ascending, false = descending)

    // toggles the visibility of the dropdown menu
    $scope.toggleDropdown = function() {
        $scope.showOptions = !$scope.showOptions;

        // if dropdown is now visible, add a click listener to close it when clicking outside
        if ($scope.showOptions) {
            setTimeout(function() {
                document.addEventListener('click', closeDropdown);
            }, 0);
        }
    };

    // closes the dropdown when a click occurs outside of it
    function closeDropdown(event) {
        // check if the click was outside the custom dropdown
        if (!event.target.closest('.custom-sort-dropdown')) {
            $scope.$apply(function() {
                $scope.showOptions = false;
            });
            document.removeEventListener('click', closeDropdown);
        }
    }

    // sets the selected sort option and updates the sort field
    $scope.selectOption = function(option) {
        $scope.selectedOption = option;   // store selected option object
        $scope.showOptions = false;       // close the dropdown
        updateSortBy();                   // update the actual sort field
    };

    // toggles the sort order between ascending and descending
    $scope.toggleOrder = function() {
        $scope.ascending = !$scope.ascending;
        updateSortBy();                   // update the sort field with the new order
    };

    // updates the value of the sortBy field based on selected option and order
    function updateSortBy() {
        if ($scope.selectedOption) {
            // use '-' prefix for descending order
            $scope.sortBy = $scope.ascending 
                ? $scope.selectedOption.value 
                : '-' + $scope.selectedOption.value;
        } else {
            // no option selected, clear sorting
            $scope.sortBy = '';
        }
    }

    // returns the appropriate font awesome icon class based on sort order
    $scope.getOrderIcon = function() {
        return $scope.ascending 
            ? 'fa-arrow-up-wide-short' 
            : 'fa-arrow-down-wide-short';
    };

    // resets sorting to default state
    $scope.resetSorting = function() {
        $scope.selectedOption = null;
        $scope.sortBy = '';
        $scope.ascending = true;
        $scope.showOptions = false;
    };

    // global document event listener to handle clicks outside dropdowns
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