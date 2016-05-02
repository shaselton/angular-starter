var app = window.app || {};

;(function(){
	'use strict';

	app = angular.module('app', [
    'ui.router',
    'ngMessages',
    'ngAnimate',
    'nameValidationDirective'
  ]);
})(window.angular, window.app);