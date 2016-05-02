;(function(angular, app){
  'use strict';

  app.controller('FormCtrl', ['$scope', function($scope){
    console.log('form controller');

    $scope.testVar = "test value";
    $scope.submitForm = function(valid){
      if(valid){
        $scope.disabled = true;
      }
    };
  }]);
})(window.angular, window.app);