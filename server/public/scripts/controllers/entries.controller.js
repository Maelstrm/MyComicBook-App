// Contains the client-side logic for the entries view

ComicBookApp.controller('entriesController', ['$http', function ($http) {
    console.log('entriesController has been loaded');
    vm = this;
    vm.allComicEntries = [];


    // Add new comics GET request, to display on DOM
    vm.getComicEntries = function () {
        console.log('In getComicEntries');

        // request to server, will populate the allComicEntries array
        $http({
            method: 'GET',
            url: '/entries/allComicEntries'
        }).then(function (response) {
            console.log('GET getComicEntries Working', response.data);
            vm.allComicEntries = response.data
        }).catch((error) => {
            console.log('Error in get forSales', error);
        })
    };

    vm.getComicEntries();

   vm.nullifyThis = function(inputValue) {
        if(inputValue == undefined) {
            inputValue = null;
            return inputValue;
        } else {
            inputValue = inputValue;
            return inputValue;
        };
    }

    vm.placeHolder = function(inputValue) {
        if(inputValue == undefined || inputValue == null) {
            inputValue = 'https://via.placeholder.com/150x250';
            return inputValue;
        } else {
            inputValue = inputValue;
            return inputValue;
        };
    }

    // Add new comics POST request
    vm.addNewComic = function () {
        comicToAdd = {
            title: vm.titleIn,
            issue: vm.issueIn,
            written_by: vm.writerIn,
            art_by: vm.interiorArtIn,
            cover_by: vm.coverArtIn,
            comic_genre: vm.genreIn,
            publisher: vm.publisherIn,
            release_date: vm.releaseIn,
            page_count: vm.pageCountIn,
            image_url: vm.imageIn

        }
        
        $http({
            method: 'POST',
            url: '/entries/postNewComic',
            data: comicToAdd // req.body
          }).then(function (response) {
            console.log('addNewComic Working');
            vm.getComicEntries();
          }).catch(function (error) {
            alert('addNewComic Not Working', error);
            console.log('Error', error);
          })

        console.log(comicToAdd);

    };
}]);