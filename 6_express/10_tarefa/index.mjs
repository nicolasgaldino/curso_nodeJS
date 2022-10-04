// usei arquivos copiados de outros projeto padrão de HTML
// Não quis perder tempo elaborando algo, foquei em ter o HTML
// e CSS para quebrar galho

import express from 'express';
import chalk from 'chalk';
import path from 'path';
import url from 'url';

import router from './routes/index.mjs';

const app = express();
const userRoutes = router;
const port = 5000;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath = path.join(__dirname, "./templates");

app.use(express.static("public"));

app.use("/code", userRoutes);

app.listen(port, () => {
  console.log(chalk.bgGreen(`Servidor rodando na porta: ${port}.`))
});
