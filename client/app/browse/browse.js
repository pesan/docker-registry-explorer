'use strict';

angular.module('registryExplorerApp')
.config(function ($stateProvider) {
	$stateProvider
	.state('browse', {
		abstract: true,
		template: '<ui-view></ui-view>',
		url: '/browse/{protocol:(?:http|https)}/:hostname/{port:int}',
		resolve: {
			'registry': function($stateParams) {
				return {
					protocol: $stateParams.protocol,
					hostname: $stateParams.hostname,
					port: $stateParams.port,
				};
			},
			'isOfficial': function(registry, officialRegistry) {
				return registry.hostname === officialRegistry.hostname;
			}
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
			'repositories': function(Repository, registry, state) {
				return Repository.query(_.assign({}, registry, state)).$promise;
			},
			'tags': function($q, RegistryUrl, Tag, repositories, registry) {
				return $q.all(_.zipObject(_.map(repositories.results, 'fullName'), _.map(repositories.results, function(repository) {
					return Tag.query(_.assign({}, registry, { namespace: repository.namespace, name: repository.name })).$promise.then(function(tags) {
						repository.tag = _.first(tags);
						_.forEach(tags, function(tag) {
							tag.url = RegistryUrl.stringifyTag(registry, repository, tag);
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
.factory('RegistryUrl', function(officialRegistry) {
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
		stringifyTag: function(registry, repository, tag) {
			var isOfficial = (registry.hostname === officialRegistry.hostname);
			return (isOfficial ? '' : (registry.hostname + ':' + registry.port) + '/') + repository.fullName + ':' + tag.name;
		},
	};
})
.directive('contextSearch', function() {
	return {
		restrict: 'E',
		scope: {
			keyword: '=',
			registry: '=',
		},
		link: function(scope) {
			scope.data = _.assign({}, scope.registry, { query: scope.keyword, page: 1 });
		},
		template:
			'<a ui-sref="browse.list(data)" class="btn btn-xs context-keyword" title="Search for \'{{ keyword }}\'">' +
			'	{{ keyword }}' +
			'</a>'
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
