// FilterController - responsible for handling favorite movies and series
app.controller('FavoritesController', ['$scope', function($scope) {
    
    // array to store favorite movies or series
    $scope.favorites = [];
    
    // function to add or remove a movie from favorites
    $scope.toggleFavorite = function(movie) {
        // create a unique id by combining title and release date
        const movieId = movie.title + '_' + movie.release_date;
        // check if the movie is already in favorites by finding its index
        const existingIndex = $scope.favorites.findIndex(fav => fav.id === movieId);
        
        if (existingIndex === -1) {
            // if movie not found in favorites, add it with all necessary details
            $scope.favorites.push({
                id: movieId,
                title: movie.title,
                medium: movie.medium,
                director: movie.director,
                release_date: movie.release_date,
                imdb_rating: movie.imdb_rating,
                img: movie.img,
                category: movie.category,
                descr: movie.descr,
                actor: movie.actor,
                stream_link: movie.stream_link,
                trailer_link: movie.trailer_link
            });
        } else {
            // if movie is already in favorites, remove it by index
            $scope.favorites.splice(existingIndex, 1);
        }

        // check if localStorage is supported by the browser
        if (typeof(Storage) !== "undefined") {
            try {
                // save the updated favorites list to localStorage as a string
                localStorage.setItem('smdb_favorites', JSON.stringify($scope.favorites));
            } catch(e) {
                // log error if localStorage is not available or saving fails
                console.log('localStorage not available');
            }
        }
    };
    
    // function to check if a movie is marked as favorite
    $scope.isFavorite = function(movie) {
        if (!movie) return false; // return false if no movie is given
        const movieId = movie.title + '_' + movie.release_date; // recreate unique id
        // return true if any favorite movie matches the id, else false
        return $scope.favorites.some(fav => fav.id === movieId);
    };
    
    // function to get the total number of favorite items
    $scope.getFavoritesCount = function() {
        return $scope.favorites.length;
    };
    
    // function to load favorites from localStorage when the app starts
    $scope.loadFavorites = function() {
        if (typeof(Storage) !== "undefined") {
            try {
                // try to read the saved favorites string from localStorage
                const savedFavorites = localStorage.getItem('smdb_favorites');
                if (savedFavorites) {
                    // parse the JSON string back into an array
                    $scope.favorites = JSON.parse(savedFavorites);
                }
            } catch(e) {
                // log error and reset favorites if loading fails
                console.log('could not load favorites from localStorage');
                $scope.favorites = [];
            }
        }
    };
    
    // filter function to show only favorite movies if the filter is active
    $scope.favoritesFilter = function(movie) {
        if (!$scope.showOnlyFavorites) {
            // if filter is off, return true for all movies (show all)
            return true;
        }
        // if filter is on, only show movies marked as favorite
        return $scope.isFavorite(movie);
    };
    
    // boolean flag to toggle the filter for showing only favorites
    $scope.showOnlyFavorites = false;
    
    // load favorites from localStorage on controller initialization
    $scope.loadFavorites();
    
}]);