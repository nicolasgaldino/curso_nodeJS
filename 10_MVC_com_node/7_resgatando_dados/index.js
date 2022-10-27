import chalk from 'chalk';
import express from 'express';
import exphbs from 'express-handlebars';
import conn from './db/conn.js';
import Task from './models/Task.js';
import tasksRoutes from './routes/tasksRoutes.js';

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
app.use("/tasks", tasksRoutes);

conn
  .sync()
  //.sync({ force: true })
  .then(() => {
    app.listen(port, () => { console.log(chalk.bgGreen(`Servidor rodando na porta: ${port}.`)) });
  })
  .catch((error) => {
    console.log(chalk.red(`Erro: ${error}.`));
  });
