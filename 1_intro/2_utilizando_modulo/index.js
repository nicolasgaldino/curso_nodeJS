const fs = require('fs');

fs.readFile('arquivo.txt', 'utf-8', (error, data) => {
  error ? console.log(error) : console.log(data);
});
