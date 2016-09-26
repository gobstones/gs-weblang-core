var utils = require('./_utils');

utils.testStatements('while', 'a := 1; while (a < 5) a := a + 1', 'a', 5);
utils.testStatements('while', 'a := 1; while (a <= 5) a := a + 1', 'a', 6);
utils.testStatements('while', 'a := 1; b := True; while (b) { a := a + 1; if (a > 4) b := False }', 'a', 5);

utils.testStatements('repeat', 'a := 1; repeat (3) { a := a + 1}', 'a', 4);
utils.testStatements('repeat', 'a := 1; repeat (2 + 1) { a := a + 1}', 'a', 4);
utils.testStatements('repeat', 'a := 1; repeat (2 + 1) repeat (2) a := a + 1', 'a', 7);
utils.testStatements('repeat', 'a := 1; repeat (2 + 1) { repeat (2) { a := a + 1 } }', 'a', 7);
