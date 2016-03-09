var angular = require('angular');

module.exports = function(app) {
  app.controller('ImageController', ['$scope', '$http', 'Resource',
    function($scope, $http, Resource) {

      $scope.images = [];
      $scope.imagesService = Resource('/images');

      $scope.getAllImages = function() {
        $scope.imagesService.getAll(function(err, res) {
          if (err) return console.log(err);
          $scope.images = res;
        });
      };

      $scope.save = function(image) {
        $scope.imagesService.create(image, function(err, res) {
          if (err) {
            return console.log(err);
          }
          $scope.images.push(res);
          image.url = null;
          image.description = null;
        });
      };
  }]);
}
