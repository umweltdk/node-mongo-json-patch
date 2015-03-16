'use strict';
exports.get = function(doc, pointer) {
  //Empty pointer references the whole document
  if(pointer === '') return doc;

  //Split the pointer into reference tokens and unescape
  var referenceTokens = pointer.slice(1).split('/').map(unescape);

  //Decent down the object iteratively
  return referenceTokens.reduce(function(object, token) {
    //Strip leading zeros from array indicies
    if(Array.isArray(object)) token = parseInt(token);
    //Throw an error on undefined values.
    //In the case of '-' for an array index, this will be `NaN` due to the last
    //line and should index an undefined value
    if(object[token] === undefined) throw new Error('Pointer is referencing non-existing value');

    return object[token];
  }, doc);
};

function unescape(token) {
  //Unescape as per Section 4, paragraph 2
  return token.replace('~1', '/').replace('~0', '~');
}

module.exports = exports.get;
