'use strict';

var fs = require('fs');

module.exports = function(app) {
	return function(req, res) {
		res.sendfile(app.get('appPath') + '/version.json');
	};
};
