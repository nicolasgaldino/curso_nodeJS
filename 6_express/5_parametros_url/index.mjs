import express from 'express';
import chalk from 'chalk';
import path from 'path';
import url from 'url';

const app = express();
const port = 3000;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath = path.join(__dirname, "./templates");

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  console.log(chalk.bgRed(`Buscando pelo usuário: ${id}.`))
  res.sendFile(`${basePath}/users.html`);
});

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
  console.log(chalk.bgGreen(`Servidor rodando na porta: ${port}.`))
});