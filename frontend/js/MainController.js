app.controller('MainController', function($scope, $http) {

    // fetch data from the backend api using http get request
    $http.get("http://localhost/SMDB/backend/api/smdb.php").then(function(response) 
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