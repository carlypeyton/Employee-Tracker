//Dependencies
const inquirer = require("inquirer")
const mysql = require("mysql")
const consoleTable = require('console.table');

//Create connection to database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Leelanau1993!",
    database: "employee_trackerDB",
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}.`);
    promptUser();
});

