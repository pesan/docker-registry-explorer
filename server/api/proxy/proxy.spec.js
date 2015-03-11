'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /proxy', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/proxy/http/mock/5000/v1/search?query=term')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });
});
