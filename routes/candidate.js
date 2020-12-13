const router = require("express").Router()
const verify = require("../config/validateAdmin")
const db = require("../database/dbConnect")


router.get("/", verify, (req, res)=> {
    res.render("candidate")
})

module.exports = router