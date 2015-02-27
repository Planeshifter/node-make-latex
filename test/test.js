'use strict';

var chai = require('chai');
var expect = chai.expect;
var makeLatex = require( '../lib/index.js' );
var convertObjArrToJS = require( '../lib/convertObjArrToJS.js' );
var convertMatrixToJS = require( '../lib/convertMatrixToJS' );

describe('make-latex node module', function tests() {

  it('exports a single function', function test() {
    expect(makeLatex).to.be.a("function");
  });

});

describe('convertObjArrToJS', function tests(){
  it('turns an array of objects into a LaTeX table', function test(){
    var input = [
      {name:"Harry", age: 64},
      {name:"Melanie", age: 38},
      {name:"Anna", age: 27},
      {name:"Charlotte", age: 25}
    ];
    var res = convertObjArrToJS(input, {});
    expect(res).to.be.a("string");
  });

  it('works with custom spec', function test(){
    var input = [
      {name:"Harry", age: 64},
      {name:"Melanie", age: 38},
      {name:"Anna", age: 27},
      {name:"Charlotte", age: 25}
    ];
    var res = convertObjArrToJS(input, {
      spec: "lc"
    });
    expect(res).to.be.a("string");
  });
});


describe('convertMatrixToJS', function tests(){

  it('turn an array of arrays into a LaTeX table', function test(){
    var input = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    var res = convertMatrixToJS(input, {});
    expect(res).to.be.a("string");
  });

});
