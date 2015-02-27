#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

> create LaTeX tables from inside node.js


## Install

Easily via npm:

```sh
$ npm install --save make-latex
```

## Usage

```js
var makeLatex = require('make-latex');

var mat = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

makeLatex(mat);
/*
returns:
\begin{table}
\centering
\begin{tabular}{ccc}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9 \\
\end{tabular}
\end{table}
*/
```

## API

### makeLatex(obj [, options])

Main function which takes a JavaScript object `obj` and converts it to LaTeX.
The function returns a string which can be directly embedded in LaTeX.
Currently, the following types of objects are supported:

1. An array of arrays, or more specifically a square matrix (inner arrays must all
  have equal length).
2. An array of objects.

The function accepts an optional options object which governs the created LaTeX output.
The options object can have the following keys:

| Key        |   Description           | Default Value |
| ------------- |:-------------:| -----:|
| caption       | Caption of the created table | none |
| label         | Label of the created table | none |
| captionPlacement         | Position of Caption, either "bottom" or "top" | "bottom" |
| colnames      | If supplied, first row in table prints names of columns | Object.keys() for Array of Objects |
| spec          | See Spec section      | centered, no vertical lines
| pos           | See Positions section | none |


#### Spec

In LaTeX, the spec argument determines the alignment which is used
in each column and where to insert vertical lines.

| Key        |   Description  |
| ------------- |:-------------:|
|  l  | left-justified column |
|  c  | centered column |
|  r  | right-justified column |
|  \| 	| vertical line |
|  \|\| |	double vertical line |

#### Positions

| Key        |   Description  |
| ------------- |:-------------:|
|  h  | allowed to be placed inline |
|  t  | go into top area |
|  b  | go into a bottom area |
|  p  | go on a float page or column area |

Appending `!` to either of those positions will force LaTeX to ignore restrictions related to number of floats
that can be placed in an array or the size an array can occupy.

## License

MIT © [Philipp Burckhardt](http://www.philipp-burckhardt.com)


[npm-url]: https://npmjs.org/package/make-latex
[npm-image]: https://badge.fury.io/js/make-latex.svg
[travis-url]: https://travis-ci.org/Planeshifter/node-make-latex
[travis-image]: https://travis-ci.org/Planeshifter/node-make-latex.svg?branch=master
[daviddm-url]: https://david-dm.org/Planeshifter/node-make-latex.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/Planeshifter/node-make-latex
