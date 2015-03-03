'use strict';

angular.module('registryExplorerApp')
.config(function ($stateProvider) {
	$stateProvider
		.state('main', {
			url: '/',
			templateUrl: 'app/main/main.html',
			controller: 'MainCtrl',
			resolve: {
				'host': function($location) {
					return $location.host();
				},
				'history': function(localStorageService) {
					var list = localStorageService.get('history') || [];
					list.add = function(entity) {
						if (this.indexOf(entity) < 0) {
							this.push(entity);
						}
						localStorageService.set('history', this);
					};
					return list;
				}
			},
		});
});
