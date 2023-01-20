const {Router} = require('express')

const router = Router()

router.get("/", (req, res) => {
  res.render("inicio");
});
router.get("/contacto", (req, res) => {
  res.render("contacto");
});

module.exports = (router)