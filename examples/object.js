var makeLatex = require("../lib/index.js");

var obj = {
	"name": "Henry",
	"points": 3.22934839047
};

console.log( makeLatex(obj, {"digits":2} ) );
