'use strict';

var _ = require('lodash');
var url = require('url');
var querystring = require('querystring');

var validate = function(target) {
	if (['http', 'https'].indexOf(target.protocol) < 0) {
		return false;
	}
	if (target.port < 0 || target.port > 65535) {
		return false;
	}
	return true;
};

var getClient = function(target) {
	if (target.hostname === 'mock') {
		return require('./mock-http');
	}
	return require(target.protocol);
}

var error = function(target, message) {
	var host = target.hostname + ':' + target.port;
	return { error: { message: host + ': ' + message }, };
};

var forwardRequest = function(req, res, target) {
	var targetRequest = getClient(target).request({
		method: req.method,
		hostname: target.hostname,
		port: target.port,
		path: '/' + target.pathname + '?' + querystring.stringify(target.query),
	}, function(response) {
		var contentType = response.headers['content-type'] || '';
		if (contentType.indexOf('json') === -1) {
			res.status(500).json(error(target, 'unexpected content type in response'));
			return;
		}

		res.status(response.statusCode);

		res.setHeader('Content-Type', 'application/json');

		response.on('error', function(data) {
			res.status(500).json(error(target, data.code + ' (' + data.errno + ')'));
		});
		response.on('data', function(data) {
			res.write(data)
		});
		response.on('end', function() {
			res.end();
		});
	});

	targetRequest.on('error', function(data) {
		res.status(500).json(error(target, data.code + ' (' + data.errno + ')'));
	});
	req.on('data', function(data) {
		targetRequest.write(data)
	});
	req.on('end', function() {
		targetRequest.end();
	});
};

exports.index = function(req, res) {
	var target = {
		protocol: req.params.protocol,
		hostname: req.params.hostname,
		port: parseInt(req.params.port, 10) || (req.params.protocol === 'https' ? 443 : 80),
		pathname: req.params[0],
		query: req.query,
	};

	if (!validate(target)) {
		res.status(500).json(error(target, 'invalid parameters'));
		return;
	}

	forwardRequest(req, res, target);
};
