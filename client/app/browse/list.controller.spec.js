'use strict';

describe('Controller: ListCtrl', function () {
	beforeEach(module('registryExplorerApp'));

	var ListCtrl;
	var scope;
	var state;

	var History;
	var Repository;
	var Tag;
	var repositories;
	var registry;
	var tags;
	var errorModal;

	beforeEach(inject(function ($controller, $rootScope) {
		state = {
			go: sinon.spy(),
		};

		History = {
			add: sinon.spy(),
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

		repositories = {
			results: [
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

		Repository = {
			'delete': sinon.spy(),
		};

		Tag = {
			'delete': sinon.spy(),
		};

		errorModal = sinon.spy();

		scope = $rootScope.$new();
		scope.$on = sinon.spy();
		ListCtrl = $controller('ListCtrl', {
			$scope: scope,
			$state: state,
			History: History,
			state: { query: 'ubuntu', page: 3 },
			isOfficial: false,
			repositories: repositories,
			registry: registry,
			tags: tags,
			pagerSize: 5,
			Repository: Repository,
			Tag: Tag,
			errorModal: errorModal,
		});
	}));

	it('should initialize', function() {
		expect(scope.pagerSize).to.equal(5);
		expect(scope.query).to.equal('ubuntu');
		expect(scope.registry).to.equal(registry);
		expect(scope.repositories).to.equal(repositories);
		expect(scope.tags).to.equal(tags);
	});

	it('should switch tag on repository when selecting tag', function() {
		var repository = _.first(repositories.results);
		var tag = _.last(tags[repository.name]);
		scope.selectTag(repository, tag);
		expect(repository.tag).to.eql(tag);
	});

	it('should add current registry to history when state has been changed', function() {
		expect(scope.$on).to.have.been.calledWith('$stateChangeSuccess', sinon.match(function (stateChangeSuccess) {
			stateChangeSuccess();
			expect(History.add).to.have.been.calledWith(registry);
			return true;
		}));
	});

	describe('delete repository', function() {
		beforeEach(function() {
			scope.deleteRepository({
				name: 'debian',
				namespace: 'dockerfile',
			});
		});

		it('should delete the repository on the registry', function() {
			expect(Repository.delete).to.have.been.calledWith({
				protocol: 'http',
				hostname: 'registry.example.com',
				port: 8080,
				namespace: 'dockerfile',
				name: 'debian',
			});
		});

		it('should reload when successful', function() {
			expect(Repository.delete).to.have.been.calledWith(sinon.match.any, sinon.match(function(onSuccess) {
				scope.restate = sinon.spy();
				onSuccess();
				expect(scope.restate).to.have.been.calledWith({reload: true});
				return true;
			}));
		});

		it('should display error modal when failing', function() {
			expect(Repository.delete).to.have.been.calledWith(sinon.match.any, sinon.match.any, sinon.match(function(onError) {
				onError({ data: { error: 'error message' } });
				expect(errorModal).to.have.been.calledWith('error message');
				return true;
			}));
		});
	});

	describe('delete tag', function() {
		beforeEach(function() {
			var tag = _.find(scope.tags['dockerfile/debian'], 'name', '6.0');
			scope.deleteTag(
				{ name: 'debian', namespace: 'dockerfile', fullName: 'dockerfile/debian' },
				tag
			);
		});

		it('should delete the tag on the registry', function() {
			expect(Tag.delete).to.have.been.calledWith({
				protocol: 'http',
				hostname: 'registry.example.com',
				port: 8080,
				namespace: 'dockerfile',
				name: 'debian',
				tag: '6.0',
			});
		});

		it('should reload when successful', function() {
			expect(Tag.delete).to.have.been.calledWith(sinon.match.any, sinon.match(function(onSuccess) {
				onSuccess();
				expect(_.find(scope.tags['dockerfile/debian'], 'name', '6.0')).to.be.undefined;
				return true;
			}));
		});

		it('should display error modal when failing', function() {
			expect(Tag.delete).to.have.been.calledWith(sinon.match.any, sinon.match.any, sinon.match(function(onError) {
				onError({ data: { error: 'error message' } });
				expect(errorModal).to.have.been.calledWith('error message');
				return true;
			}));
		});
	});

	it('should restate with current state information', function() {
		scope.restate();
		expect(state.go).to.have.been.calledWith('browse.list', {
			protocol: 'http',
			hostname: 'registry.example.com',
			port: 8080,
			query: 'ubuntu',
			page: 3,
		});
	});
});
