var makeLatex = require("../lib/index.js");

var objArr = [
	{"name":"Peter", "age": 27},
	{"name":"Paul", "age": 48},
	{"name":"Hideo", "age": 53},
	{"name":"Gregor", "age": 32}
];

console.log( makeLatex(objArr) );
