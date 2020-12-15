const router = require("express").Router()
const verify = require("../config/validateAdmin")
const db = require("../database/dbConnect")

statement1 = "SELECT * FROM `users_info`"

router.get("/", verify, (req, res)=> {
    db.query(statement1, (err, result)=> {

        res.render("members", {result})
    })
})

module.exports = router