'use strict';

angular.module('contactManager').controller('addCtl', ['$scope', 'contact', '$alert', function($scope, contact, $alert){

         $scope.contact = contact.create();
    
         var alert = $alert({
          title: 'Success!',
          content: 'The contact was added successfully.',
          type: 'success',
          container: '#alertContainer',
          show: false
      });    
    
        $scope.submit = function(){
        $scope.contact.$save();
        $scope.contact = contact.create();
        alert.show();
        console.log("In add function");
        
        };
    }])