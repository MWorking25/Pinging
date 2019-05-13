angular.module('MyApp')
	.controller('LoginController', ['$scope', '$http', '$route', '$location', '$window', '$timeout', 'Upload', 'socket', function ($scope, $http, $route, $location, $window, $timeout, Upload, socket) {


        $scope.Connecteddevices = [{ip:'172.172.172.126',port:23},{ip:'172.172.172.228',port:23},{ip:'103.252.7.5'},{ip:'103.252.7.25'}]

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