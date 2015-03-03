'use strict';

angular.module('registryExplorerApp')
.config(function ($stateProvider, PageTag) {
	var ensureArray = function(value) {
		if (!value) { return []; }
		if (_.isArray(value)) { return value; }
		return [value];
	};
	$stateProvider.state('browse', {
		url: '/browse?host&query',
		templateUrl: 'app/browse/browse.html',
		controller: 'BrowseCtrl',
		resolve: {
			'hosts': function($stateParams) {
				return _.map(ensureArray($stateParams.host), PageTag.parse);
			},
			'query': function($stateParams) {
				return $stateParams.query || '';
			}, 
			'images': function($stateParams, $q, Image, query, hosts) {
				return $q.all(_.zipObject(_.map(hosts, 'name'), _.map(hosts, function(host) {
					return Image.query({ query: query, host: host.name, page: host.page }).$promise.then(_.identity, function(error) {
						return { error: error.status + ' ' + error.statusText + (error.data ? ': ' + JSON.stringify(error.data) : '') };
					});
				})));
			},
		}
	});
})
.constant('PageTag', {
	parse: function(pageTag) {
		var parts = pageTag.split(';');
		return {
			name: parts[0],
			page: parseInt(parts[1] || '1'),
		};
	},
	stringify: function(name, page) {
		return name + ';' + (page || 1);
	},
});
