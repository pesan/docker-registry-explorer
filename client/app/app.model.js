'use strict';

angular.module('registryExplorerApp')
.factory('Version', function($resource) {
	return $resource('/version', {}, {
		'query': {
			method:'GET',
		},
	});
});
