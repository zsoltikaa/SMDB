app.controller('MainController', function($scope, $http, $window) {

    // fetch data from the backend api using http get request
    $http.get("http://localhost/SMDB/backend/api/smdb.php").then(function(response) 
    {
        // if the request is successful, store the returned data in the 'entries' array
        $scope.entries = response.data;

        $scope.calculateGenreStats = function () {
            // create an object to store genre counts
            const genreCounts = {};
            // initialize total entry counter
            let total = 0;
        
            // loop through all entries in the scope
            $scope.entries.forEach(entry => {
                // get the genre or set it to 'unknown' if not present
                const genre = entry.genre || 'Unknown';
                // increment the count for this genre
                genreCounts[genre] = (genreCounts[genre] || 0) + 1;
                // increment the total counter
                total++;
            });
        
            // convert the genreCounts object into an array of stats
            $scope.genreStats = Object.keys(genreCounts).map(genre => ({
                name: genre,
                count: genreCounts[genre],
                // calculate percentage and round it
                percent: Math.round((genreCounts[genre] / total) * 100)
            }));
        
            // sort the stats by count in descending order
            $scope.genreStats.sort((a, b) => b.count - a.count);
        };
        
        // call the function to calculate genre stats
        $scope.calculateGenreStats();        

    })
    .catch(function(error) {
        // log an error message if the http request fails
        console.error('Error when loading data:', error);
    });

    // fetch top actors data
    $http.get("http://localhost/SMDB/backend/api/topactors.php")
    .then(function(response) {
        $scope.topActors = response.data;
    })
    .catch(function(error) {
        console.error('Error when loading top actors:', error);
    });

    // initialize the sortBy model which is used for sorting entries in the view
    $scope.sortBy = "";

    // default mediumFilter value
    $scope.mediumFilter = 'Movie';

    // default searchDirector value
    $scope.searchDirector = '';

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

    // a boolean flag that determines whether the dropdown options are visible
    $scope.showOptions = false;

    // holds the currently selected option from the dropdown
    $scope.selectedOption = null;

    // sort order flag: true = ascending, false = descending
    $scope.ascending = true;

    $scope.resetFilters = function() {
    $scope.mediumFilter = 'Movie';
    $scope.searchDirector = '';
    $scope.searchTitle = '';
    $scope.selectedOption = null;
    $scope.sortBy = '';
    $scope.ascending = true;
    $scope.showOptions = false;
};

    // update the actual sort string (field name, possibly with minus for descending)
    function updateSortBy() {
        if ($scope.selectedOption) {
            $scope.sortBy = $scope.ascending ? $scope.selectedOption.value : '-' + $scope.selectedOption.value;
        } else {
            $scope.sortBy = '';
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

    // add an event listener to the window object that waits for the entire page (including images, styles, etc.) to fully load
    window.addEventListener('load', function() {

        // once the page is fully loaded, start a timer to delay the next actions by 3000 milliseconds (3 seconds)
        setTimeout(function() {

            // try to get the element from the page with the id 'preloader-frame'
            const preloaderFrame = document.getElementById('preloader-frame');

            // check if the element was found (it might not exist)
            if (preloaderFrame) 
            {
                // set the opacity of the element to 0 to make it gradually disappear (fade out effect)
                preloaderFrame.style.opacity = '0';

                // apply a css transition effect to the opacity, lasting 0.5 seconds
                preloaderFrame.style.transition = 'opacity 0.5s';

                // after waiting another 0.5 seconds (when the fade out is complete), remove the element from the page
                setTimeout(() => preloaderFrame.remove(), 500);
            }

        }, 3000); // this is the initial delay of 3 seconds before the preloader starts to disappear

    });

});