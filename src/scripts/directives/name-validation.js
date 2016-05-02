;(function(angular, app){
  'use strict';

  angular.module('nameValidationDirective', [])
    .directive('nameValidation', [function(){
      return{
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel){
          ngModel.$validators.nameLength = function(value){
            if(undefined === value){
              return;
            }

            if(value.length > 4){
              return true;
            }else{
              return false;
            }
          }
        }
      }
  }]);
})(window.angular);