/**
*
* NAME: convertObj
*
*
* DESCRIPTION:
* - Private: Turn JavaScript Object into LaTeX Table
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
	isNumber = require( 'validate.io-number-primitive');

function convertObj(obj, options){
  var keys, pos, colnames, spec, colnamesDim, begin, table, key, end, ret, val,
  errorMsg, digits;
  var caption = "", label = "";
  var captionPlacement = "bottom";

  keys = Object.keys(obj);
  pos = "";
	colnames = ["Key", "Value"];
  spec = new Array(colnames.length).join("c");

  if ( options.hasOwnProperty("pos") === true ){
    pos = "[" + options.pos + "]";
  }
  if ( options.hasOwnProperty("colnames") === true ){
    colnames = options.colnames;
  }

	if ( options.hasOwnProperty("digits") === true ){
		if ( !isNumber(options.digits) ) {
			throw new TypeError("latex()::invalid digits property. Has to be an integer.");
		}
		digits = options.digits;
	}

  if ( options.hasOwnProperty("caption") === true ){
    if ( !isString(options.caption) ) {
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
    if ( colnamesDim !== 2 ){
      errorMsg = "latex()::invalid spec property. Dimensionality has to be two for object table.";
      throw new TypeError(errorMsg);
    }
    spec = options.spec;
  }

  // assemble LaTeX code:
  begin = "\\begin{table}" + pos + "\n\\centering \n";

  if( captionPlacement === "top" ){
    begin += caption;
  }

  begin += "\\begin{tabular}{" + spec + "} \n";
  table = "";
  begin += colnames.join(" & ") + " \\\\ \\hline \n";

  for(var i = 0; i < keys.length; i++){
      key = keys[i];
      table += key + " & ";
			val = obj[key];

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
module.exports = exports = convertObj;
