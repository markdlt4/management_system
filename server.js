var mysql = require("mysql");
var inquirer = require("inquirer");
const { create } = require("domain");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "rootroot",
    database: "employee_management"
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});
function start() {
    console.log("HI");
}
function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add departments",
                "Add roles",
                "Add employees",
                "View departments",
                "View roles",
                "View employees",
                "Update employee roles",
                "exit",
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Add departments":
                    createDepartment();
                    //console.log("Add departments")
                    break;

                case "Add roles":
                    createRoles();
                   // console.log("Add roles")
                    break;

                case "Add employees":
                    createEmployees();
                    //console.log("Add employees")
                    break;

                case "View departments":
                    viewDepartments();
                    //songSearch();
                    //console.log("View departments")
                    break;

                case "View roles":
                    viewRole();
                    //songSearch();
                    //console.log("View roless")
                    break;

                case "View employees":
                    viewEmployee();
                    //songSearch();
                    //console.log("View employees")
                    break;

                case "Update employee roles":
                    updateEmployeeRoles();
                    //songSearch();
                    //console.log("Update employee roles")
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
}
function createDepartment() {
    console.log("Add department");
    inquirer
    .prompt({
        name: "departmentName",
        type: "input",
        message: "What department would you like to add?"
    })
    .then(function (answer) {
        var query = connection.query(
            "INSERT INTO department SET ?",
            {
              name: answer.departmentName
            },
            function(err, res) {
              if (err) throw err;
              console.log(res.affectedRows + " Department Created");
              // Call updateProduct AFTER the INSERT completes
            }
          );
            runSearch();
        });
  }
  function createRoles() {
    //console.log("Add roles");
    inquirer
    .prompt([{
        name: "roleName",
        type: "input",
        message: "What role would you like to add?"
    },
    {
        name: "salary",
        type: "input",
        message: "How much is your salary?"
    },
    { 
        name: "department_id",
        type: "input",
        message: "What is your department id?"
    }
])
    .then(function (answer) {
        var query = connection.query(
            "INSERT INTO role SET ?",
            {
              title: answer.roleName,
              salary: answer.salary,
              department_id: answer.department_id
            },
            function(err, res) {
              if (err) throw err;
              console.log(res.affectedRows + " Role Created");
              // Call updateProduct AFTER the INSERT completes
            }
          );
            runSearch();
        });
  }
  function createEmployees() {
    console.log("Add employees");
    inquirer
    .prompt([{
        name: "first_name",
        type: "input",
        message: "What is your first name?"
    },
    {
        name: "last_name",
        type: "input",
        message: "What is your last name?"
    },
    {
        name: "roll_id",
        type: "input",
        message: "What is your roll id?"
    }])
    .then(function (answer) {
        var query = connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: answer.first_name,
              last_name: answer.last_name,
              roll_id: answer.roll_id,
             // manager_id: answer.manager_id

            },
            function(err, res) {
              if (err) throw err;
              console.log(res.affectedRows + " Employee Created");
              // Call updateProduct AFTER the INSERT completes
            }
          );
            runSearch();
        });
  }
  function viewDepartments() {
   // console.log("Add department");
        var query = connection.query(
            "SELECT * FROM department",
            function(err, res) {
              if (err) throw err;
              console.log(res);
              runSearch();
              // Call updateProduct AFTER the INSERT completes
            }
          );
  }
  function viewRole() {
   // console.log("Add department");
        var query = connection.query(
            "SELECT * FROM role",
            function(err, res) {
              if (err) throw err;
              console.log(res);
              runSearch();
              // Call updateProduct AFTER the INSERT completes
            }
          );
  }
  function viewEmployee() {
    // console.log("Add employee");
         var query = connection.query(
             "SELECT * FROM employee",
             function(err, res) {
               if (err) throw err;
               console.log(res);
               runSearch();
               // Call updateProduct AFTER the INSERT completes
             }
           );
   }
   function updateEmployeeRoles() {
    //console.log("Updating all Rocky Road quantities...\n");
    inquirer
    .prompt([{
        name: "employee_id",
        type: "input",
        message: "What is the employees ID that you want to update?"
    },
    {
        name: "roll_id",
        type: "input",
        message: "What is your roll id?"
    }])
    .then(function (answer) {
        var query = connection.query(
            "UPDATE employee SET ? WHERE ?",
            [
              {
                roll_id: answer.roll_id
              },
              {
                id: answer.employee_id
              }
            ],
            function(err, res) {
              if (err) throw err;
              console.log(res.affectedRows + " employee updated!\n");
              // Call deleteProduct AFTER the UPDATE completes
            }
          );
            runSearch();
        });
    }
function artistSearch() {
    inquirer
        .prompt({
            name: "artist",
            type: "input",
            message: "What artist would you like to search for?"
        })
        .then(function (answer) {
            var query = connection.query(
                "INSERT INTO department SET ?",
                {
                  name: 50
                },
                function(err, res) {
                  if (err) throw err;
                  console.log(res.affectedRows + " product inserted!\n");
                  // Call updateProduct AFTER the INSERT completes
                  updateProduct();
                }
              );
                runSearch();
            });
 //       });
}

function multiSearch() {
    var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].artist);
        }
        runSearch();
    });
}

function rangeSearch() {
    inquirer
        .prompt([
            {
                name: "start",
                type: "input",
                message: "Enter starting position: ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "end",
                type: "input",
                message: "Enter ending position: ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
            connection.query(query, [answer.start, answer.end], function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    console.log(
                        "Position: " +
                        res[i].position +
                        " || Song: " +
                        res[i].song +
                        " || Artist: " +
                        res[i].artist +
                        " || Year: " +
                        res[i].year
                    );
                }
                runSearch();
            });
        });
}

function songSearch() {
    inquirer
        .prompt({
            name: "song",
            type: "input",
            message: "What song would you like to look for?"
        })
        .then(function (answer) {
            console.log(answer.song);
            connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function (err, res) {
                if (err) throw err;
                console.log(
                    "Position: " +
                    res[0].position +
                    " || Song: " +
                    res[0].song +
                    " || Artist: " +
                    res[0].artist +
                    " || Year: " +
                    res[0].year
                );
                runSearch();
            });
        });
}
