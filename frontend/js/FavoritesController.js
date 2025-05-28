// FavoritesController - responsible for handling favorite movies and series
app.controller('FavoritesController', ['$scope', function($scope) {
    
    // array to store favorite items in memory
    $scope.favorites = [];
    
    // toggle favorite status for a given movie object
    $scope.toggleFavorite = function(movie) {
        // create a unique id for the movie using title and release date
        const movieId = movie.title + '_' + movie.release_date;
        
        // check if this movie already exists in favorites
        const existingIndex = $scope.favorites.findIndex(fav => fav.id === movieId);
        
        if (existingIndex === -1) {
            // if not found, add the movie to favorites array
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
            // if found, remove the movie from favorites
            $scope.favorites.splice(existingIndex, 1);
        }

        // try to save the updated favorites array to localStorage if available
        if (typeof(Storage) !== "undefined") {
            try {
                localStorage.setItem('smdb_favorites', JSON.stringify($scope.favorites));
            } catch(e) {
                // localStorage may not be available or writable, log the error
                console.log('localStorage not available');
            }
        }
    };
    
    // check if a movie is currently in the favorites array
    $scope.isFavorite = function(movie) {
        if (!movie) return false; // if no movie provided, return false immediately
        const movieId = movie.title + '_' + movie.release_date;
        // return true if any favorite has the same id as this movie
        return $scope.favorites.some(fav => fav.id === movieId);
    };
    
    // get the number of favorite movies saved
    $scope.getFavoritesCount = function() {
        return $scope.favorites.length;
    };
    
    // load favorites from localStorage when the controller initializes
    $scope.loadFavorites = function() {
        if (typeof(Storage) !== "undefined") {
            try {
                const savedFavorites = localStorage.getItem('smdb_favorites');
                if (savedFavorites) {
                    // parse and assign saved favorites to the scope variable
                    $scope.favorites = JSON.parse(savedFavorites);
                }
            } catch(e) {
                // if loading fails, log the error and reset favorites to empty array
                console.log('could not load favorites from localStorage');
                $scope.favorites = [];
            }
        }
    };
    
    // flag indicating whether to filter and show only favorites (default is false)
    $scope.showOnlyFavorites = false;
    
    // call loadFavorites once when controller is created
    $scope.loadFavorites();
    
}]);