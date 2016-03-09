var handleSuccess = function(callback) {
  return function(res) {
    callback(null, res.data);
  }
};

var handleFailure = function(callback) {
  return function(res) {
    callback(res);
  }
};

module.exports = exports = function(app) {
  app.factory('Resource', ['$http', function($http) {
    var Resource = function(resourceName) {
      this.resourceName = resourceName;
  };

    Resource.prototype.getAll = function(callback) {
      $http.get('http://localhost:3000/api' + this.resourceName)
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.create = function(data, callback) {
      $http({
        method: 'POST',
        url: 'http://localhost:3000/api' + this.resourceName,
        data: data
      })
        .then(handleSuccess(callback), handleFailure(callback));
    };

    return function(resourceName) {
      return new Resource(resourceName);
    };
  }]);
};
