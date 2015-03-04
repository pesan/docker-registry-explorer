'use strict';

angular.module('registryExplorerApp')
.factory('Repository', function($resource, $http) {
	return $resource('/proxy/:protocol/:hostname/:port/v1/search?q=:query&page=:page', {protocol: 'http', port: '-', page: 1}, {
		'query': {
			method:'GET',
			isArray: false,
			transformResponse: $http.defaults.transformResponse.concat(function(data) {
				return data;
			}),
		},
	});
})
.factory('Tag', function($resource, $http) {
	return $resource('/proxy/:protocol/:hostname/:port/v1/repositories/:name/tags', {protocol: 'http', port: '-'}, {
		'query': {
			method:'GET',
			isArray: true,
			transformResponse: $http.defaults.transformResponse.concat(function(data) {
				if (!_.isArray(data)) {
					return _.map(data, function(v, k) { return { name: k, layer: v }; });
				}
				return data;
			}),
		},
	});
});
