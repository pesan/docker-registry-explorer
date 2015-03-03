'use strict';

angular.module('registryExplorerApp')
.constant('pagerSize', 10)
.controller('BrowseCtrl', function ($scope, $state, query, images, PageTag, pagerSize) {
	$scope.query = query;
	$scope.hosts = images;
	$scope.hasHosts = !angular.equals({}, images);
	$scope.pagerSize = pagerSize;

	$scope.addHost = function(hostname) {
		$scope.hosts[hostname] = {};
		$scope.restate();
	};

	$scope.removeHost = function(hostname) {
		delete $scope.hosts[hostname];
		$scope.restate();
	};

	$scope.selectTag = function(image, newTag) {
		image.tag = newTag;
	};

	$scope.restate = function(config) {
		$state.go('browse', {
			host: _.map($scope.hosts, function(host, hostname) {
				return PageTag.stringify(hostname, (host._page || {}).current);
			}),
			query: $scope.query,
		}, config);
	};
});
