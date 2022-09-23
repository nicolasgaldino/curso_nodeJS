const fs = require('fs');
const arquivo = 'arquivo.txt';
const novoArquivo = 'novoArquivo.txt';

fs.rename(arquivo, novoArquivo, (error) => {
  if(error) {
    console.log(error);
    return;
  } else {
    console.log(`O arquivo ${arquivo} foi renomeado para ${novoArquivo}.`)
  }
});
