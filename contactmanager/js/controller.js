'use strict';
angular.module('contactManager', []).controller('AppCtl', ['$scope', function($scope) {
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
    }]);
