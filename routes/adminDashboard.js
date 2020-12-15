const router = require("express").Router()
const verify = require("../config/validateAdmin")
const db = require("../database/dbConnect")

count_statement = "SELECT COUNT(*) AS member FROM `users_info`; "
no_voted = "SELECT COUNT(*) AS no_voted FROM `users_info` WHERE `vote_status` = 1; "
presStatement = "SELECT * FROM `president_info` ORDER BY `president_info`.`vote_count` DESC; "
vpStatement = "SELECT * FROM `vice_president_info` ORDER BY `vice_president_info`.`vote_count` DESC; "
gsStatement = "SELECT * FROM `secretary_info` ORDER BY `secretary_info`.`vote_count` DESC;"

mStatement = count_statement + no_voted + presStatement + vpStatement + gsStatement

router.get("/", verify, (req, res)=> {
    pres_name = []
    pres_vote = []

    vp_name = []
    vp_vote = []

    gs_name = []
    gs_vote = []
    db.query(mStatement, (err, result) =>{

        for (let i = 0; i < result[2].length; i++) {
            pres_name.push(result[2][i].name)
            pres_vote.push(result[2][i].vote_count)
        }

        for (let i = 0; i < result[3].length; i++) {
            vp_name.push(result[3][i].name)
            vp_vote.push(result[3][i].vote_count)
        }

        for (let i = 0; i < result[4].length; i++) {
            gs_name.push(result[4][i].name)
            gs_vote.push(result[4][i].vote_count)
        }

        res.render("monitor", {result, pres_name, pres_vote,
                                vp_name, vp_vote, gs_name, gs_vote})
    })

    router.get("/logout", (req, res)=> {
        res.cookie('auth',null)
        res.redirect("/admin")
    })
})


module.exports = router