;(function(angular, app){
  'use strict';

  app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'templates/index.html',
        controller: 'MainCtrl'
      })
      .state('form', {
        url: '/basic-form',
        templateUrl: 'templates/basic-form.html',
        controller: 'FormCtrl'
      });
  }]);
})(window.angular, window.app);