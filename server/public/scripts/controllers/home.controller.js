// Contains the client-side logic for the entries view

ComicBookApp.controller('homeController', ['$http', function ($http) {
    console.log('homeController has been loaded');
    vm = this;
    vm.allFavorites = [];


    // Add new comics GET request, to display on DOM
    vm.getFavorites = function () {
        console.log('In getFavorites');

        // request to server, will populate the allComicEntries array
        $http({
            method: 'GET',
            url: '/home/favorites'
        }).then(function (response) {
            console.log('GET getFavorites Working', response.data);
            // Store all favorites from database in a local variable
            vm.allFavorites = response.data;

            // Loops through all favorite comics.
            // If date is null or undefined, it will be ignored.
            // If if there is a date, then it will be conversted using moment.js
            for (let i = 0; i < vm.allFavorites.length; i++) {
                if (vm.allFavorites[i].release_date == null || undefined) {
                    return;
                } else {
                    vm.allFavorites[i].release_date = moment(vm.allFavorites[i].release_date).format('MMMM Do YYYY');
                }
            }
        }).catch((error) => {
            console.log('Error in get favorites', error);
        })
    };

    vm.getFavorites();

}]);