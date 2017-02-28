'use strict';

angular.module('contactManager').controller('indexCtl', ['$scope', 'contact', '$alert', function($scope, contact, $alert) {
        
   $scope.contacts = contact.get();
       
        
   var deletionAlert = $alert({
       title: 'Success!',
       content: 'The contact was deleted successfully.',
       type: 'success',
       container: '#alertContainer',
       show: false
   });
    
    $scope.delete = function(index){
    contact.destroy($scope.contacts[index].id);
    $scope.contacts.splice(index,1);
    deletionAlert.show();
    };
     
 }]); 