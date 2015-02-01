#!/usr/bin/env node

var program = require('commander');
var config = require('../package');

// var Client = require('apple-tv');

program.version(config.version)
program.parse(process.argv);

console.log(program);
