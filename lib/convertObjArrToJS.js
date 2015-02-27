/**
*
* NAME: convertObjArrToJS
*
*
* DESCRIPTION:
* - Private: Turn JavaScript Array of Objects into Array
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

// LOAD MODULES
var isString = require( 'validate.io-string' );

function convertObjArrToJS(arr, options){
  var keys, pos, colnames, spec, colnamesDim, begin, table, key, end, ret,
  errorMsg;
  var caption = "", label = "";
  var captionPlacement = "bottom";

  keys = Object.keys(arr[0]);
  pos = "";
  colnames = keys;
  spec = new Array(keys.length + 1).join("c");

  if ( options.hasOwnProperty("pos") === true ){
    pos = "[" + options.pos + "]";
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
    if ( colnamesDim !== keys.length){
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

  begin += "\\begin{tabular}{" + spec + "} \n";
  table = "";
  begin += colnames.join(" & ") + " \\\\ \\hline \n";

  for(var i = 0; i < arr.length; i++){
    for(var j = 0; j < keys.length - 1; j++){
      key = keys[j];
      table += arr[i][key] + " & ";
    }
    key = keys[keys.length - 1];
    table += arr[i][key] + " \\\\ \n";
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
module.exports = exports = convertObjArrToJS;
