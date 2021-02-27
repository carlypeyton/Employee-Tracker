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
            case "View All Employees by Role.":
                viewRoles();
                break;
            case "View All Employees by Department.":
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

//Add Employee
const addEmployee = () => {
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "Please Provide Title.",
        },
        {
            name: "lastname",
            type: "input",
            message: "Please Provide Salary.",
        },
    ]).then(function (answer) {
        const query = "INSERT INTO employee SET ?";
        connection.query(query, {first_name: answer.firstname, last_name: answer.lastname}, (err, res) => {
            if (err) throw err;
            console.table(res);
            promptUser();
        });
    });
};

//View All Employees (Include Employee Info Including Name, Title, Salary, Department, Manager. Order by Employee ID.)
const viewEmployees = () => {
    const query = "SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager FROM employee LEFT JOIN employee manager on manager.id = employee.manager_id INNER JOIN role ON (role.id = employee.role_id) INNER JOIN department ON (department.id = role.department_id) ORDER BY employee.id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
};

//View Employees by Role (Include Name and Role. Order by Role.)
const viewRoles = () => {
    const query = "SSELECT role.title AS Title, employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, department.name AS Department FROM employee LEFT JOIN role ON (role.id = employee.role_id) LEFT JOIN department ON (department.id = role.department_id) ORDER BY role.title";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
};

//View Employees by Department (Include Name and Department. Order by Department)
const viewDepartments = () => {
    const query = "SELECT department.name AS Department, role.title AS Title, employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name FROM employee LEFT JOIN role ON (role.id = employee.role_id) LEFT JOIN department ON (department.id = role.department_id) ORDER BY department.name";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
};

// End 
const endApp = () => {
    connection.end(); 
};




