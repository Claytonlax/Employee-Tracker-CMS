const inquirer = require("inquirer");
const db = require("./config/connection");
console.log(db)

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
    //   if (res.Menu === "View all employees") {
    //     viewEmployees();
    //   }

    if (res.Menu === "Add a department"){
        addDepartment()
    }
    if (res.Menu === "Add a role"){
        addRole()
    }
    if (resMenu === "Add an employee"){
        addEmployee()
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
    db.query("select * from role", (error, data) => {
      if (error) throw error;
      console.table(data);
      menu();
    });
  }
  
  
function viewEmployees() {
    db.query("select * from employees", (error, data) => {
      if (error) throw error;
      console.table(data);
      menu();
    });
  }

  function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "newDepartment",
            message: "Insert new department name"
        }
    ]).then (res=> {
        db.query("Insert into department (name) values (?)", [res.newDepartment], (error, data) => {
            if (error) throw error;
            console.table(data);
            menu();
          });
    })
  }

  function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "newTitle",
            message: "Title of new role"
        },
        {
            type: "input",
            name: "newSalary",
            message: "Input new salary"
        },
        {
            type: "input",
            name: "newDepartmentID",
            message: "Insert department ID"
        }
    ]).then (res=> {
        db.query("Insert into role (title, salary, department_id) values (?,?,?)", [res.newTitle, res.newSalary, res.newDepartmentID], (error, data) => {
            if (error) throw error;
            console.table(data);
            menu();
          });
    })
  }

  function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "newFirstName",
            message: "Input first name"
        },
        {
            type: "input",
            name: "newLastName",
            message: "Input last name"
        },
        {
            type: "input",
            name: "newRoleID",
            message: "Input new role ID"
        },
        {
            type: "input",
            name: "newManagerID",
            message: "Insert manager ID"
        },

    ]).then (res=> {
        db.query("Insert into employees (first_name, last_name, role_id, manager_id) values (?,?,?,?)", [res.newFirstName, res.newLastName, res.newRoleID, res.newManagerID], (error, data) => {
            if (error) throw error;
            console.table(data);
            menu();
          });
    })
}


menu();
