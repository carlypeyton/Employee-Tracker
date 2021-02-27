//Dependencies
const inquirer = require("inquirer")
const mysql = require("mysql")
const consoleTable = require('console.table');

//Create connection to database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
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

//View All Employees (Include Employee Info Including Name, Title, Salary, Department, Manager)
const viewEmployees = () => {
    const query = "SELECT employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Title, role.salary AS Salary, department.name AS Department, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id LEFT JOIN employee e on employee.manager_id = e.id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
};

//View Employees by Role (Include Name and Role)
const viewRoles = () => {
    const query = "SELECT employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
};


