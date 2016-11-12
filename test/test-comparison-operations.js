var utils = require('./_utils');

utils.testOperation('1 <  2', true);
utils.testOperation('1 <= 2', true);
utils.testOperation('2 <= 2', true);
utils.testOperation('2 <= 2', true);
utils.testOperation('not (2 > 3)', true);
utils.testOperation('(2 > 3)', false);
utils.testOperation('not (2 >= 3)', true);
utils.testOperation('(2 >= 3)', false);
utils.testOperation('1 == 1', true);
utils.testOperation('2 == 2', true);
utils.testOperation('2 /= 3', true);
utils.testOperation('2 /= 3', true);
utils.testOperation('True /= False', true);
utils.testOperation('True == True', true);
utils.testOperation('2 + 3 == 5', true);
