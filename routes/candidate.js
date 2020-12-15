const router = require("express").Router()
const verify = require("../config/validateAdmin")
const db = require("../database/dbConnect")

presStatement = "SELECT * FROM `president_info` ORDER BY `president_info`.`vote_count` DESC; "
vpStatement = "SELECT * FROM `vice_president_info` ORDER BY `vice_president_info`.`vote_count` DESC; "
gsStatement = "SELECT * FROM `secretary_info` ORDER BY `secretary_info`.`vote_count` DESC;"

statement = presStatement + vpStatement + gsStatement

router.get("/", verify, (req, res) => {
  db.query(statement, (err, result) => {
    res.render("candidate", {result})
  })
})

module.exports = router