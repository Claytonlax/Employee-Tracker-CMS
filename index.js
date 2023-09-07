const inquirer = require("inquirer");
const db = require("./config/connection");
console.log(db);

function menu() {
  inquirer
    .prompt({
      type: "list",
      message: "How would you like to proceed?",
      name: "Menu",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
      ],
    })
    .then((res) => {
      if (res.Menu === "View all departments") {
        viewDepartments();
      }

      if (res.Menu === "View all roles") {
        viewRole();
      }

      if (res.Menu === "View all employees") {
        viewEmployees();
      }

      if (res.Menu === "Add a department") {
        addDepartment();
      }

      if (res.Menu === "Add a role") {
        addRole();
      }

      if (res.Menu === "Add an employee") {
        addEmployee();
      }

      if (res.Menu === "Update an employee role") {
        updateRole();
      }
    });
}

function viewDepartments() {
  db.query("select * from department", (error, data) => {
    if (error) throw error;
    console.table(data);
    menu();
  });
}

function viewRole() {
    var queryString = "select r.title, r.id, d.name as deparment_name, r.salary from role as r"
    queryString += " join department as d on d.id = r.department_id"
  db.query(queryString, (error, data) => {
    if (error) throw error;
    console.table(data);
    menu();
  });
}

function viewEmployees() {
    var queryString = "select e.id, e.first_name, e.last_name, r.title, d.name, r.salary, CONCAT(mgr.first_name, ' ', mgr.last_name) AS manager_name from employees as e"
    queryString += " join role as r on r.id = e.role_id"
    queryString += " join department as d on d.id = r.department_id" 
    queryString += " join employees as mgr on mgr.id = e.manager_id"
    
  db.query(queryString, (error, data) => {
    if (error) throw error;
    console.table(data);
    menu();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDepartment",
        message: "Insert new department name",
      },
    ])
    .then((res) => {
      db.query(
        "Insert into department (name) values (?)",
        [res.newDepartment],
        (error, data) => {
          if (error) throw error;
          console.table(data);
          menu();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newTitle",
        message: "Title of new role",
      },
      {
        type: "input",
        name: "newSalary",
        message: "Input new salary",
      },
      {
        type: "input",
        name: "newDepartmentID",
        message: "Insert department id",
      },
    ])
    .then((res) => {
      db.query(
        "Insert into role (title, salary, department_id) values (?,?,?)",
        [res.newTitle, res.newSalary, res.newDepartmentID],
        (error, data) => {
          if (error) throw error;
          console.table(data);
          menu();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newFirstName",
        message: "Input first name",
      },
      {
        type: "input",
        name: "newLastName",
        message: "Input last name",
      },
      {
        type: "input",
        name: "newRoleID",
        message: "Input new role id",
      },
      {
        type: "input",
        name: "newManagerID",
        message: "Insert manager id",
      },
    ])
    .then((res) => {
      db.query(
        "Insert into employees (first_name, last_name, role_id, manager_id) values (?,?,?,?)",
        [res.newFirstName, res.newLastName, res.newRoleID, res.newManagerID],
        (error, data) => {
          if (error) throw error;
          console.table(data);
          menu();
        }
      );
    });
}

function updateRole() {
  inquirer
    .prompt([
        {
            type: "input",
            name: "selectedEmployee",
            message: "Input employee id to update"
        },
      {
        type: "input",
        name: "newRole",
        message: "New role id",
      }
    ])
    .then((res) => {
      db.query(
        "Update employees set role_id = ? where id = ?",
        [res.newRole, res.selectedEmployee],
        (error, data) => {
          if (error) throw error;
          console.table(data);
          menu();
        }
      );
    });
}

menu();
