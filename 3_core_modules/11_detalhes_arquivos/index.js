const fs = require('fs');
const newDirectory = './teste';
const newFile = './novoArquivo.txt';

fs.stat(newDirectory, (error, data) => {
  error ? console.log(error) : console.log(`O ${newFile} existe.`);
  console.log(data.isFile());
  console.log(data.isDirectory());
  console.log(data.isSymbolicLink());
  console.log(data.ctime);
  console.log(data.size);
});
