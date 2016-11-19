# Gobstones language module for the web
[![Build Status](https://travis-ci.org/gobstones/gs-weblang-core.svg?branch=master)](https://travis-ci.org/gobstones/gs-weblang-core)
[![Coverage Status](https://coveralls.io/repos/github/gobstones/gs-weblang-core/badge.svg?branch=master)](https://coveralls.io/github/gobstones/gs-weblang-core?branch=master)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)


### Npm package

Npm package can be found on [gs-weblang-core](https://www.npmjs.com/package/gs-weblang-core)

### CDN

Universal module files can be found on [unpkg](https://unpkg.com)
For instance, version `0.1.4` can be fetched from `https://unpkg.com/gs-weblang-core@0.1.4/umd/`

### Bower

It can be installed with Bower too!
```
bower install --save gobstones/gs-weblang-core#1.2.0
```

### Developer Tools

Developer tools that include ascii board and AST viewer can be found on: `http://gobstones.github.io/gs-weblang-core/tools/index.html?v=0.1.4`

Replace the version `v` with the desire version you want to try.

### hello-world example
```js
function parseAndInterpret(sourceCode) {
    var Context = gsWeblangCore.context;
    var parser = gsWebLangCore.getParser();

    var ast = parser.parseProgram(sourceCode)[0];
    return ast
        .interpret(new Context())
        .board();
}

// ---------

parse("program { Mover(Norte)\nPoner(Azul) }");
```
