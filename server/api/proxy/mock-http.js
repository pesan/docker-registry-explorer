var _ = require('lodash');
var querystring = require('querystring');

var repositories = [
{ "name": "kjunine/ubuntu", "description": "Docker for Ubuntu Trusty" },
{ "name": "partlab/ubuntu-elasticsearch", "description": "Docker image to run an out of the box Elasticsearch." },
{ "name": "pmdevel/ubuntu", "description": "Ubuntu 14.04 with character set ISO-8859-15" },
{ "name": "partlab/ubuntu-mariadb", "description": "Docker image to run an out of the box MariaDB." },
{ "name": "partlab/ubuntu-redis", "description": "Docker image to run an out of the box Redis server." },
{ "name": "rangalo/ubuntu", "description": "Ubuntu 14.10 with some basic tools like wget, unzip and expect" },
{ "name": "partlab/ubuntu-php5", "description": "Simple base docker image to run PHP5 applications." },
{ "name": "partlab/ubuntu-java", "description": "Simple base docker image to run java applications" },
{ "name": "doomkin/ubuntu-ssh", "description": "Ubuntu with OpenSSH server Dockerfile for trusted automated Docker builds." },
{ "name": "yesops/ubuntu", "description": "" },
{ "name": "khaio/ubuntu", "description": "Trusted build of Ubuntu Saucy. Created with Debootstrap with:\n\n$ sudo debootstrap saucy saucy > /dev/null\n$ tar -zcvf saucy.tar.gz saucy/" },
{ "name": "partlab/ubuntu-mongodb", "description": "Docker image to run an out of the box MongoDB." },
{ "name": "esycat/ubuntu", "description": "Ubuntu LTS" },
{ "name": "trobz/ubuntu", "description": "" },
{ "name": "saltstack/ubuntu-13.10", "description": "" },
{ "name": "rtux/ubuntu-opencv", "description": "Builds OpenCV 2.4.8 on Ubuntu:latest" },
{ "name": "wow73611/ubuntu", "description": "" },
{ "name": "eddelbuettel/docker-ubuntu-r", "description": "" },
{ "name": "itdevdixons/ubuntu", "description": "" },
{ "name": "arimakouyou/ubuntu-japanese", "description": "Ubuntu 14.04 に日本語環境とよく使うものを入れたもの" },
{ "name": "playlist/ubuntu", "description": "" },
{ "name": "larmar/ubuntu", "description": "" },
{ "name": "partlab/ubuntu-couchdb", "description": "Docker image to run an out of the box CouchDB." },
{ "name": "nitrousio/ubuntu-bare", "description": "" },
{ "name": "partlab/ubuntu-postgresql", "description": "Docker image to run an out of the box PostgreSQL." },
{ "name": "kaysoft/ubuntu-upgrade", "description": "Ubuntu 14.04 LTS " },
{ "name": "walchl/cuda-ubuntu", "description": "" },
{ "name": "infusionsoft/ubuntu-base", "description": "Ubuntu base image" },
{ "name": "saltstack/ubuntu-12.10-minimal", "description": "" },
{ "name": "dianpou/ubuntu", "description": "" },
{ "name": "saltstack/ubuntu-13.04", "description": "" },
{ "name": "saltstack/ubuntu-13.04-minimal", "description": "" },
{ "name": "abhid/ubuntu", "description": "ubuntu container with some common utilities" },
{ "name": "pinterb/ubuntu-python", "description": "" },
{ "name": "partlab/ubuntu-typesafe", "description": "Docker image to run an out of the box Typesafe Activator." },
{ "name": "sirile/ubuntu", "description": "" },
{ "name": "saltstack/ubuntu-12.04", "description": "" },
{ "name": "cato1971/ubuntu", "description": "Base 32-bit Ubuntu image from cato1971/ubuntu-32bit" },
{ "name": "neroinc/ubuntu-crosscompile", "description": "" },
{ "name": "partlab/ubuntu-ruby", "description": "Simple base docker image to run Ruby applications." },
{ "name": "jeyk/ubuntu", "description": "" },
{ "name": "jrwesolo/ubuntu-with-chef", "description": "" },
{ "name": "concretesolutions/ubuntu-dev", "description": "" },
{ "name": "usertaken/ubuntu-owncloud-stable", "description": "ownCloud Version 8.0" },
{ "name": "jianhuiz/ubuntu-docker", "description": "ubuntu images that runs in nova-docker" },
{ "name": "akyshr/ubuntu-lxde-tigervnc", "description": "Ubuntu Desktop(LXDE) with tigervnc and xdm" },
{ "name": "saltstack/ubuntu-12.10", "description": "" },
{ "name": "grams/ubuntu-base", "description": "" },
{ "name": "partlab/ubuntu-hhvm", "description": "Simple base docker image to run PHP applications with HHVM." },
{ "name": "nacyot/ubuntu", "description": "" },
{ "name": "tutum/ubuntu-lucid", "description": "DEPRECATED: Please use `tutum/ubuntu:lucid` or `tutum/ubuntu:10.04` instead." },
{ "name": "partlab/ubuntu-nginx", "description": "Docker image to run an out of the box Nginx." },
{ "name": "wmarinho/ubuntu", "description": "" },
{ "name": "jprjr/ubuntu-kibana", "description": "" },
{ "name": "pertino/ubuntu", "description": "" },
{ "name": "partlab/ubuntu-jenkins", "description": "Docker image to run an out of the box Jenkins." },
{ "name": "siomiz/ubuntu-ttyjs", "description": "non-root tty.js running in _/node (ubuntu)" },
{ "name": "cedvan/ubuntu", "description": "" },
{ "name": "dlin/ubuntu-ssh", "description": "" },
{ "name": "neroinc/ubuntu-golang-crosscompile", "description": "" },
{ "name": "ganiutomo/ubuntu-jmeter", "description": "" },
{ "name": "dlin/ubuntu-duckbox", "description": "" },
{ "name": "exoplatform/ubuntu-jdk7-exo", "description": "" },
{ "name": "exoplatform/ubuntu-jdk7-exo-chat", "description": "" },
{ "name": "norsystechteam/ubuntu", "description": "" },
{ "name": "inftec/ubuntu-java", "description": "" },
{ "name": "silvershell/ubuntu", "description": "" },
{ "name": "ggtools/busybox-ubuntu", "description": "Busybox ubuntu version with extra goodies" },
{ "name": "jmoati/ubuntu-dev", "description": "" },
{ "name": "onesysadmin/ubuntu-postfix", "description": "" },
{ "name": "reliableembeddedsystems/ubuntu-base", "description": "I use this as a base for my yocto stuff" },
{ "name": "saltstack/ubuntu-12.04-minimal", "description": "" },
{ "name": "exoplatform/ubuntu-jdk7", "description": "" },
{ "name": "jayofdoom/docker-ubuntu-14.04", "description": "This is a simple docker image that updates the stackforge/ubuntu:13.10 image to Ubuntu Trusty." },
{ "name": "partlab/ubuntu-droneci", "description": "Docker image to run an out of the box Drone CI" },
{ "name": "saltstack/ubuntu-14.04-minimal", "description": "" },
{ "name": "tutum/ubuntu-raring", "description": "DEPRECATED: Please use `tutum/ubuntu:raring` or `tutum/ubuntu:13.04` instead." },
{ "name": "teamrock/ubuntu", "description": "" },
{ "name": "jgeiger/ubuntu", "description": "" },
{ "name": "rolymobile/ubuntu", "description": "" },
{ "name": "pinterb/ubuntu-perl", "description": "" },
{ "name": "vvoronin/ubuntu-tools", "description": "" },
{ "name": "saltstack/ubuntu-14.04", "description": "" },
{ "name": "panoptix/ubuntu", "description": "" },
{ "name": "tutum/ubuntu-trusty", "description": "DEPRECATED: Please use `tutum/ubuntu:trusty` or `tutum/ubuntu:14.04` instead." },
{ "name": "eternnoir/ubuntu-java", "description": "" },
{ "name": "vubui/ubuntu", "description": "" },
{ "name": "mullnerz/ubuntu", "description": "" },
{ "name": "dockitapp/single-redis-ubuntu", "description": "" },
{ "name": "sbminimal/docker-ubuntu-apache-php-compo", "description": "Minimal Docker Image for Apache+PHP+composer (based on minimal ubuntu)" },
{ "name": "crsmithdev/ubuntu", "description": "" },
{ "name": "alexisno/ubuntu-dev", "description": "" },
{ "name": "frodenas/ubuntu", "description": "A Docker Image for Ubuntu" },
{ "name": "zlim/ubuntu-dev", "description": "" },
{ "name": "jinglemansweep/ubuntu-base", "description": "Standard Ubuntu Trusty (14.04 LTS) container with a few useful packages pre-installed." },
{ "name": "labstack/ubuntu", "description": "" },
{ "name": "larrycai/ubuntu-sshd", "description": "" },
{ "name": "leanix/ubuntu-ansible", "description": "" },
{ "name": "undancer/ubuntu", "description": "" },
{ "name": "st2py/ubuntu", "description": "" },
];

var ancestries = _.map(_.range(5), function() {
	return _.sample('0123456789abcdef0123456789abcdef0123456789abcdef', 40).join('');
});

_.forEach(repositories, function(repository) {
	repository._tags = [
		{ name: 'latest', layer: ancestries[0] },
		{ name: '1.0.1', layer: ancestries[1] },
		{ name: '2.0.0', layer: ancestries[2] }
	];
});

repositories = _.indexBy(repositories, 'name');

var MemoryRegistry = function(repositories, ancestries) {
	this.repositories = repositories;
	this.ancestries = ancestries;
};

MemoryRegistry.prototype.search = function(query, page, pageSize) {
	page = page || 1;
	pageSize = pageSize || 25;
	var results = _.filter(this.repositories, function(repository) {
		return repository.name.indexOf(query) >= 0;
	});
	var resultPage = _.map(results.slice((page - 1) * pageSize, page * pageSize), function(result) {
		return _.omit(result, function(value, key) { return key.indexOf('_') === 0; });
	});
	return {
		'num_pages': Math.ceil(results.length / pageSize),
		'num_results': results.length,
		'page_size': pageSize,
		'query': query,
		'page': page,
		'results': resultPage,
	};
};

MemoryRegistry.prototype.tags = function(repositoryName) {
	return this.repositories[repositoryName]._tags;
};

MemoryRegistry.prototype.deleteRepository = function(repositoryName) {
	delete this.repositories[repositoryName];
};

MemoryRegistry.prototype.deleteTag = function(repositoryName, tagName) {
	_.remove(this.repositories[repositoryName]._tags, function(tag) { return tag.name === tagName; });
};

MemoryRegistry.prototype.image = function(id) {
	return {
		'id': id,
		'parent': this.ancestries[this.ancestries.indexOf(id) + 1],
		'created': '2011-01-01',
		'architecture': 'amd64',
		'os': 'linux',
		'Size': 501,
	};
};

MemoryRegistry.prototype.ancestry = function(imageId) {
	return this.ancestries.slice(this.ancestries.indexOf(imageId));
};

var FakeClient = function(registry) {
	this.registry = registry;
	this.patterns = [];
	this.defaultPattern = {
		code: 404,
		action: _.constant('Not found'),
	};
};

FakeClient.prototype.request = function(options, callback) {
	var args;
	var path = options.path.replace(/\/*\?.*$/, '');
	var pattern = _.find(this.patterns, function(pattern) {
		return !!(args = path.match(pattern.match)) && options.method.indexOf(pattern.method) >= 0;
	}) || this.defaultPattern;

	var self = this;
	callback({
		statusCode: pattern.code,
		headers: { 'content-type': 'application/json' },
		on: function(trigger, callback) {
			if (trigger === 'data') {
				var data = JSON.stringify(pattern.action(self.registry, args, options));
				callback(data);
			} else if (trigger === 'end') {
				callback();
			}
			return this;
		},
	});
	return {
		end: function() { return this; },
		on: function() { return this; },
		setTimeout: function() { return this; },
	};
};

var escapeRegex = function(text) {
	return text.replace(/[.*+? ${}()|[\]\\]/g, '\\$&');
};

FakeClient.prototype.when = function(match, method) {
	method = method || 'GET';
	match = _.reduce(match.split('**'), function(a, b, c, d) {
		return _.map(d, function(dd) {
			return _.reduce(dd.split('*'), function(e1, e2, e3, e4) {
				return _.map(e4, escapeRegex).join('([^/]+)');
			});
		}).join('(.*)');
	}, '');
	var self = this;
	return {
		then: function(response, code) {
			self.patterns.push({
				match: match,
				method: _.isArray(method) ? method : [method],
				code: code || 200,
				action: _.isFunction(response) ? response : _.constant(response),
			});
			return self;
		}
	};
};

module.exports = new FakeClient(new MemoryRegistry(repositories, ancestries))
.when('/v1/search').then(function (registry, args, options) {
	var query = querystring.parse(options.path.match(/.*\?(.*)/)[1] || '');
	return registry.search(query.q, query.page, query.n);
})
.when('/v1/repositories/**/tags').then(function(registry, args) {
	return registry.tags(args[1]);
})
.when('/v1/repositories/**/tags/*', 'DELETE').then(function(registry, args) {
	registry.deleteTag(args[1], args[2]);
	return "";
})
.when('/v1/repositories/**', 'DELETE').then(function(registry, args) {
	registry.deleteRepository(args[1]);
	return "";
})
.when('/v1/images/*/json').then(function(registry, args) {
	return registry.image(args[1]);
})
.when('/v1/images/*/ancestry').then(function(registry, args) {
	return registry.ancestry(args[1]);
});
