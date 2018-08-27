// Initializes application, requires ngRoute
// Configure application with $routeProvider
// route provider will direct to views

const ComicBookApp = angular.module('ComicBookApp', ['ngRoute']);

ComicBookApp.config(['$routeProvider', function ($routeProvider) {
    console.log('Route config loaded');


    $routeProvider.when('/',{
        templateUrl:'views/home.html',
        controller:'homeController as hc'
    }).when('/entries',{
        templateUrl:'views/entries.html',
        controller:'entriesController as ec'
    }).when('/genres',{
        templateUrl:'views/genres.html',
        controller:'genresController as gc'
    }).otherwise( {
        template: '<h1>404 Not Working</h1>'
    });
}]);