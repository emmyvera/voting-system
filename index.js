const express = require("express")
const app = express()
const db = require("./database/dbConnect")
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser')


app.use(cookieParser())
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(flash());

app.use(session({ 
    secret:'geeksforgeeks',
    saveUninitialized: true,
    resave: true
}));
db.connect(async(err) => {
    if(err){
        throw err
    }
    const dbOn = await console.log("The Database is up and running...")
})

//Route
const login = require("./routes/login")
app.use("/", login)

const vote = require("./routes/vote")
app.use("/vote", vote)

const result = require("./routes/result")
app.use("/result", result)

const admin = require("./routes/admin")
app.use("/admin", admin)

const adminDashboard = require("./routes/adminDashboard")
app.use("/adminDashboard", adminDashboard)

const members = require("./routes/members")
app.use("/members", members)

const candidate = require("./routes/candidate")
app.use("/candidate", candidate)

const register = require("./routes/register")
app.use("/register", register)

app.listen(5000, ()=>{
    console.log(`This Webapp is available on port 5000...`)
})