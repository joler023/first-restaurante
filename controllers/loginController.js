const bcrypt = require("bcrypt");

let yaSeLoggeo = false

const register = (req, res) => {
  if(yaSeLoggeo != true){
    res.render("login/register");
    }else{
      res.redirect('/')
    }
};

const login = (req, res) => {
  if(yaSeLoggeo != true){
  res.render("login/login");
  }else{
    res.redirect('/')
  }
};

const auth = (req, res) => {
  const data = req.body;
  console.log(data);
  req.getConnection((err, conn) => {
    conn.query(
      "SELECT * FROM users WHERE email = ?",
      [data.email],
      (err, userdata) => {
        if (userdata.length > 0) {
          userdata.forEach((element) => {
            bcrypt.compare(data.password, element.password, (err, isMatch) => {
              if (!isMatch) {
                res.render("login/register", { error: "incorrect password" });
              } else {
                yaSeLoggeo = true
                req.session.loggedin = yaSeLoggeo;
                req.session.name = element.name;
                res.redirect("/");
                console.log(req.session.loggedin);

              }
            });
          });
        } else {
          res.render("login/register", { error: "User not exist" });
        }
      }
    );
  });
  login;
};

const storeUser = (req, res) => {
  const data = req.body;

  req.getConnection((err, conn) => {
    conn.query(
      "SELECT * FROM users WHERE email = ?",
      [data.email],
      (err, userdata) => {
        let hayError = false;
        if (userdata.length > 0) {
          res.render("login/register", { error: "User already exist" });
        } else {
          bcrypt.hash(data.password, 12).then((hash) => {
            data.password = hash;
            req.getConnection((err, conn) => {
              conn.query("INSERT INTO users SET ?", [data], (err, rows) => {
                res.redirect("/");
              });
            });
          });
        }
      }
    );
  });
};

module.exports = {
  login,
  register,
  storeUser,
  auth,
};
