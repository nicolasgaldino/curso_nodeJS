// referência: https://bobbyhadz.com/blog/javascript-dirname-is-not-defined-in-es-module-scope
// para conseguir executar a aplicação usando import do ES6
// foi preciso fazer algumas alterações no código base da aula

import express from 'express';
import path from 'path';
import url from 'url';

const app = express();
const port = 3000;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath = path.join(__dirname, "./templates");

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}.`);
});
