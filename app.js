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

//Function to prompt user to select choice from list
function promptUser() {
    inquirer.prompt([
        {
            name: "choice",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add Employee.",
                "Add Role.",
                "Add Department.",
                "View All Employees.",
                "View Employees by Role.",
                "View Employees by Department.",
                "Update Employee.",
                "DONE.",
            ]
        }
    ]).then(function (answer) {
        //Use switch/case for each option
        switch (answer.choice) {
            case "Add Employee.":
                addEmployee();
                break;
            case "Add Role.":
                addRole();
                break;
            case "Add Department.":
                addDepartment();
                break;
            case "View All Employees.":
                viewEmployees();
                break;
            case "View Employees by Role.":
                viewRoles();
                break;
            case "View Employees by Department.":
                viewDepartments();
                break;
            case "Update Employee.":
                updateEmployee();
                break;
            case "DONE.":
                endApp();
                break;
        };
    });
};
