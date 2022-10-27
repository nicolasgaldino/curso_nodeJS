import chalk from 'chalk';
import express from 'express';
import exphbs from 'express-handlebars';
import sequelize from "./db/conn.js";

const port = 3001;
const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());
app.use(express.static("public"));

app.listen(port, () => {
  console.log(chalk.green(`Servidor rodando na porta: ${port}.`));
});
