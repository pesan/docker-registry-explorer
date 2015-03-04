'use strict';

angular.module('registryExplorerApp')
.constant('pagerSize', 10)
.controller('BrowseCtrl', function ($scope, $state, pagerSize, repository, registry, tags, state) {
	$scope.registry = registry;
	$scope.repository = repository;
	$scope.tags = tags;
	$scope.pagerSize = pagerSize;
	$scope.query = state.query;

	$scope.selectTag = function(image, newTag) {
		image.tag = newTag;
	};

	$scope.restate = function(config) {
		$state.go('browse', _.assign({}, registry, {
			page: $scope.repository.page,
			query: $scope.query,
		}), config);
	};
});
