// "type": "module"
import express from 'express';
import exphbs from 'express-handlebars';
import mysql from 'mysql';

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/books/insertbook", (req, res) => {
  const title = req.body.title;
  const pageqty = req.body.pageqty;
  const sql = `INSERT INTO books (title, pageqty) VALUES ("${title}", "${pageqty}")`;
  conn.query(sql, (err) => { err ? console.log(err) : res.redirect("/books"); });
});

app.get("/books", (req, res) => {
  const sql = "SELECT * FROM books";
  conn.query(sql);
  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const books = data;
    res.render("books", {books});
  });
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
