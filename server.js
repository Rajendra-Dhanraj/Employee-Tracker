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
          //function call
          break;
        case "Add a Role":
          //function call
          break;
        case "Add an Employee":
          // function call
          break;
        case "Update Employee Role":
          // function call
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
    "SELECT title as role_title, salary, department_name, role_id FROM roles INNER JOIN department ON roles.department_id = department.id INNER JOIN employee ON roles.id = employee.role_id;",
    function (err, res) {
      if (err) throw err;
      console.table("\n", res, "\n");
    }
  );
  start();
};


