-- Department Seeds

INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Marketing");
INSERT INTO department (name)
VALUE ("Accounting");
INSERT INTO department (name)
VALUE ("Legal");

-- Role Seeds

INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 160000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Junior Engineer", 90000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Marketing Manager", 140000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Marketing Analyst", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 75000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Accounting Clerk", 65000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Lawyer", 120000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Paralegal", 70000, 4);

-- Employee Seeds 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Mortimer", "Goth", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Bob", "Pancakes", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Lilith","Pleasant", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Judith", "Ward", 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Eric", "Greenburg", 5, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Akira", "Kibo", 6, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Nancy", "Landgraab", 7, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Geoffrey", "Landgraab", 8, 1);

-- Select from tables 

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee; 