'use strict';

angular.module('registryExplorerApp')
.factory('Repository', function($resource, $http) {
	return $resource('/proxy/:protocol/:hostname/:port/v1/search?q=:query&page=:page', {protocol: 'http', port: '-'}, {
		'query': {
			params: {page: 1},
			method: 'GET',
			isArray: false,
			transformResponse: $http.defaults.transformResponse.concat(function(data) {
				_.forEach(data.results, function(image) {
					var matches = image.name.match(/(?:(.*)\/)?(.*)/);
					image.fullName = matches[0];
					image.namespace = matches[1] || 'library';
					image.name = matches[2];
				});
				return data;
			}),
		},
		'delete': {
			url: '/proxy/:protocol/:hostname/:port/v1/repositories/:namespace/:name/',
			method: 'DELETE',
		},
	});
})
.factory('Image', function($resource) {
	return $resource('/proxy/:protocol/:hostname/:port/v1/images/:id/json', {protocol: 'http', port: '-'}, {
		'query': {
			method: 'GET',
			isArray: false,
		},
	});
})
.factory('Tag', function($resource, $http) {
	return $resource('/proxy/:protocol/:hostname/:port/v1/repositories/:namespace/:name/tags', {protocol: 'http', port: '-'}, {
		'query': {
			method: 'GET',
			isArray: true,
			transformResponse: $http.defaults.transformResponse.concat(function(data) {
				if (!_.isArray(data)) {
					return _.map(data, function(v, k) { return { name: k, layer: v }; });
				}
				return data;
			}),
		},
		'delete': {
			url: '/proxy/:protocol/:hostname/:port/v1/repositories/:namespace/:name/tags/:tag',
			method: 'DELETE',
		},
	});
})
.factory('Ancestry', function($resource) {
	return $resource('/proxy/:protocol/:hostname/:port/v1/images/:id/ancestry', {protocol: 'http', port: '-'}, {
		'query': {
			method: 'GET',
			isArray: true,
		},
	});
});
