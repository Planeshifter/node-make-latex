/**
 *  convertObjArrToJS()
 */
function convertObjArrToJS(arr, options){
  var keys = Object.keys(arr[0]);
  var pos = "c";
  var colnames = keys;
  var spec = "|" + new Array(keys.length + 1).join("c") + "|";

  if ( options.hasOwnProperty("pos") === true ){
    pos = options.pos;
  }
  if ( options.hasOwnProperty("colnames") === true ){
    colnames = options.colnames;
  }

  if ( options.hasOwnProperty("spec") === true ){
    var colnamesDim = (options.spec.match(/[lcr]/g) || []).length;
    if ( colnamesDim !== keys.length){
      var errorMsg = "latex()::invalid spec property. Dimensionality mismatch.";
      throw new TypeError(errorMsg);
    }
    spec = options.spec;
  }

  // assemble LaTeX code:
  var begin = "\\begin{tabular}[" + pos + "]{" + spec + "} \n";
  var table = "";
  var key;
  begin += colnames.join(" & ") + " \\\\ \\hline \n";

  for(var i = 0; i < arr.length; i++){
    for(var j = 0; j < keys.length - 1; j++){
      key = keys[j];
      table += arr[i][key] + " & ";
    }
    key = keys[keys.length - 1];
    table += arr[i][key] + " \\\\ \n";
  }

  var end = "\\end{tabular} \n";
  var ret = begin + table + end;
  return ret;
}

module.exports = exports = convertObjArrToJS;
