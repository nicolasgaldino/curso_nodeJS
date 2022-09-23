const fs = require('fs');

fs.unlink('../7_atualizando_arquivo/arquivo.txt', (error) => {
  if(error) {
    console.log(error);
    return;
  } else {
    console.log('Arquivo removido.');
  };
});
