'use strict';
exports.patch = function patch(operations) {
  if(!Array.isArray(operations))
    operations = [operations];

  var result = {
    query: {},
    update: {},
    options: {}
  };

  operations.forEach(function(op) {
    if(!op.op) throw new Error('Each operation must contain an `op`');
    if(!op.path) throw new Error('Each operation must contain a `path`');

    switch(op.op) {
      case 'add':
      case 'remove':
      case 'replace':
      case 'move':
      case 'copy':
      case 'test':
      default:
        throw new Error('Unsupported operation');
    }
  });

  return result;
};

module.exports = exports.patch;
