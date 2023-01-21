const express = require('express')
const LoginController = require('../controllers/loginController')

const app = express.Router()

app.use(express.text())
app.use(express.json())


app.get("/", (req, res) => {
  res.render("inicio");
});

app.get("/contacto", (req, res) => {
  res.render("contacto");
});

// app.post("/register", LoginController.storeUser)
app.get("/login", LoginController.login)
// app.post("/login", LoginController.auth)
app.get("/register", LoginController.register)





module.exports = (app)