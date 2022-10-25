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
    } else {
      const books = data;
      res.render("books", { books });
    };
  });
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE id = ${id}`;
  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    } else {
      const book = data[0];
      res.render("book", { book })
    };
  });
});

app.get("/books/edit/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE id = ${id}`;
  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    } else {
      const book = data[0];
      res.render("editbook", { book })
    };
  });
});

app.post("/books/updatebook", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const pageqty = req.body.pageqty;
  const sql = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE id = ${id}`;
  conn.query(sql, (err, data) => {
    err ? console.log(err) : res.redirect("/books");
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
