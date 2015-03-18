'use strict';

var fs = require('fs');

module.exports = function(app) {
	return function(req, res) {
		fs.readFile(app.get('appPath') + '/version.json', 'utf8', function(err, data) {
			if (err) {
				res.status(404).end('Not found');
			} else {
				res.type('json').send(data);
			}
		});
	};
};
