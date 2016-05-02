;(function(angular, app){
  'use strict';

  app.controller('FormCtrl', ['$scope', function($scope){
    console.log('form controller');

    $scope.testVar = "test value";
  }]);
})(window.angular, window.app);