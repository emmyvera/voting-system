const router = require("express").Router()
const db = require("../database/dbConnect")
const jwt = require("jsonwebtoken")

router.get("/", (req, res) => {
    res.render("admin_login", {
        flashMessages: {}
      })
})

router.post("/", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const userValidStm = "SELECT `id`,`username`, `password` FROM `admin` WHERE `username` = ?"

  db.query(userValidStm, [username], function (err, result) {
    if (err) throw err;
    console.log(result)
    if (result.length === 0) {
      res.render("admin_login", {
        flashMessages: {
          error: "Invalid username or password"
        }
      })
    } else if (result[0].password !== password) {
      res.render("admin_login", {
        flashMessages: {
          error: "Wrong password"
        }
      })
    } else {
      const token = jwt.sign({
        id: result[0].id
      }, "secret-hack-admin")
      res.cookie('auth', token)
        .redirect("/adminDashboard")
    }
  });
})



module.exports = router