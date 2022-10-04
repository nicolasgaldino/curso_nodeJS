import express from 'express';
import path from 'path';
import url from 'url';

const router = express.Router();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath = path.join(__dirname, "../templates");


router.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

router.get("/orcamento", (req, res) => {
  res.sendFile(`${basePath}/orcamento.html`);
});

export default router;
