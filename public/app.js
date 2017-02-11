var myApp = angular.module('myApp', ["ui.router"]);

myApp.config(function($stateProvider) {
    $stateProvider

        .state('home', {
            url: "/",
            templateUrl: 'parts/home.html',
            controller: 'main'
        })
        .state("home.rule", {
            url: "/rule",
            templateUrl: "parts/games/rule.html",
            controller: 'gamescontrol'
        })
        .state("home.empire", {
            url: "/empire",
            templateUrl: "parts/games/empire.html",
            controller: 'gamescontrol'
        })

});
myApp.controller('main', function($rootScope, $location, $window) {
    $rootScope.$on('$routeChangeSuccess', function() {

        $window.ga('send', {
            'hitType': 'screenview',
            'appName': 'Bojan App',
            'screenName': $location.url(),
            'hitCallback': function() {
                console.log('GA hitCallback sent!');
            }
        });


    });
});