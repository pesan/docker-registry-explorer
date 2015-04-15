'use strict';

angular.module('registryExplorerApp')
.factory('Repository', function($resource, $q) {
	return $resource('/proxy/:protocol/:hostname/:port/v1/search?q=:query&page=:page', {}, {
		'query': {
			params: { page: 1 },
			method: 'GET',
			isArray: false,
			interceptor: {
				response: function(response) {
					_.forEach(response.data.results, function(repository) {
						var matches = repository.name.match(/(?:(.*)\/)?(.*)/);
						repository.fullName = matches[0];
						repository.namespace = matches[1] || 'library';
						repository.name = matches[2];
					});
					return response.data;
				},
				responseError: function(response) {
					return $q.reject(response.data);
				}
			},
		},
		'delete': {
			url: '/proxy/:protocol/:hostname/:port/v1/repositories/:namespace/:name/',
			method: 'DELETE',
		},
	});
})
.factory('Image', function($resource) {
	return $resource('/proxy/:protocol/:hostname/:port/v1/images/:id/json', {}, {
		'query': {
			method: 'GET',
			isArray: false,
		},
	});
})
.factory('Tag', function($resource) {
	return $resource('/proxy/:protocol/:hostname/:port/v1/repositories/:namespace/:name/tags', {}, {
		'query': {
			method: 'GET',
			isArray: true,
			interceptor: {
				response: function(response) {
					if (!_.isArray(response.data)) {
						return _.map(response.data, function(v, k) { return { name: k, layer: v }; });
					}
					return response.data;
				}
			},
		},
		'delete': {
			url: '/proxy/:protocol/:hostname/:port/v1/repositories/:namespace/:name/tags/:tag',
			method: 'DELETE',
		},
	});
})
.factory('Ancestry', function($resource) {
	return $resource('/proxy/:protocol/:hostname/:port/v1/images/:id/ancestry', {}, {
		'query': {
			method: 'GET',
			isArray: true,
		},
	});
});
