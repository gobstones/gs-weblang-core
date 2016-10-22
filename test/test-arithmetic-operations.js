var utils = require('./_utils');

utils.testOperation('1+2', 3);
utils.testOperation('999+1', 1000);
utils.testOperation('2*3', 6);
utils.testOperation('6/2', 3);
utils.testOperation('7/2', 3);
utils.testOperation('7%2', 1);
utils.testOperation('6%2', 0);
utils.testOperation('(1+2)*3', 9);
utils.testOperation('1+(2*3)', 7);
utils.testOperation('1+2*3', 7);
utils.testOperation('2*3+1', 7);
utils.testOperation('6*3/2', 9);
utils.testOperation('2 + (- 1)', 1);
