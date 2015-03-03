'use strict';

describe('Controller: BrowseCtrl', function () {
	beforeEach(module('registryExplorerApp'));

	var BrowseCtrl;
	var scope;
	var state;

	var hostLocal;
	var hostExternal;

	beforeEach(inject(function ($controller, $rootScope) {
		state = {
			go: sinon.spy(),
		};

		hostLocal = createHost({
			images: [{
				name: 'test/img',
				tags: ['latest', '1.0.3']
			}],
			page: 3,
		});

		hostExternal = createHost({
			images: [{
				name: 'official/img',
				tags: ['latest', 'RC1']
			}],
			page: 11,
		});

		scope = $rootScope.$new();
		BrowseCtrl = $controller('BrowseCtrl', {
			$scope: scope,
			$state: state,
			query: 'ubuntu',
			images: {
				'localhost:5000': hostLocal,
				'external:8080': hostExternal,
			},
			pagerSize: 5,
		});
	}));

	it('should initialize', function() {
		expect(scope.pagerSize).to.equal(5);
		expect(scope.query).to.equal('ubuntu');
		expect(_.keys(scope.hosts)).to.eql(['localhost:5000', 'external:8080']);
	});

	it('should switch tag on image when selecting tag', function() {
		var image = _.first(hostLocal.images);
		var tag = _.last(image.tags);
		scope.selectTag(image, tag);
		expect(image.tag).to.eql(tag);
	});

	it('should add and restate when hostname is added', function() {
		scope.restate = sinon.spy();
		scope.addHost('newhost:8080');
		expect(scope.hosts).to.include.keys('newhost:8080');
		expect(scope.restate).to.have.been.calledWith();
	});

	it('should remove and restate when hostname is removed', function() {
		scope.restate = sinon.spy();
		scope.removeHost('localhost:5000');
		expect(scope.hosts).to.not.include.keys('localhost:5000');
		expect(scope.restate).to.have.been.calledWith();
	});

	it('should restate using state.go', function() {
		scope.restate();
		expect(state.go).to.have.been.calledWith('browse', {
			host: ['localhost:5000;3', 'external:8080;11'],
			query: 'ubuntu'
		});
	});

	// Helpers

	var createHost = function(conf) {
		return {
			images: _.map(conf.images, function(imageConfig) {
				var image = {
					name: imageConfig.name,
					tags: _.map(imageConfig.tags, function(tagName) {
						return {
							name: tagName,
							url: imageConfig.name + ':' + tagName,
						};
					}),
				};
				image.tag = _.first(image.tags);
				return image;
			}),
			_page: { current: conf.page },
		};
	};
});
