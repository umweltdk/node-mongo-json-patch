'use strict';
var test = require('tape');
var jsonPointer = require('../lib/json-pointer');

test('example', function(t) {
  var json = {
    foo: ['bar', 'baz'],
    '': 0,
    'a/b': 1,
    'c%d': 2,
    'e^f': 3,
    'g|h': 4,
    'i\\j': 5,
    "k\"l": 6, // eslint-disable-line quotes
    ' ': 7,
    'm~n': 8
  };

  var find = jsonPointer.get.bind(null, json);

  t.same(find(''), json, 'allow empty pointer (return complete document)');
  t.same(find('/foo'), ['bar', 'baz'], 'return the exact array');
  t.is(find('/foo/0'), 'bar', 'return array at index');
  t.is(find('/foo/01'), 'baz', 'strip leading zeros from indicies');
  t.throws(find.bind(null, '/foo/-'), Error, 'throw on the special "array end" operator');
  t.throws(find.bind(null, '/qux'), Error, 'throw on non-existing keys');
  t.is(find('/'), 0, 'allow pointer to  empty name');
  t.is(find('/a~1b'), 1, 'escaped /');
  t.is(find('/c%d'), 2, 'special char %');
  t.is(find('/e^f'), 3, 'special char ^');
  t.is(find('/g|h'), 4, 'special char |');
  t.is(find('/i\\j'), 5, 'special char \\');
  t.is(find("/k\"l"), 6, 'special char "'); // eslint-disable-line quotes
  t.is(find('/ '), 7, 'special char ⎵ (space)');
  t.is(find('/m~0n'), 8, 'escaped ~');
  t.end();
});
