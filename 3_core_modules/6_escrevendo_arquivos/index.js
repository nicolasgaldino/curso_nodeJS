const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer((req, res) => {
  const urlInfo = require('url').parse(req.url, true);
  const name = urlInfo.query.name;
  if(!name) {
    fs.readFile('./index.html', (error, data) => {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      error? console.log(error) : res.end();
    });
  } else {
    fs.writeFile('arquivo.txt', name, (error, data) => {
      res.writeHead(302, {
        Location: '/',
      });
      error? console.log(error) : res.end();
    });
  };
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}.`)
});
