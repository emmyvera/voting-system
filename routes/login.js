const route = require("express").Router()
const db = require("../database/dbConnect")
const jwt = require("jsonwebtoken")

route.get("/", (req, res, next) => {

  res.render("index", {
    flashMessages: {}
  });

})

route.post("/", (req, res, next) => {
  const username = req.body.email
  const password = req.body.pass

  const userValidStm = "SELECT `id`,`email`, `phone`, `vote_status` FROM `users_info` WHERE `email` = ?"

  db.query(userValidStm, [username], function (err, result) {
    if (err) throw err;
    console.log(result)
    if (result.length === 0) {
      res.render("index", {
        flashMessages: {
          error: "Invalid username or password"
        }
      })
    } else if (result[0].phone !== password) {
      res.render("index", {
        flashMessages: {
          error: "Wrong password"
        }
      })
    } else if (result[0].vote_status === 1) {
      res.render("index", {
        flashMessages: {
          error: "Already Voted!"
        }
      })
    } else {
      const token = jwt.sign({
        id: result[0].id
      }, "secret-hack")
      res.cookie('auth', token)
        .redirect("/vote")
    }
  });
})

module.exports = route;