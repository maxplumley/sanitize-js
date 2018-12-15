'use strict';

const runTests = require('../lib/functionTest').runTests;
const manifest = require('./testConfig.js');

runTests(manifest);