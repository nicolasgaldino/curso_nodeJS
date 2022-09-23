const path = require('path');
const arquivo = './teste.txt';

// path absoluto
console.log(path.resolve(arquivo));

// formar path
const midFolder = 'relatiorios';
const fileName = 'nicolas.txt';

const finalPath = path.join('/', midFolder, fileName);
console.log(finalPath)
