'use strict';

var url = require('url');
var _ = require('lodash');
var async = require('async');
var querystring = require('querystring');

var getHttpClient = function(repositoryUrl) {
	if (repositoryUrl.protocol === 'mock:') {
		return require('./mock-http');
	}
	if (repositoryUrl.protocol === 'https:') {
		return require('https');
	}
	return require('http');
};

exports.index = function(req, res) {
	var query = req.query.q;
	var page = req.query.page || 1;

	var repositoryUrl = url.parse((req.query.host.indexOf('://') < 0 ? 'http://' : '') + req.query.host);

	if (!repositoryUrl) {
		res.status(500).json({ error: 'invalid host' });
		return;
	}

	var isOfficial = (repositoryUrl.hostname === 'registry.hub.docker.com');

	var httpclient = getHttpClient(repositoryUrl);

	httpclient.get({
		hostname: repositoryUrl.hostname,
		port: repositoryUrl.port,
		path: '/v1/search?' + querystring.stringify({q: query, page: page}),
	}, function(response) {
		var contentType = response.headers['content-type'] || '';
		if (response.statusCode !== 200) {
			res.status(500).json({ error: response.statusCode });
			return;
		} else if (contentType.indexOf('json') === -1) {
			res.status(500).json({ error: 'unexpected content type from \'' + repositoryUrl.host + response.req.path + '\': ' + contentType });
			return;
		}
		var d = '';
		response.on('data', function(data) {
			d += data;
		});
		response.on('end', function() {
			var result = JSON.parse(d);

			async.map(result.results,
				function(image, callback) {
					httpclient.get({
						hostname: repositoryUrl.hostname,
						port: repositoryUrl.port,
						path: '/v1/repositories/' + image.name + '/tags'
					}, function(response) {
						if (response.statusCode !== 200) {
							callback(true, response.statusCode);
							return;
						}
						var d = '';
						response.on('data', function(data) {
							d += data;
						});
						response.on('end', function() {
							var tags = JSON.parse(d);
							callback(false, {
								name: image.name,
								description: image.description,
								tags: _.isArray(tags) ? _.map(tags, function(tag) {
										return { name: tag.name, url: (isOfficial ? '' : repositoryUrl.host + '/') + image.name + ':' + tag.name };
									}) : _.map(tags, function(v, k) {
										return { name: k, url: (isOfficial ? '' : repositoryUrl.host + '/') + image.name + ':' + k };
									}),
							});
						});
					}).on('error', function(e) {
						callback(true, e);
					});
				},
				function(error, images) {
					if (!error) {
						res.json({ images: images, page: { current: parseInt(result.page), last: parseInt(result.num_pages), total: parseInt(result.num_results), size: parseInt(result.page_size) }});
					} else {
						res.status(500).json({ error: images});
					}
				}
			);
		});
	}).on('error', function(e) {
		res.status(500).json({ error: e });
	}).setTimeout(5000, function() {
		this.abort();
		res.status(500).json({ error: 'timeout'});
	});
};
