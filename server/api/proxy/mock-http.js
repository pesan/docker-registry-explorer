var _ = require('lodash');

var images = [
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

var queryFromPath = function(path) {
	return require('querystring').parse(path.substring(path.indexOf('?') + 1));
};

var fetchImages = function(queries) {
	var pageSize = queries.n || 25;
	var results = _.filter(images, function(image) {
		return image.name.indexOf(queries.q) >= 0;
	});
	return {
		'num_pages': Math.ceil(results.length/pageSize),
		'num_results': results.length,
		'page_size': pageSize,
		'query': queries.q,
		'page': queries.page,
		'results': results.slice((queries.page - 1) * pageSize, queries.page * pageSize)
	};
};
var fetchTags = function() {
	return _.map([ 'latest', '1.0.1', '2.0.0' ], function(name) { return {name: name} });
};

module.exports = {
	request: function(options, callback) {
		callback({
			statusCode: 200,
			headers: { 'content-type': 'application/json' },
			on: function(trigger, callback) {
				if (trigger !== 'error')
				callback(
					trigger === 'data' ?
					JSON.stringify(options.path.indexOf('/tags') >= 0 ? fetchTags() : fetchImages(queryFromPath(options.path))) :
					undefined);

				return this;
			},
		});
		return {
			end: function() {},
			on: function() { return this; },
			setTimeout: function() { return this; },
		};
	},
};
