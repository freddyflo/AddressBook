'use strict';

angular.module('contactManager', ['ngRoute','ngSanitize','mgcrea.ngStrap', 'ngResource'])

//    .controller('AppCtl', function($scope, $location) {
//           
//                 
//        $scope.startSearch = function(){
//            $location.path('/');
//        };
//        
//        $scope.pageClass = function(path) {
//            return ( path == $location.path() ) ? 'active' : '';  
//        };
//        
//           
// })
    // configuring routes
    .config(function($routeProvider){
        $routeProvider.when('/', {
            controller: 'indexCtl',
            templateUrl: 'contactmanager/partials/index.html'
        })
        .when('/add-contact', {
           controller: 'addCtl',
           templateUrl: 'contactmanager/partials/add.html'    
        })
         .when('/contact/:id', {
           controller: 'contactCtl',
           templateUrl: 'contactmanager/partials/contact.html'    
        })
        .otherwise({
            redirectTo: '/'
        })
    
      //  $locationProvider.html5Mode(true);
    
    });