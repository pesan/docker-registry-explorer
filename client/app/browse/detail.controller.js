'use strict';

angular.module('registryExplorerApp')
.controller('DetailCtrl', function($scope, $filter, image, ancestry, registry) {
	$scope.image = image;
	$scope.ancestry = ancestry;
	$scope.registry = registry;
	$scope.summaryAttributes = [
		{ text: 'ID', value: image.id, link: true },
		{ text: 'Parent ID', value: image.parent, link: true },
		{ text: 'Created', value: $filter('date')(image.created, 'medium') },
		{ text: 'Architecture', value: image.architecture },
		{ text: 'OS', value: image.os },
		{ text: 'Size', value: ''+image.Size },
	];
});
