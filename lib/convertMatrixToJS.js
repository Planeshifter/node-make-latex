/**
 *  convertArrArrToJS()
 */
function convertMatrixToJS(arr, options){

  var pos = "c";
  var spec = "|" + new Array(arr[0].length + 1).join("c") + "|";

  // assemble LaTeX code:
  var begin = "\\begin{tabular}[" + pos + "]{" + spec + "} \n";
  var table = "";

  for(var i = 0; i < arr.length; i++){
    for(var j = 0; j < arr[0].length - 1; j++){
      table += arr[i][j] + " & ";
    }
    table += arr[i][j] + " \\\\ \n";
  }

  var end = "\\end{tabular} \n";
  var ret = begin + table + end;
  return ret;
}

module.exports = exports = convertMatrixToJS;
