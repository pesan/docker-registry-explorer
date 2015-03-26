'use strict';

angular.module('registryExplorerApp')
.constant('pagerSize', 10)
.controller('ListCtrl', function (Tag, Repository, History, officialHostname, $scope, $state, pagerSize, repositories, registry, tags, state, errorModal) {
	$scope.isOfficial = (officialHostname === registry.hostname);
	$scope.registry = registry;
	$scope.repositories = repositories;
	$scope.tags = tags;
	$scope.pagerSize = pagerSize;
	$scope.query = state.query;
	$scope.deleting = false;

	$scope.$on('$stateChangeSuccess', function() {
		History.add(registry);
	});

	$scope.deleteRepository = function(repository) {
		Repository.delete(_.assign({}, registry, {namespace: repository.namespace, name: repository.name}), function() {
			$scope.restate({reload: true});
		}, function(error) {
			errorModal(error.data.error, {
				onTryAgain: function() {
					$scope.deleteRepository(repository);
				},
				onCancel: function() {}
			});
		});
	};

	$scope.deleteTag = function(repository, tag) {
		Tag.delete(_.assign({}, registry, {namespace: repository.namespace, name: repository.name, tag: tag.name}), function() {
			tags[repository.fullName] = _.without(tags[repository.fullName], tag);
			repository.tag = _.first(tags[repository.fullName]);
		}, function(error) {
			errorModal(error.data.error, {
				onTryAgain: function() {
					$scope.deleteTag(repository, tag);
				},
				onCancel: function() {}
			});
		});
	};

	$scope.selectTag = function(repository, newTag) {
		repository.tag = newTag;
	};

	$scope.restate = function(config) {
		$state.go('browse.list', _.assign({}, registry, {
			page: $scope.repositories.page,
			query: $scope.query,
		}), config);
	};
});
