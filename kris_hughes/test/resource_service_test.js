var angular = require('angular');

describe('resource service', function() {
  beforeEach(angular.mock.module('imageApp'));

  var $httpBackend;
  var Resource;
  var testResource;

  beforeEach(angular.mock.inject(function(_$httpBackend_, Resource) {
    $httpBackend = _$httpBackend_;
    testResource = Resource;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be a service', function() {
    expect(typeof testResource).toBe('function');
  });

  it('should assign something to the resource', function() {
    expect(testResource('/test').resourceName).toBe('/test');
  });

  it('should make a GET request', function() {
    $httpBackend.expectGET('http://localhost:3000/api/images')
      .respond(200, { url: 'the test url', description: 'test description' });
    var resource = testResource('/images');
    resource.getAll(function(err, res){
      expect(res.url).toBe('the test url');
      expect(res.description).toBe('test description');
    });
    $httpBackend.flush();
  });

  it('should make a POST request', function() {
    var sentImage = {url: 'the sent url'};
    $httpBackend.expectPOST('http://localhost:3000/api/images', sentImage)
      .respond(200, {url: 'the response image'});
    var resource = testResource('/images');
    resource.create(sentImage, function(err, res) {
      expect(res.url).toBe('the response image');
    });
    $httpBackend.flush();
  });

  it('should error', function() {
    $httpBackend.expectGET('http://localhost:3000/api/images')
      .respond(404);
    var resource = testResource('/images');
    resource.getAll(function(err, res){
      expect(typeof(err)).toBe('object');
      expect(typeof(res)).toBe('undefined');
    });
    $httpBackend.flush();
  });
});
