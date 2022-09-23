const http = require('http');
const fs = require('fs');
const url = require('url');
const port = 3000;

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true);
  const fileName = query.pathname.substring(1);
  if(fileName.includes('html')) {
    if(fs.existsSync(fileName)) {
      fs.readFile(fileName, (error, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        error ? console.log(error) : res.end();
      });
    } else {
      fs.readFile('./404.html', (error, data) => {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write(data);
        error ? console.log(error) : res.end();
      });
    };
  }
});

server.listen(port, (error) => {
  error ? console.log(error) : console.log(`Servidor rodando na porta: ${port}.`)
});
