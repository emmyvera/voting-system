const router  = require("express").Router()
const db = require("../database/dbConnect")

var pres_name = []
var pres_vote = []

var vp_name = []
var vp_vote = []

var sec_name = []
var sec_vote = []

pres_state = "Select * From `president_info`"
db.query(pres_state, (err, result) => {
    for (let i = 0; i < result.length; i++) {
        pres_name.push(result[i].name)
        pres_vote.push(result[i].vote_count)
    }

})

vp_state = "Select * From `vice_president_info`"
db.query(vp_state, (err, result) => {
    for (let i = 0; i < result.length; i++) {
        vp_name.push(result[i].name)
        vp_vote.push(result[i].vote_count)
    }

})

sec_state = "Select * From `secretary_info`"
db.query(sec_state, (err, result) => {
    for (let i = 0; i < result.length; i++) {
        sec_name.push(result[i].name)
        sec_vote.push(result[i].vote_count)
    }

})

router.get("/", async(req, res) => {
    console.log(pres_vote)
    console.log(vp_vote)
    console.log(sec_vote)

    await res.render("result", {
    pres_name, pres_vote,
    vp_name, vp_vote,
    sec_name, sec_vote})
})
module.exports = router