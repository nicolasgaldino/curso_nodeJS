const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer((req, res) => {
  const urlInfo = require('url').parse(req.url, true);
  const name = urlInfo.query.name;
  if(!name) {
    fs.readFile('./teste.html', (error, data) => {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      error ? console.log(error) : res.end();
    });
  } else {
    const nameNewLine = name + ',\r\n';
    fs.appendFile('arquivo.txt', nameNewLine, (error, data) => {
      res.writeHead(302, {
        Location: '/',
      });
      error ? console.log(error) : res.end();
    });
  };
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}.`)
});
