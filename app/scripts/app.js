angular.module('MyApp', ['ngSanitize','ngAnimate','ngRoute','ui.bootstrap','ngFileUpload','ngCookies']).config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "partials/Login.html",
		controller:"LoginController"
    })
    .when("/Dashboard", {
        templateUrl : "partials/Dashboard.html",
		controller:"LoginController"
    })
	.otherwise({
		  redirectTo: ''
		});
}).filter('startFrom', function () {
    return function (input, start) {
        start = +start;
       if(input!=undefined)
        {return input.slice(start);}
    }
}).directive('inputFocusFunction', function() {
    'use strict';
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        // Parse the attribute to accomodate assignment to an object
        var parseObj = attr.inputFocusFunction.split('.');
        var attachTo = scope;
        for (var i = 0; i < parseObj.length - 1; i++) {
          attachTo = attachTo[parseObj[i]];
        }
        // assign it to a function that focuses on the decorated element
        attachTo[parseObj[parseObj.length - 1]] = function() {
          element[0].focus();
        };
      }
    };
  }).factory('socket', ['$rootScope', function($rootScope) {
    var socket = io.connect();
  
    return {
      on: function(eventName, callback){
        socket.on(eventName, callback);
      },
      emit: function(eventName, data) {
        socket.emit(eventName, data);
      }
    };
  }]);