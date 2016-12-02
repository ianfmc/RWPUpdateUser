var AWSMock = require('aws-sdk-mock');
var AWS = require('aws-sdk');

var app = require('../index.js');

var sinon = require('sinon');
var expect = require('chai').expect;
var should = require('chai').should;
var assert = require('chai').assert;

describe('Add a New Team', function() { 

	var context;

	var userCorrect;
	var userNoTeams;

	before(function(){
		AWSMock.mock('DynamoDB.DocumentClient', 'update', function(params, callback) {
			callback();
		});
	});

	beforeEach(function() {
		context = { };
		userCorrect = {
		    "email" : "dewey.walsh@corp.com",
		    "teams" : [
		    		'50'
				]
			};

		userNoTeams = {
		    "email" : "dewey.walsh@corp.com",
		};
	});

	afterEach(function() {
	});

	it('-- Updates a Team with correct data', sinon.test(function(done) {

		app.handler(userCorrect, context, function (err, data) {
			expect(err).equal(null);
			expect(data).to.contain('Success');

			done();
		});
	}));

	it('-- Fails when no Teams are found', sinon.test(function(done) {

		app.handler(userNoTeams, context, function (err, data) {
			expect(err.message).equal('No Teams');
			done();
		});
	}));	
});


