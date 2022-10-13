import chalk from "chalk";
import express from 'express';
import exphbs from 'express-handlebars';

const port = 3000;
const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("home", {layout: false});
});

app.listen(port, () => {
  console.log(chalk.bgGreen(`Aplicação rodando na porta: ${port}.`));
});
