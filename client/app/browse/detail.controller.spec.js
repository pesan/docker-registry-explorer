'use strict';

describe('Controller: DetailCtrl', function () {
	beforeEach(module('registryExplorerApp'));

	var DetailCtrl;
	var scope;

	var filter;
	var image;
	var ancestry;
	var registry;

	beforeEach(inject(function ($controller, $rootScope) {
		image = {
			id: '282003a9cff7bbadb41fa05748c21775eb61dccd',
			parent: '06a7195811199d4eaee18482fc151c2443cd73e0',
			architecture: 'amd64',
			os: 'unix',
			Size: 425,
		};

		ancestry = [
			'282003a9cff7bbadb41fa05748c21775eb61dccd',
			'06a7195811199d4eaee18482fc151c2443cd73e0',
			'552c0ba71b1046a083583ebf943cc9aa09f39a32',
		];

		registry = {
			protocol: 'http',
			hostname: 'registry.example.com',
			port: 8080
		};

		filter = function() {
			return function() { return 'Feb 6, 2015 11:13:29 AM'; };
		};

		scope = $rootScope.$new();
		DetailCtrl = $controller('DetailCtrl', {
			$scope: scope,
			$filter: filter,
			image: image,
			ancestry: ancestry,
			registry: registry,
		});
	}));

	it('should initialize', function() {
		expect(scope.image).to.equal(image);
		expect(scope.ancestry).to.equal(ancestry);
		expect(scope.registry).to.equal(registry);
		expect(scope.summaryAttributes).to.eql([
			{ text: 'ID', value: '282003a9cff7bbadb41fa05748c21775eb61dccd', link: true },
			{ text: 'Parent ID', value: '06a7195811199d4eaee18482fc151c2443cd73e0', link: true },
			{ text: 'Created', value: 'Feb 6, 2015 11:13:29 AM' },
			{ text: 'Architecture', value: 'amd64' },
			{ text: 'OS', value: 'unix' },
			{ text: 'Size', value: '425' },
		]);
	});
});
