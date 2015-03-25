'use strict';

angular.module('registryExplorerApp')
.constant('pagerSize', 10)
.controller('ListCtrl', function (Tag, History, officialHostname, $scope, $state, pagerSize, repository, registry, tags, state, errorModal) {
	$scope.isOfficial = (officialHostname === registry.hostname);
	$scope.registry = registry;
	$scope.repository = repository;
	$scope.tags = tags;
	$scope.pagerSize = pagerSize;
	$scope.query = state.query;
	$scope.deleting = false;

	$scope.$on('$stateChangeSuccess', function() {
		History.add(registry);
	});

	$scope.deleteTag = function(image, tag) {
		Tag.delete(_.assign({}, registry, {name: image.name, tag: tag.name}), function() {
			tags[image.name] = _.without(tags[image.name], tag);
			image.tag = _.first(tags[image.name]);
		}, function(error) {
			errorModal(error.data.error, {
				onTryAgain: function() {
					$scope.deleteTag(image, tag);
				},
				onCancel: function() {}
			});
		});
	};

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
