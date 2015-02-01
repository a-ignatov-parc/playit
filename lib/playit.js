#!/usr/bin/env node

var fs = require('fs');
var url = require('url');

var program = require('commander');
var config = require('../package');
var client = require('apple-tv');

program
	.version(config.version)
	.option('-h, --host [value]', 'Set apple tv host address');

program
	.command('*')
	.description('Parse url and send video link to apple tv')
	.action(processCommand);

program.parse(process.argv);

function processCommand(resource) {
	var hostname = url.parse(resource).hostname;
	var name = hostname.replace('.', '-');
	var path = __dirname + '/plugins/' + name + '.js';
	var plugin;

	if (fs.existsSync(path)) {
		plugin = require(__dirname + '/plugins/' + name);
	}

	if (plugin) {
		plugin(resource).then(function(resource) {
			console.log('launch processed', resource);
		});
	} else {
		console.log('launch directly', resource);
	}

	console.log('url: "%s"', resource);
	console.log('host: "%s"', program.host);
}
