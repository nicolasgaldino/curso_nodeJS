import express from 'express';
import path from 'path';
import url from 'url';

const app = express();
const router = express.Router();
const port = 3000;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath = path.join(__dirname, "../templates");

router.get("/add", (req, res) => {
  res.sendFile(`${basePath}/userform.html`);
});

router.post("/save", (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const age = req.body.age;
  console.log(`O nome do usuário é ${name} e ele tem ${age} anos.`);
  res.sendFile(`${basePath}/userform.html`);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log(chalk.bgRed(`Buscando pelo usuário: ${id}.`))
  res.sendFile(`${basePath}/users.html`);
});

export default router;
