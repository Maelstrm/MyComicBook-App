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
            // Store all Comics from database in a local variable
            vm.allComicEntries = response.data;

            // Loops through all comics.
            // If date is null or undefined, it will be ignored.
            // If if there is a date, then it will be conversted using moment.js
            for (let i = 0; i < vm.allComicEntries.length; i++) {
                if (vm.allComicEntries[i].release_date == null || undefined) {
                    return;
                } else {
                    vm.allComicEntries[i].release_date = moment(vm.allComicEntries[i].release_date).format('MMMM Do YYYY');
                }
            }
        }).catch((error) => {
            console.log('Error in get forSales', error);
        })
    };

    // Initial GET request when dom is loaded
    vm.getComicEntries();

    // If the image field is left blank, then this placeholder image will be used instead.
    vm.placeHolder = function (inputValue) {
        if (inputValue == undefined || inputValue == null) {
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
            image_url: vm.placeHolder(vm.imageIn)
        }

        // This will force the user to enter in a title and a writer, which are the minimun requirements.
        if (!comicToAdd.title || !comicToAdd.written_by) {
            return;
        } else {
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
        }

    };

    // Remove comic DELETE request
    // The GET requests makes the id = to the genre, because that is where the join occures.
    // Because of this I have to perform the deletion using some other relevant data.
    // Multiple books shouldnt have the same values for these three properties
    vm.deleteComic = function (comicTitle, comicIssue, comicWriter) {
        console.log('in Delete Comic for', comicTitle, comicIssue, comicWriter);

        $http({
            method: 'DELETE',
            url: 'entries/deleteComic/' + comicTitle + '/'+ comicIssue + '/' + comicWriter
        }).then(function (response) {
            console.log('deleteComic Working');
            vm.getComicEntries();
        }).catch(function (error) {
            alert('deleteComic Not Working', error);
            console.log('Error', error);
        })
    }

    // To populate drop-down menu
    vm.getAllGenres = function () {
        console.log('getAllGenres 4 entries working');

        vm.allGenres = [];

        // request to server, will populate the allGenres array
        $http({
            method: 'GET',
            url: '/entries/allGenres'
        }).then(function (response) {
            console.log('GET getAllGenres Working', response.data);
            // Store all genres from database in a local variable
            vm.allGenres = response.data;
        }).catch((error) => {
            console.log('Error in get forSales', error);
        })
    }

    vm.getAllGenres();
}]);