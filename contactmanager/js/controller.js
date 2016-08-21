'use strict';
angular.module('contactManager', ['ngRoute'])

    .controller('AppCtl', ['$scope', 'jsonFilter',  function($scope, jsonFilter) {
    
        $scope.clickHandler = function () {
        $scope.isHidden = !$scope.isHidden;
       // window.alert('Clicked!');
 }; 
   
    $scope.contacts = [
        {
            name: 'John Doe',
            phone: '0123456789',
            email: 'fred.aklamanu@gmail.com'
        },
        {
            name: 'Karan Browich',
            phone: '987456123',
            email: 'karan@email.com'
        }
    ];
    $scope.styleDemo = function () {
        if (!$scope.styler) {
            return;
        }
        
        return {
            background: 'red',
            fontWeight: 'bold'
        };
    };
    
     console.log(jsonFilter($scope.contacts));
    
    }])

    // customer filter
    .filter('truncate', function() {
        return function(input, limit) {
            return( input.length > limit ) ? input.substr(0, limit) + "..." : input;
        };
            
        })
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
         .when('contact/: id', {
           controller: 'contactCtl',
           templateUrl: 'contactmanager/partials/contact.html'    
        })
        .otherwise({
            redirectTo: '/'
        })
    
      //  $locationProvider.html5Mode(true);
    
    })

    // another controller for index page
    .controller('indexCtl', function($scope) {
        
    })
    
    // controller for add contact page
    .controller('addCtl', function($scope){
    
    })
    // controller for contact
   .controller('contactCtl', function($scope, $routeParams){
        console.log($routeParams);
    });


