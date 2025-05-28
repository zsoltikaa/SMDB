app.controller('FavoritesController', ['$scope', function($scope) {
    
    $scope.favorites = [];
    
    $scope.toggleFavorite = function(movie) {
        const movieId = movie.title + '_' + movie.release_date;
        const existingIndex = $scope.favorites.findIndex(fav => fav.id === movieId);
        
        if (existingIndex === -1) {
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
            $scope.favorites.splice(existingIndex, 1);
        }

        if (typeof(Storage) !== "undefined") {
            try {
                localStorage.setItem('smdb_favorites', JSON.stringify($scope.favorites));
            } catch(e) {
                console.log('localStorage not available');
            }
        }
    };
    
    $scope.isFavorite = function(movie) {
        if (!movie) return false;
        const movieId = movie.title + '_' + movie.release_date;
        return $scope.favorites.some(fav => fav.id === movieId);
    };
    
    $scope.getFavoritesCount = function() {
        return $scope.favorites.length;
    };
    
    $scope.loadFavorites = function() {
        if (typeof(Storage) !== "undefined") {
            try {
                const savedFavorites = localStorage.getItem('smdb_favorites');
                if (savedFavorites) {
                    $scope.favorites = JSON.parse(savedFavorites);
                }
            } catch(e) {
                console.log('Could not load favorites from localStorage');
                $scope.favorites = [];
            }
        }
    };
    
    $scope.favoritesFilter = function(movie) {
        if (!$scope.showOnlyFavorites) {
            return true;
        }
        return $scope.isFavorite(movie);
    };
    
    $scope.showOnlyFavorites = false;
    
    $scope.loadFavorites();
    
}]);