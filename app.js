//Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");

//Create connection to database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASSWORD, 
    database: "employee_trackerDB",
});

//Connect to database and log to console
//Run function to prompt user
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
            message: "Please select option from below list.",
            choices: [
                "Add Employee.",
                "Add Role.",
                "Add Department.",
                "Update Employee.",
                "View All Employees.",
                "View All Employees by Role.",
                "View All Employees by Department.",
                "View All Roles.",
                "View All Departments.",
                "DONE.",
            ]
        }
    ]).then(function (answer) {
        //Use switch/case for each option
        switch (answer.choice) {
            case "View All Employees.":
                viewEmployees();
                break;
            case "View All Employees by Role.":
                viewRoles();
                break;
            case "View All Employees by Department.":
                viewDepartments();
                break;
            case "Add Employee.":
                addEmployee();
                break;
            case "Add Role.":
                addRole();
                break;
            case "Add Department.":
                addDepartment();
                break;
            case "Update Employee.":
                updateEmployee();
                break;
            case "View All Roles.":
                viewAllRoles();
                break;
            case "View All Departments.":
                viewAllDepartments();
                break;
            case "DONE.":
                endApp();
                break;
        }
    });
};

//View All Employees (Include Employee Info Including Name, Title, Salary, Department, Manager. Order by Employee ID.)
const viewEmployees = () => {
    const query = "SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager FROM employee LEFT JOIN employee manager on manager.id = employee.manager_id LEFT JOIN role ON (role.id = employee.role_id) LEFT JOIN department ON (department.id = role.department_id) ORDER BY employee.id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
};

//View Employees by Role (Include Name and Role. Order by Role.)
const viewRoles = () => {
    const query = "SELECT role.title AS Title, employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, department.name AS Department FROM employee LEFT JOIN role ON (role.id = employee.role_id) LEFT JOIN department ON (department.id = role.department_id) ORDER BY role.title";
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

//Add Employee (Include Name, Role ID, and Manager ID)
const addEmployee = () => {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "Please provide employee first name.",
        },
        {
            name: "lastName",
            type: "input",
            message: "Please provide employee last name.",
        },
        {
            name: "roleID",
            type: "input",
            message: "Please provide employee role ID.",
        },
        {
            name: "managerID",
            type: "input",
            message: "Please provide employee manager ID.",
        }
    ]).then(function (res) {
        const query = "INSERT INTO employee SET ?";
        connection.query(query, { first_name: res.firstName, last_name: res.lastName, manager_id: res.managerID, role_id: res.roleID }, (err, res) => {
            if (err) throw err;
            console.table(res);
            promptUser();
        });
    });
};

//Add Role (Include Title, Salary, Department ID)
const addRole = () => {
    inquirer.prompt([
    ]).then(function (res) {
        const query = "INSERT INTO role SET ?";
        connection.query(query, { title: res.newTitle, salary: res.newSalary, department_id: res.newDepartmentID }, (err, res) => {
            if (err) throw err
            console.table(res);
            promptUser();
        });
    });
};

//Add Department (Include Department Name)
const addDepartment = () => {
    inquirer.prompt([
        {
            name: "newDepartment",
            type: "input",
            message: "Please provide department name.",
        }
    ]).then(function (res) {
        const query = "INSERT INTO department SET ?";
        connection.query(query, { name: res.newDepartment }, (err, res) => {
            if (err) throw err;
            console.table(res);
            promptUser();
        });
    });
};

//View All Roles (Include Department for each Role)
const viewAllRoles = () => {
    const query = "SELECT * FROM role LEFT JOIN department ON (department.id = role.department_id)";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
};

//View All Departments
const viewAllDepartments = () => {
    const query = "SELECT * FROM department";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
};

//End Connection
const endApp = () => {
    connection.end();
};








