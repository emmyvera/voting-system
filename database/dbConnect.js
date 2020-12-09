const mysql = require("mysql")

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "voting_system"
});

module.exports = con;