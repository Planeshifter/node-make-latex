'use strict';

var isObjectArray = require( 'validate.io-object-array' );

function convert_object_array_to_latex(arr){
  var keys = Object.keys(arr[0]);
  var begin = "\\begin{tabular}{ |" + Array(keys.length + 1).join("c") + "| }";
  var table = "";
  begin += keys.join(" & ") + "\\\\ \\hline ";
  for(var i = 0; i < arr.length; i++){
    for(var j = 0; j < keys.length - 1; j++){
      var key = keys[j];
      table += arr[i][key] + " & ";
    }
    key = keys[keys.length - 1];
    table += arr[i][key] + "\\\\ ";
  }
  var end = "\\end{tabular}";
  var ret = begin + table + end;
  return ret;
}

function latex(input, options){
  var ret;
  if (isObjectArray(input) === true){
    ret = convert_object_array_to_latex(input);
  }
  return ret;
}


module.exports = latex;
