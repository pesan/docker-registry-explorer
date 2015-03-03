'use strict';

angular.module('registryExplorerApp')
.factory('Image', function($resource, $http) {
	return $resource('/api/images?q=:query&host=:host&page=:page', {page: 1}, {
		'query': {
			method:'GET',
			isArray: false,
			transformResponse: $http.defaults.transformResponse.concat(function(data) {
				if (data.error) {
					return data.error;
				}
				_.forEach(data.images, function(image) {
					image.tag = _.first(image.tags);
				});
				return { images: data.images, _page: data.page };
			}),
		},
	});
});
