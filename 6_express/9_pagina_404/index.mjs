import express from 'express';
import chalk from 'chalk';
import path from 'path';
import url from 'url';

import router from './users/index.mjs';

const app = express();
const port = 3000;
const usersRoutes = router;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath = path.join(__dirname, "templates");

app.use(express.static("public"));

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.use((req, res, next) => {
  res.status(404).sendFile(`${basePath}/404.html`);
});

app.listen(port, () => {
  console.log(chalk.bgGreen(`Servidor rodando na porta: ${port}.`))
});
