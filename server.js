const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

/*db info*/

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql");

const connection = mysql.createConnection({
   host: conf.host,
   user: conf.user,
   password: conf.password,
   port: conf.port,
   database: conf.database,
});
/*
connection.connect();
*/

/*session connect*/

const session = require("express-session");
const FileStore = require("session-file-store")(session);
app.use(
   session({
      secret: "asadlfkj!@#!@#dfgasdg",
      resave: false,
      saveUninitialized: true,
      store: new FileStore(),
      httpOnly: true,
   })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("hello world!"));

const userRouter = require("./routes/users");
app.use("/users", userRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
