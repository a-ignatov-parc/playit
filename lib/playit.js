#!/usr/bin/env node

var fs = require('fs');
var url = require('url');

var program = require('commander');
var config = require('../package');
var client = require('apple-tv');

program
	.version(config.version)
	.usage('<url> [options]')
	.option('-H, --host <value>', 'Set apple tv host address')
	.parse(process.argv);

if (!program.args.length) {
	program.help();
}

var resource = program.args[0];
var hostname = url.parse(resource).hostname;
var name = hostname.replace('.', '-');
var plugin;

try {
	plugin = require('playit-' + name);
} catch (e) {}

if (plugin) {
	plugin(resource).then(function(resource) {
		console.log('Launch processed:', resource);
	}, function(error) {
		console.log('Processing failed:', error);
	});
} else {
	console.log('Launch directly:', resource);
}

console.log('url: "%s"', resource);
console.log('host: "%s"', program.host);
