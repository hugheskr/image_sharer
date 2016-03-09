var angular = require('angular');
require('angular-route');
var imageApp = angular.module('imageApp', ['ngRoute']);

require('./resource_service')(imageApp);
require('./image_controller')(imageApp);

imageApp.config(['$routeProvider', function(routes) {
  routes
    .when('/', {
    	controller: 'ImageController',
      templateUrl: '/main_view.html'
    })
    .otherwise({
      templateUrl: '/four_oh_four_view.html'
    });
}]);
