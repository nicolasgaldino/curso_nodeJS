import express from 'express';
import path from 'path';
import url from 'url';

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na posta: ${port}.`)
});

const trintaSeg = () => {
  setTimeout(() => {
    console.clear();
  }, 30000);
};

trintaSeg();
