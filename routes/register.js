const router = require("express").Router()
const verify = require("../config/validateAdmin")
const db = require("../database/dbConnect")


router.get("/", verify, (req, res)=> {
    res.render("register")
})

// Member Reg
router.post("/member", verify, (req, res)=> {
    const {mName, mEmail, mPhone} = req.body
    // Check For Undefine
    if(typeof(mName) === 'undefined' | typeof(mPhone) === 'undefined' |typeof(mEmail) === 'undefined'){
        res.redirect("/register")
    } else{
        // Check If email exist already
        const userValidStm = "SELECT `email` FROM `users_info` WHERE `email` = ?"
        db.query(userValidStm, [mEmail], (err, result) => {
            if (result.length !== 0) {
                res.redirect("/register")
            }else{
                insertStatement = "Insert Into `users_info` (`email`, `phone`, `surname`) VALUES (?,?,?)"
                db.query(insertStatement, [mEmail, mPhone, mName])
                res.redirect("/register")
            }
        })
    }
})

// For President
router.post("/president", verify, (req, res)=>{
    const {pName, pEmail} = req.body
    console.log(typeof(pEmail))
    // Check For Undefine
    if(typeof(pName) === 'undefined' | typeof(pEmail) === 'undefined'){
        res.redirect("/register")
    } else{
        // Check If Name exist already
        const presValidStm = "SELECT `name` FROM `president_info` WHERE `name` = ?"
        db.query(presValidStm, [pName], (err, result) => {
            if (result.length !== 0) {
                res.redirect("/register")
            }else{
                insertStatement = "Insert Into `president_info` (`name`) VALUES (?)"
                db.query(insertStatement, [pName])
                res.redirect("/register")
            }
        })
    }
})

router.post("/vicepresident", verify, (req, res)=>{
    const {vpName, vpEmail} = req.body
    console.log(typeof(pEmail))
    // Check For Undefine
    if(typeof(vpName) === 'undefined' | typeof(vpEmail) === 'undefined'){
        res.redirect("/register")
    } else{
        // Check If Name exist already
        const vpresValidStm = "SELECT `name` FROM `vice_president_info` WHERE `name` = ?"
        db.query(vpresValidStm, [vpName], (err, result) => {
            if (result.length !== 0) {
                res.redirect("/register")
            }else{
                insertStatement = "Insert Into `vice_president_info` (`name`) VALUES (?)"
                db.query(insertStatement, [vpName])
                res.redirect("/register")
            }
        })
    }
})

// Reg For Secretary
router.post("/gsecretary", verify, (req, res)=>{
    const {gsName, gsEmail} = req.body
    console.log(typeof(pEmail))
    // Check For Undefine
    if(typeof(gsName) === 'undefined' | typeof(gsEmail) === 'undefined'){
        res.redirect("/register")
    } else{
        // Check If Name exist already
        const gsValidStm = "SELECT `name` FROM `secretary_info` WHERE `name` = ?"
        db.query(gsValidStm, [gsName], (err, result) => {
            if (result.length !== 0) {
                res.redirect("/register")
            }else{
                insertStatement = "Insert Into `secretary_info` (`name`) VALUES (?)"
                db.query(insertStatement, [gsName])
                res.redirect("/register")
            }
        })
    }
})


module.exports = router