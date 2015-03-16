'use strict';
var test = require('tape');
var mongoPointer = require('../lib/mongo-pointer');

test('example', function(t) {
  var find = mongoPointer.translate;

  t.same(find(''), null, 'allow empty pointer (return complete document)');
  t.same(find('/foo'), 'foo', 'return key');
  t.is(find('/foo/bar'), 'foo.bar', 'return nested key');
  t.is(find('/foo/0'), 'foo.0', 'return index');
  t.is(find('/foo/01'), 'foo.01', 'do not strip leading zeros');
  t.is(find('/foo/-'), 'foo.-', 'allow the special "array end" operator');

  t.is(find('/noo$foo'), 'noo$foo', 'throw on illegal char `$`');
  t.is(find('/'), '', 'allow pointer to empty name');
  t.is(find('/a~1b'), 'a/b', 'escaped /');
  t.is(find('/c%d'), 'c%d', 'special char %');
  t.is(find('/e^f'), 'e^f', 'special char ^');
  t.is(find('/g|h'), 'g|h', 'special char |');
  t.is(find('/i\\j'), 'i\\j', 'special char \\');
  t.is(find("/k\"l"), "k\"l", 'special char "'); // eslint-disable-line quotes
  t.is(find('/ '), ' ', 'special char ⎵ (space)');
  t.is(find('/m~0n'), 'm~n', 'escaped ~');

  t.throws(find.bind(null, '/qux.foo'), Error, 'throw on illegal char `.`');
  t.throws(find.bind(null, '/$foo'), Error, 'throw on illegal char `$`');
  t.end();

  /*
    Differences:
      - The root pointer is a special case
      - We can't strip leading zeros
      - The special end operator will need to conversion to $push

   */
});
