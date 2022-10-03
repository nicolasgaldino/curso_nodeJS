import express from "express";
import chalk from 'chalk';
import path from 'path';
import url from 'url';

const app = express();
const port = 3000;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath = path.join(__dirname, "./templates");

function checkAuth(req, res, next) {
  const checkLoggin = req.authStatus = true;
  if (checkLoggin) {
    console.log(chalk.bgGreen("Usuário logado"));
    next();
  } else {
    console.log(chalk.bgRed("Usuário não logado"));
    next();
  };
};

app.use(checkAuth);

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}.`);
});
