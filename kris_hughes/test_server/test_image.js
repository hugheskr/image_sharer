var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/image_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
//var Image = require(__dirname + '/../models/image');

describe('image routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });
  //GET image
  it('should get all of our images', function(done) {
   chai.request('localhost:3000')
    .get('/api/images')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });
  describe('post image', function() {
    after(function(done) {
      mongoose.connection.db.dropDatabase(function() {
        done();
      });
    });
    //POST image
    it('should be able to create an image', function(done) {
      var imageData = { url: 'test url', description: 'test' };
        chai.request('localhost:3000')
        .post('/api/images')
        .send(imageData)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.url).to.eql('test url');
          expect(res.body.description).to.eql('test');
          expect(res.body).to.have.property('_id');
          done();
        });
    });
  });
});
