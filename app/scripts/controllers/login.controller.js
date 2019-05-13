angular.module('MyApp')
	.controller('LoginController', ['$scope', '$http', '$route', '$location', '$window', '$timeout', 'Upload', 'socket', function ($scope, $http, $route, $location, $window, $timeout, Upload, socket) {


    
            $scope.NetworkStatus = function() {
                socket.emit('Init', $scope.Connecteddevices);
            };


            socket.on('networkSatatus', function(data) {
                $scope.$apply(function () {
                  $scope.Connecteddevices = data.Devices_Status;
                  console.log($scope.Connecteddevices)
                });
              });

    }]);