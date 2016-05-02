var app = window.app || {};

;(function(){
	'use strict';

	app = angular.module('app', [
    'ui.router',
    'ngMessages'
  ]);
})(window.angular, window.app);