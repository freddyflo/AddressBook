  angular.module('contactManager').filter('paragraph', function() {
        return function(input) {
            return (input) ? input.replace(/\n/g, '<br />') : input;
        };
})