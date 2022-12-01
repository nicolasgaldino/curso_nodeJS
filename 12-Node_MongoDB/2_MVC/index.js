import chalk from "chalk";
import express from "express";
import exphbs from "express-handlebars";

const app = express();
const port = 3001;

import conn from "./db/conn.js";
import productsRoues from "./routes/productsRoutes.js";

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());
app.use(express.static("public"));
app.use("/products", productsRoues);

app.listen(port, () => { console.log(chalk.bgGreen(`Servidor rodando na porta: ${port}.`)) });
