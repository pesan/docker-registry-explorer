'use strict';

angular.module('registryExplorerApp')
.controller('NavbarCtrl', function ($scope, RegistryUrl, History) {
	$scope.History = History;
	$scope.$watch('History.last', function(last) {
		$scope.menu = [
			{ 'title': 'Home', 'state': 'main', },
			{ 'title': 'Browse', 'state': 'browse.list', params: RegistryUrl.parse(last) },
		];
	});

	$scope.isCollapsed = true;
});
