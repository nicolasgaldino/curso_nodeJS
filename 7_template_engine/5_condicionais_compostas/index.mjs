import chalk from "chalk";
import express from 'express';
import exphbs from 'express-handlebars';

const port = 3000;
const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.get("/dashboard", (req, res) => {
  res.render("dashboard")
});

app.get("/", (req, res) => {

  const user = {
    nome: "Nícolas",
    sobreNome: "Galdino",
    idade: 24,
    profissao: "programador"
  };

  const auth = true;

  res.render("home", {data: user, auth});
});

app.listen(port, () => {
  console.log(chalk.bgGreen(`Aplicação rodando na porta: ${port}.`));
});
