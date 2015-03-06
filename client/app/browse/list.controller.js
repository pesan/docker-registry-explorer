'use strict';

angular.module('registryExplorerApp')
.constant('pagerSize', 10)
.controller('ListCtrl', function (officialHostname, $scope, $state, pagerSize, repository, registry, tags, state) {
	$scope.isOfficial = (officialHostname === registry.hostname);
	$scope.registry = registry;
	$scope.repository = repository;
	$scope.tags = tags;
	$scope.pagerSize = pagerSize;
	$scope.query = state.query;

	$scope.selectTag = function(image, newTag) {
		image.tag = newTag;
	};

	$scope.restate = function(config) {
		$state.go('browse.list', _.assign({}, registry, {
			page: $scope.repository.page,
			query: $scope.query,
		}), config);
	};
});
