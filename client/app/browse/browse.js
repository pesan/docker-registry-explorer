'use strict';

angular.module('registryExplorerApp')
.config(function ($stateProvider) {
	$stateProvider.state('browse', {
		url: '/browse/{protocol:(?:http|https)}/:hostname/{port:int}/?query&page',
		templateUrl: 'app/browse/browse.html',
		controller: 'BrowseCtrl',
		resolve: {
			'registry': function($stateParams) {
				return {
					protocol: $stateParams.protocol,
					hostname: $stateParams.hostname,
					port: $stateParams.port,
				};
			},
			'state': function($stateParams) {
				return {
					page: $stateParams.page || 1,
					query: $stateParams.query || '',
				};
			},
			'repository': function(Repository, registry, state) {
				return Repository.query(_.assign({}, registry, state)).$promise;
			},
			'tags': function($q, RegistryUrl, Tag, repository, registry, state) {
				return $q.all(_.zipObject(_.map(repository.results, 'name'), _.map(repository.results, function(image) {
					return Tag.query(_.assign({}, registry, state, { name: image.name })).$promise.then(function(tags) {
						image.tag = _.first(tags);
						_.forEach(tags, function(tag) {
							tag.url = RegistryUrl.stringifyTag(registry, image, tag);
						});
						return tags;
					}, function(error) {
						return error;
					});
				})));
			},
		}
	});
})
.factory('RegistryUrl', function(OfficialRepository) {
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
			var isOfficial = (registry.hostname === OfficialRepository);
			return (isOfficial ? '' : (registry.hostname + ':' + registry.port) + '/') + image.name + ':' + tag.name;
		},
	};
});
