'use strict';
exports.translate = function translate(pointer) {
  //Empty pointer references the whole document
  if(pointer === '') return null;

  //Split the pointer into reference tokens and unescape
  var referenceTokens = pointer.slice(1).split('/').map(unescape);

  //Decent down the object iteratively
  referenceTokens.forEach(function(token) {
    if(token.charAt(0) === '$') throw new Error('Tokens must not start with `$`');
    if(token.indexOf('.') > -1) throw new Error('Tokens must not contain `.`');
  });

  return referenceTokens.join('.');
};

function unescape(token) {
  //Unescape as per Section 4, paragraph 2
  return token.replace('~1', '/').replace('~0', '~');
}

module.exports = exports.translate;
