const _ = require('lodash');

const array0 = [0, 2, 3, 4, 5, 6, 7, 8, 9];
const array1 = [9, 8, 7, 6, 5, 4, 3, 2, 1];

const diff = _.difference(array0, array1);

console.log(diff)
