'use strict';

angular.module('contactManager').controller('contactCtl', ['$scope','$routeParams','contact','$timeout', function($scope, $routeParams, contact, $timeout){
        $scope.contact = contact.find($routeParams.id);
        $scope.$on('saved',function(){
            $timeout(function(){
                $scope.contact.$update();
            }, 0);
            
        });   
    }])