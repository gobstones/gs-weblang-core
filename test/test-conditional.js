var utils = require('./_utils');

utils.testStatements('if', 'if(True) a := 1', 'a', 1);
utils.testStatements('if', 'a := 2; if(False) a := 1', 'a', 2);
utils.testStatements('if', 'if(True){a := 1} else {a := 2}', 'a', 1);
utils.testStatements('if', 'if(False){a := 1} else {a := 2}', 'a', 2);
utils.testStatements('if', ' c := True; if(False){a := 1} else {a := 2}', 'a', 2);
utils.testStatements('if', 'if(False || True){a := 1} else {a := 2}', 'a', 1);
utils.testStatements('if', 'if(False && True){a := 1} else {a := 2}', 'a', 2);
utils.testStatements('if', 'if(2 > 3 + 4){a := 1} else {a := 2}', 'a', 2);
utils.testStatements('if', 'if(2 < 3 + 4){a := 1} else {a := 2}', 'a', 1);
utils.testStatements('if', 'if(2 < 3 + 4 && True ){a := 1} else {a := 2}', 'a', 1);
utils.testStatements('if', 'if(2 < 3 + 4 && False ){a := 1} else {a := 2}', 'a', 2);
utils.testStatements('if', 'if(2 < 3 + 4 && 5 >= 5 ){a := 1} else {a := 2}', 'a', 1);
