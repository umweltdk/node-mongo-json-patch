'use strict';
var test = require('tape');
var patch = require('../../index');

test('validate operator', function(t) {
  var noOp = {};
  var noPath = {op: 'add'};
  var invalidOp = {op: 'patch'};

  t.throws(patch.bind(patch, noOp), 'No `op` given');
  t.throws(patch.bind(patch, noPath), 'No `path` given');
  t.throws(patch.bind(patch, invalidOp), 'Unsupported `op` given');
  t.end();
});
