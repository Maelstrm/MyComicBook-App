// Contains the client-side logic for the genres view

ComicBookApp.controller('genresController', ['$http', function ($http) {
    console.log('genresController has been loaded');
    vm = this;
    vm.allGenres = [];

    vm.getAllGenres = function () {
        console.log('getAllGenres working');

        // request to server, will populate the allGenres array
        $http({
            method: 'GET',
            url: '/genres/allGenres'
        }).then(function (response) {
            console.log('GET getAllGenres Working', response.data);
            // Store all genres from database in a local variable
            vm.allGenres = response.data;
        }).catch((error) => {
            console.log('Error in get forSales', error);
        })
    }

    vm.getAllGenres();

    // This will allow the user to add a new genre to the list
    vm.addGenre = function () {
        genreToAdd = {
            genre: vm.genreIn,
            cover_url: vm.genreImgIn
        }
        console.log('in addGenre adding:', genreToAdd);

        if (!genreToAdd.genre) {
            return;
        } else {
            $http({
                method: 'POST',
                url: '/genres/postNewGenre',
                data: genreToAdd // req.body
            }).then(function (response) {
                console.log('addNewGenre POST CONTROLLER Working');
                vm.getAllGenres();
            }).catch(function (error) {
                alert('addNewGenre controller Not Working', error);
                console.log('Error', error);
            })
        }
    }

    vm.deleteGenre = function(toDelete) {
        console.log('deleteGenre working');

        $http({
            method: 'DELETE',
            url: 'genres/deleteGenre/' + toDelete
        }).then(function (response) {
            console.log('deleteGenre Working');
            vm.getAllGenres();
        }).catch(function (error) {
            alert('deleteGenre Not Working', error);
            console.log('Error', error);
        })
        
    }

}]);