/**
*
* NAME: make-latex
*
*
* DESCRIPTION:
* - Turn JavaScript objects into LaTeX
*
*
* NOTES:
* [1]
*
*
* TODO:
* [1]
*
*
* LICENSE:
* MIT
*
* Copyright (c) 2015. Philipp Burckhardt.
*
*
* AUTHOR:
* Philipp Burckhardt. pburckhardt@outlook.com. 2015.
*
*/

'use strict';

var isObjectArray = require( 'validate.io-object-array' );
var isSquareMatrix = require( 'validate.io-square-matrix' );
var isObject = require( 'validate.io-object' );

var convertObjArr = require( './convertObjArr' );
var convertMatrix = require( './convertMatrix' );
var convertObj    = require( './convertObj' );

/**
 * latex(): main function to turn JS objects into LaTeX tables
 * @param{Object} input - object to be displayed in table
 * @param{Object} options - options object governing outputted TeX code
 */
function latex(input, options){
  var opts = {}, ret;
  if ( arguments.length > 1 ) {
    opts = options;
    if ( !isObject( opts ) ) {
      throw new TypeError( 'latex()::invalid input argument. Options must be an object. Value: `' + opts + '`.' );
    }
  }

  if ( isObjectArray(input) === true ) {
    ret = convertObjArr(input, opts);
  }

  if ( isSquareMatrix(input) === true ) {
    ret = convertMatrix(input, opts);
  }

  if ( isObject(input) === true) {
    ret = convertObj(input, opts);
  }

  return ret;
}

module.exports = latex;
