/**
*
* NAME: convertMatrix
*
*
* DESCRIPTION:
* - Private: Turn Square Matrix (in form of Array of Arrays) to LaTeX table
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

// LOAD MODULES
var isString = require( 'validate.io-string' ),
	isNumber = require( 'validate.io-number-primitive' );

function convertMatrix(arr, options){
  var pos, spec, begin, end, table, ret, colnamesDim, colnames, digits, val, errorMsg;
  var caption = "", label = "";
  var captionPlacement = "bottom";

  pos = "";
  spec = new Array(arr[0].length + 1).join("c");

  if ( options.hasOwnProperty("pos") === true ){
    pos = "[" + options.pos + "]";
  }

	if ( options.hasOwnProperty("digits") === true ){
		if ( !isNumber(options.digits) ) {
			throw new TypeError("latex()::invalid digits property. Has to be an integer.");
		}
		digits = options.digits;
	}

  if ( options.hasOwnProperty("colnames") === true ){
    colnames = options.colnames;
  }

  if ( options.hasOwnProperty("caption") === true ){
    if ( !isString(options.caption) ){
      throw new TypeError("latex()::invalid caption property. Has to be a string.");
    }
    caption = "\\caption{" + options.caption + "}\n";
  }

  if ( options.hasOwnProperty("captionPlacement") === true ){
    if (! (options.captionPlacement === "bottom" || options.captionPlacement === "top" ) ){
      errorMsg = "latex()::invalid captionPlacement property. Has to be a either 'top' or 'bottom'";
      throw new TypeError(errorMsg);
    }
    captionPlacement = options.captionPlacement;
  }

  if ( options.hasOwnProperty("label") === true ){
    if ( !isString(options.label) ){
      throw new TypeError("latex()::invalid label property. Has to be a string.");
    }
    label = "\\label{" + options.label + "}\n";
  }

  if ( options.hasOwnProperty("spec") === true ){
    colnamesDim = (options.spec.match(/[lcr]/g) || []).length;
    if ( colnamesDim !== arr[0].length){
      errorMsg = "latex()::invalid spec property. Dimensionality mismatch.";
      throw new TypeError(errorMsg);
    }
    spec = options.spec;
  }

  // assemble LaTeX code:
  begin = "\\begin{table}" + pos + "\n\\centering \n";

  if( captionPlacement === "top" ){
    begin += caption;
  }

  begin  += "\\begin{tabular}{" + spec + "} \n";
  table = "";

  for(var i = 0; i < arr.length; i++){
    for(var j = 0; j < arr[0].length - 1; j++){
			val = arr[i][j];
			if ( digits ) {
				if ( isNumber(val) ) {
					val = val.toFixed(digits);
				}
			}
      table += val + " & ";
    }

		val = arr[i][j];
		if ( digits ) {
			if ( isNumber(val) ) {
				val = val.toFixed(digits);
			}
		}
    table += val + " \\\\ \n";
  }

  end = "\\end{tabular} \n";

  if( captionPlacement === "bottom" ){
    end += caption;
  }

  end += label;
  end += "\\end{table}";
  ret = begin + table + end;
  return ret;
}

// EXPORTS
module.exports = exports = convertMatrix;
