const express = require("express");
const morgan = require("morgan");
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
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//middlewares
app.use(express.static("public"));
app.use(HomeRoutes);
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(bodyParser.json())

app.use(myconnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: ''
}))


app.listen(app.get("port"), () => {
  console.log(`server ${app.get("appName")} on port ${app.get("port")}`);
});
