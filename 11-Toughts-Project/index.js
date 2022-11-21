import os from 'os';
import path from 'path';
import chalk from 'chalk';
import express from 'express';
import conn from "./db/conn.js";
import flash from 'express-flash';
import session from 'express-session';
import exphbs from 'express-handlebars';
import FileStore from 'session-file-store';
const fileStoreSession = FileStore(session);

const port = 3001;
const app = express();

// Models
import User from "./models/User.js";
import Tought from "./models/Tought.js";

// Import Routes
import toughtsRoutes from "./routes/toughtsRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Import Controller
import ToughtController from "./controllers/ToughtController.js";

// template engine
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

// public path
app.use(express.static("public"))

// receive body response
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

// middleware session
app.use(
  session({
    name: "session",
    secret: "meu_secret",
    resave: false,
    saveUninitialized: false,
    store: new fileStoreSession({
      logFn: function () { },
      path: path.join(os.tmpdir(), "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  }),
);

// flash messages
app.use(flash());

// set session response
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  };
  next();
});

// Routes
app.use("/toughts", toughtsRoutes);
app.use("/", authRoutes);

app.get("/", ToughtController.showToughts);

conn
  .sync()
  //.sync({ force: true })
  .then(() => {
    app.listen(port, () => { console.log(chalk.bgGreen(`Servidor rodando na porta: ${port}.`)) });
  })
  .catch((error) => {
    console.log(chalk.bgRed(`Erro: ${error}.`));
  });
