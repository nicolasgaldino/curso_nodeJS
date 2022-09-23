const fs = require('fs');
const myDir = './minhaPasta';

if(!fs.existsSync(myDir)) {
  fs.mkdirSync('minhaPasta');
  console.log('Diretório criado.')
} else {
  console.log('Diretório existente.')
}
