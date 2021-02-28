const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Dhanraj21!",
  database: "company_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
});

function start() {
  inquirer
    .prompt({
      name: "mainmenu",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Departments",
        "View Roles",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update Employee Role",
        "Exit",
      ],
    })
    .then((responses) => {
      switch (responses.mainmenu) {
        case "View Departments":
          viewDeps();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "View All Employees":
          viewAllEmp();
          break;
        case "Add a Department":
          addDep();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Add an Employee":
          addEmp();
          break;
        case "Update Employee Role":
          updateEmp();
          break;
        case "Exit":
          console.log("Bye!");
          connection.end();
          break;
      }
    });
}

viewAllEmp = () => {
  connection.query(
    "SELECT result.first_name AS EmployeeFirst, result.last_name AS EmployeeLast, title, salary, department_name, CONCAT(employee.first_name, '', employee.last_name) AS ManagerFull FROM (SELECT * FROM (SELECT first_name, last_name, department_id, title, salary, manager_id FROM employee INNER JOIN roles ON employee.role_id = roles.id) AS employee_role_table LEFT JOIN department ON employee_role_table.department_id = department.id) AS result LEFT JOIN employee ON result.manager_id = employee.id;",
    function (err, res) {
      if (err) throw err;
      console.table("\n", res, "\n");
    }
  );
  start();
};

viewDeps = () => {
  connection.query(
    "SELECT id AS department_id, department_name AS department_name FROM department",
    function (err, res) {
      if (err) throw err;
      console.table("\n", res, "\n");
    }
  );
  start();
};

viewRoles = () => {
  connection.query(
    "SELECT title as role_title, salary, department_name, role_id FROM roles LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employee ON roles.id = employee.role_id;",

    function (err, res) {
      if (err) throw err;
      console.table("\n", res, "\n");
    }
  );
  start();
};

function addDep() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "Enter new Department Name",
    })
    .then(function (answers) {
      console.log(answers.department);
      connection.query(
        `INSERT INTO department (department_name) VALUE ('${answers.department}');`,

        function (error) {
          if (error) throw error;
          console.log("Department Added!");
          viewDeps();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Enter name of new role",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary of the new role?",
      },
      {
        name: "id",
        type: "input",
        message: "what is the department ID of the new role?",
      },
    ])
    .then((answers) => {
      console.log(answers);
      connection.query(
        `INSERT INTO roles (title, salary, department_id) VALUES 
        ('${answers.name}', '${answers.salary}', '${answers.id}');`,
        function (error) {
          if (error) throw error;
          console.log("Role Added!");
          viewRoles();
        }
      );
    });
}

function addEmp() {
  inquirer
    .prompt([
      {
        name: "empFirst",
        type: "input",
        message: 'What is the employee"s first name?',
      },
      {
        name: "empLast",
        type: "input",
        message: 'What is the employee"s last name?',
      },
      {
        name: "roleId",
        type: "input",
        message: 'What is the employee"s role id?',
      },
      {
        name: "managerId",
        type: "input",
        message: "what is the employee's manager id?",
      },
    ])
    .then(function (answers) {
      console.log(answers);
      connection.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES             
        ('${answers.empFirst}', '${answers.empLast}', '${answers.roleId}', '${answers.managerId}');`,
        function (error) {
          if (error) throw error;
          console.log("Employee Added!");
          viewAllEmp();
        }
      );
    });
}

function updateEmp() {
  connection.query(
    "SELECT CONCAT(first_name, ' ', last_name) AS employee FROM employee;",
    function (error, res) {
      if (error) throw error;
      const allEmp = res.map(({ employee }) => ({
        name: employee,
      }));

      inquirer
        .prompt({
          name: "empName",
          type: "list",
          message: "Which employee would you like to update?",
          choices: allEmp,
        })
        .then((res) => {
          console.log(res);
        });
    }
  );
}
