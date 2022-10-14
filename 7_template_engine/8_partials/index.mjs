import chalk from "chalk";
import express from 'express';
import exphbs from 'express-handlebars';

const port = 3000;
const app = express();
const hbs = exphbs.create({
  partialsDir: ["views/partials"],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.get("/blog", (req, res) => {
  const posts =[
    {
      title: "Aprender Node.js",
      category: "JavaScript",
      body: "Artigo sobre Node.js",
      comments: 5,
    },
    {
      title: "Aprender Python",
      category: "Python Back-end",
      body: "Artigo sobre Python",
      comments: 4,
    },
    {
      title: "Aprender PHP",
      category: "PHP",
      body: "Artigo sobre PHP",
      comments: 3,
    },
  ];

  res.render("blog", {posts});
});

app.get("/blogpost", (req, res) => {

  const post = {
    title: "Aprender Node.js",
    category: "JavaScript",
    body: "Artigo sobre Node.js",
    comments: 5,
  };

  res.render("blogpost", {post});
});

app.get("/dashboard", (req, res) => {

  const items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
  ];

  res.render("dashboard", {items});
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
