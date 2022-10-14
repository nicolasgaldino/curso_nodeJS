import chalk from 'chalk';
import express from 'express';
import exphbs from 'express-handlebars';

const port = 3000;
const app = express();
const hbs = exphbs.create({
  partialsDir: ["views/partials"],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.static("public"));

const products = [
  {
    prodId: 1,
    prodName: "PlayStation 5",
    prodCategory: "Jogos & Eletrônicos",
    prodPrice: 5000,
    prodDescription: "Console para jogos.",
  },
  {
    prodId: 2,
    prodName: "iPhone 14 Pro",
    prodCategory: "Telefonia & Eletrônicos",
    prodPrice: 10000,
    prodDescription: "Telefone celular.",
  },
  {
    prodId: 3,
    prodName: "Xbox Series S",
    prodCategory: "Jogos & Eletrônicos",
    prodPrice: 4000,
    prodDescription: "Console para jogos.",
  },
  {
    prodId: 4,
    prodName: "PC Master Race",
    prodCategory: "Jogos & Eletrônicos",
    prodPrice: 25000,
    prodDescription: "Baita PC fodão.",
  },
];

app.get("/product/:id", (req, res) => {
  const product = products[parseInt(req.params.id) - 1];
  res.render("product", { product });
});

app.get("/", (req, res) => {
  res.render("home", { products });
});

app.listen(port, () => {
  console.log(chalk.bgGreen(`Servidor rodando na porta: ${port}.`));
});
