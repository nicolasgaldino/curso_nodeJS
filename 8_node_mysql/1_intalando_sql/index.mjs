// "type": "module"
import express from 'express';
import exphbs from 'express-handlebars';
import mysql from 'mysql';

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});

conn.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Conectado.");
    app.listen(3001);
  };
});
