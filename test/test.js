'use strict';

var chai = require('chai');
var expect = chai.expect;
var makeLatex = require( '../lib/index.js' );

describe('makeLatex', function tests() {

  it( 'exports a single function', function test() {
    expect(makeLatex).to.be.a("function");
  });

	it( 'should throw an error if provided an options argument which is not an object', function test() {
			var values = [
				'5',
				5,
				true,
				undefined,
				null,
				NaN,
				function(){},
				[]
			];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}
			function badValue( value ) {
				return function() {
					makeLatex( {}, value );
				};
			}
		});

});

describe( 'convertObjArr', function tests() {
  it( 'turns an array of objects into a LaTeX table', function test(){
    var input = [
      {name:"Harry", age: 64},
      {name:"Melanie", age: 38},
      {name:"Anna", age: 27},
      {name:"Charlotte", age: 25}
    ];
    var res = makeLatex(input, {});
    expect(res).to.be.a("string");
  });

  it( 'works with custom spec', function test() {
    var input = [
      {name:"Harry", age: 64},
      {name:"Melanie", age: 38},
      {name:"Anna", age: 27},
      {name:"Charlotte", age: 25}
    ];
    var res = makeLatex(input, {
      spec: "lc"
    });

    expect(res).to.be.a("string");
  });


	it( 'should throw when digits option is non-numeric', function test() {

		var input = [
			{name:"Harry", age: 64},
			{name:"Melanie", age: 38},
			{name:"Anna", age: 27},
			{name:"Charlotte", age: 25}
		];

		var values = [
			'',
			true,
			undefined,
			null,
			NaN,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				makeLatex( input, {"digits": value} );
			};
		}
	});

});

describe( 'convertMatrix', function tests() {

  it( 'turns an array of arrays into a LaTeX table', function test(){
    var input = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    var res = makeLatex(input, {});
    expect(res).to.be.a("string");
  });

	it( 'should throw when digits option is non-numeric', function test() {

		var input = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9]
		];

		var values = [
			'',
			true,
			undefined,
			null,
			NaN,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				makeLatex( input, {"digits": value} );
			};
		}
	});

});

describe( 'convertObj', function tests() {

	it( 'turns an object into a LaTeX table', function test() {
		var input = {
			"name": "Henry",
			"points": 3.22934839047
		};
		var res = makeLatex(input, {});
    expect(res).to.be.a("string");
	});

	it( 'should throw when digits option is non-numeric', function test() {

		var input = {
			"name": "Henry",
			"points": 3.22934839047
		};

		var values = [
			'',
			true,
			undefined,
			null,
			NaN,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				makeLatex( input, {"digits": value} );
			};
		}
	});

});
