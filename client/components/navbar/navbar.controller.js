'use strict';

angular.module('registryExplorerApp')
.controller('NavbarCtrl', function ($scope) {
	$scope.menu = [
		{ 'title': 'Home', 'state': 'main' },
		{ 'title': 'Browse', 'state': 'browse' }
	];

	$scope.isCollapsed = true;
});
