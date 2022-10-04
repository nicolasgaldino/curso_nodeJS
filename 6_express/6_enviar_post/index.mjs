import express from 'express';
import chalk from 'chalk';
import path from 'path';
import url from 'url';

const app = express();
const port = 3000;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath = path.join(__dirname, "templates");

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

app.get("/users/add", (req, res) => {
  res.sendFile(`${basePath}/userform.html`);
});

app.post("/users/save", (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const age = req.body.age;
  console.log(`O nome do usuário é ${name} e ele tem ${age} anos.`);
  res.sendFile(`${basePath}/userform.html`);
});

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
