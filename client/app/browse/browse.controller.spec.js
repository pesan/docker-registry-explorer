'use strict';

describe('Controller: BrowseCtrl', function () {
	beforeEach(module('registryExplorerApp'));

	var BrowseCtrl;
	var scope;
	var state;

	var repository;
	var registry;
	var tags;

	beforeEach(inject(function ($controller, $rootScope) {
		state = {
			go: sinon.spy(),
		};

		tags = {
			'dockerfile/debian': [
				{ name: '6.0', layer: 'c5881f11' },
				{ name: '6.1', layer: '195eb90b' },
				{ name: '6.2', layer: '78949b1e' },
			],
			'dockerfile/fedora': [
				{ name: 'latest', layer: '3db9c44f' },
			],
		};

		repository = {
			images: [
				{ name: 'dockerfile/debian', tag: _.first(tags['dockerfile/debian']) },
				{ name: 'dockerfile/fedora', tag: _.first(tags['dockerfile/fedora']) },
			],
			page: 3,
		};

		registry = {
			protocol: 'http',
			hostname: 'registry.example.com',
			port: 8080
		};

		scope = $rootScope.$new();
		BrowseCtrl = $controller('BrowseCtrl', {
			$scope: scope,
			$state: state,
			state: { query: 'ubuntu', page: 3 },
			repository: repository,
			registry: registry,
			tags: tags,
			pagerSize: 5,
		});
	}));

	it('should initialize', function() {
		expect(scope.pagerSize).to.equal(5);
		expect(scope.query).to.equal('ubuntu');
		expect(scope.registry).to.equal(registry);
		expect(scope.repository).to.equal(repository);
		expect(scope.tags).to.equal(tags);
	});

	it('should switch tag on image when selecting tag', function() {
		var image = _.first(repository.images);
		var tag = _.last(tags[image.name]);
		scope.selectTag(image, tag);
		expect(image.tag).to.eql(tag);
	});

	it('should restate with current state information', function() {
		scope.restate();
		expect(state.go).to.have.been.calledWith('browse', {
			protocol: 'http',
			hostname: 'registry.example.com',
			port: 8080,
			query: 'ubuntu',
			page: 3,
		});
	});
});
