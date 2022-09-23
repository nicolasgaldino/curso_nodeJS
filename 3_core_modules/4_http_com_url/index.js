const http = require('http');
const port = 3000;

const server = http.createServer((req, res) => {
  const urlInfo = require('url').parse(req.url, true); // decompõe a URL
  const name = urlInfo.query.name; // pega o parâmetro 'name' da URL

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  !name ? res.end(
    `
      <h1>Preencha seu nome.</h1>
      <form method="GET">
      <input type="text" name="name" />
      <input type="submit" value="Enviar" />
      </form>
    `
    ) : res.end(`<h1>Seja bem-vindo, ${name}!</h1>`);
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}.`)
});
