const router = require("express").Router()
const verify = require("../config/validate")
const db = require("../database/dbConnect")

var pres_result;
const president_statement = "Select * From `president_info`"
    db.query(president_statement, async(err, result) => {
        pres_result = result
    })

var vp_result;
const vp_statement = "Select * From `vice_president_info`"
    db.query(vp_statement, async(err, result) => {
        vp_result = result
    })

var sec_result;
const sec_statement = "Select * From `secretary_info`"
    db.query(sec_statement, async(err, result) => {
        sec_result = result
    })

router.get("/", verify, async (req, res) => {
    res.render("vote", {pres_result, vp_result, sec_result})

})

function updateVotePres(pres){
    if (typeof pres !== 'undefined'){
        pres_state = "Select `vote_count` From `president_info` Where `name` = ?"

        db.query(pres_state, [pres], (err, result) => {
            var pres_res = result[0].vote_count
            pres_res = pres_res + 1

            vote_state = "Update `president_info` Set `vote_count` = ? Where `name` = ?"
            db.query(vote_state, [pres_res, pres], (err, result1) => {
                console.log("Done!")
            })
        })
    }
}

function updateVoteVP(vp){
    if (typeof vp !== 'undefined'){
        vp_state = "Select `vote_count` From `vice_president_info` Where `name` = ?"

        db.query(vp_state, [vp], (err, result) => {
            var vp_res = result[0].vote_count
            vp_res = vp_res + 1

            vote_state = "Update `vice_president_info` Set `vote_count` = ? Where `name` = ?"
            db.query(vote_state, [vp_res, vp], (err, result1) => {
                console.log("Done!")
            })
        })
    }
}

function updateVoteSec(sec){
    if (typeof sec !== 'undefined'){
        sec_state = "Select `vote_count` From `secretary_info` Where `name` = ?"

        db.query(sec_state, [sec], (err, result) => {
            var sec_res = result[0].vote_count
            sec_res = sec_res + 1

            vote_state = "Update `secretary_info` Set `vote_count` = ? Where `name` = ?"
            db.query(vote_state, [sec_res, sec], (err, result1) => {
                console.log("Done!")
            })
        })
    }
}

router.post("/", (req, res) => {
    var pres = req.body.pres
    var vp = req.body.vp
    var sec = req.body.sec

    updateVotePres(pres)
    updateVoteVP(vp)
    updateVoteSec(sec)

    res.cookie('auth',null)
    res.redirect("/")
})

router.post("/logout", (req, res) => {

})

module.exports = router