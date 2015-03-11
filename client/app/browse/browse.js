'use strict';

angular.module('registryExplorerApp')
.config(function ($stateProvider) {
	$stateProvider
	.state('browse', {
		abstract: true,
		template: '<ui-view/>',
		url: '/browse/{protocol:(?:http|https)}/:hostname/{port:int}',
		resolve: {
			'registry': function($stateParams) {
				return {
					protocol: $stateParams.protocol,
					hostname: $stateParams.hostname,
					port: $stateParams.port,
				};
			},
		},
	})
	.state('browse.list', {
		url: '/?query&page',
		templateUrl: 'app/browse/list.html',
		controller: 'ListCtrl',
		resolve: {
			'state': function($stateParams) {
				return {
					page: $stateParams.page || 1,
					query: $stateParams.query || '',
				};
			},
			'repository': function(Repository, registry, state) {
				return Repository.query(_.assign({}, registry, state)).$promise;
			},
			'tags': function($q, RegistryUrl, Tag, repository, registry) {
				return $q.all(_.zipObject(_.map(repository.results, 'name'), _.map(repository.results, function(image) {
					return Tag.query(_.assign({}, registry, { name: image.name })).$promise.then(function(tags) {
						image.tag = _.first(tags);
						_.forEach(tags, function(tag) {
							tag.url = RegistryUrl.stringifyTag(registry, image, tag);
						});
						return tags;
					});
				})));
			},
		}
	})
	.state('browse.detail', {
		url: '/:id',
		templateUrl: 'app/browse/detail.html',
		controller: 'DetailCtrl',
		resolve: {
			'id': function($stateParams) {
				return $stateParams.id;
			},
			'image': function(Image, id, registry) {
				return Image.query(_.assign({}, registry, { id: id })).$promise;
			},
			'ancestry': function(Ancestry, id, registry) {
				return Ancestry.query(_.assign({}, registry, { id: id })).$promise;
			}
		}
	});
})
.factory('RegistryUrl', function(officialHostname) {
	return {
		parse: function(text) {
			var match = text.match(/^(?:(https?):\/\/)?([\da-z\.-]+)(?::(\d+))?([\/\w \.-]*)*\/?$/);
			if (!match) {
				return null;
			}
			return {
				protocol: match[1] || 'http',
				hostname: match[2],
				port: +match[3] || (match[1] === 'https' ? 443 : 80),
			};
		},
		stringify: function(registry) {
			return registry.protocol + '://' + registry.hostname + ':' + registry.port;
		},
		stringifyTag: function(registry, image, tag) {
			var isOfficial = (registry.hostname === officialHostname);
			return (isOfficial ? '' : (registry.hostname + ':' + registry.port) + '/') + image.name + ':' + tag.name;
		},
	};
})
.directive('imageid', function($state) {
	return {
		restrict: 'E',
		scope: {
			image: '=',
			registry: '=',
			limit: '=?',
		},
		link: function(scope) {
			scope.limit = scope.limit || 64;
			scope.$watch('image', function() {
				scope.href = $state.href('browse.detail', _.assign({}, scope.registry, { id: scope.image }));
			});
		},
		template:
			'<a class="image-id" href="{{ href }}">' +
			'	{{ image | limitTo:limit }}' +
			'</a>',
	};
});
