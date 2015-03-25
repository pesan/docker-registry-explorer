'use strict';

angular.module('registryExplorerApp')
.constant('pagerSize', 10)
.controller('ListCtrl', function (Tag, Repository, History, officialHostname, $scope, $state, pagerSize, repository, registry, tags, state, errorModal) {
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

	$scope.deleteImage = function(image) {
		Repository.delete(_.assign({}, registry, {namespace: image.namespace, name: image.name}), function() {
			$scope.restate({reload: true});
		}, function(error) {
			errorModal(error.data.error, {
				onTryAgain: function() {
					$scope.deleteImage(image);
				},
				onCancel: function() {}
			});
		});
	};

	$scope.deleteTag = function(image, tag) {
		Tag.delete(_.assign({}, registry, {namespace: image.namespace, name: image.name, tag: tag.name}), function() {
			tags[image.fullName] = _.without(tags[image.fullName], tag);
			image.tag = _.first(tags[image.fullName]);
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
