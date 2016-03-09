var angular = require('angular');

describe('ImageController', function() {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('imageApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));



  it('should be able to make a controller', function() {
    var ImageController = $ControllerConstructor('ImageController', {$scope});
    expect(typeof ImageController).toBe('object');
    expect(Array.isArray($scope.images)).toBe(true);
    expect(typeof $scope.getAllImages).toBe('function');
    expect(typeof $scope.save).toBe('function');
  });

  describe('REST requests', function() {

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('ImageController', {$scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    //Image Get
    it('should make a get request to /api/images', function() {
      $httpBackend.expectGET('http://localhost:3000/api/images').respond(200, [{ url: 'test url'} ]);
      $scope.getAllImages($scope.imageService, $scope.images);
      $httpBackend.flush();
      expect($scope.images.length).toBe(1);
      expect($scope.images[0].url).toBe('test url');
    });

    //Image Post
    it('should create a new image', function() {
      $httpBackend.expectPOST('http://localhost:3000/api/images',
        {url: 'the sent image', description: "small"}).respond(200,
      	{url: 'the response image'});
      $scope.image = {url: 'the sent image', description: "small"};
      $scope.save($scope.image);
      $httpBackend.flush();
      expect($scope.images.length).toBe(1);
      expect($scope.image.url).toBe(null);
      expect($scope.image.description).toBe(null);
      expect($scope.images[0].url).toBe('the response image');
    });
  });
});
