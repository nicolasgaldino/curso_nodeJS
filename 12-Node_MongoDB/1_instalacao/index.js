import chalk from "chalk";
import express from "express";
import exphbs from "express-handlebars";
import conn from "./db/conn.js";

const app = express();
const port = 3001;

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

app.listen(port, () => { console.log(chalk.bgGreen(`Servidor rodando na porta: ${port}.`)) });
