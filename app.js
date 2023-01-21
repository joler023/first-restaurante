const express = require("express");
const morgan = require("morgan");
const path = require("path")
const {engine} = require("express-handlebars");
const myconnection = require("express-myconnection");
const mysql = require('mysql')
const session = require("express-session");
const bodyParser = require("body-parser");



const app = express();
const HomeRoutes = require("./routes/home");

// settings
app.set("appName", "Restaurante");
app.set("port", 4000);
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

//middlewares
app.use(express.text())
app.use(express.json())
app.use(express.static("public"));
app.use(HomeRoutes);
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(bodyParser.json())

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  loggedin: false
}))


app.use(myconnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'nodelogin'
}))
const LoginController = require('./controllers/loginController')

//routes post
app.post("/register", LoginController.storeUser)
app.post("/login", LoginController.auth)
app.get("/logout", LoginController.logout)


app.listen(app.get("port"), () => {
  console.log(`server ${app.get("appName")} on port ${app.get("port")}`);
});

