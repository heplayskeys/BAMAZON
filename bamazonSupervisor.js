var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to DB as " + connection.threadId + "\n");
    afterConnection();
});

var supervisor = {
    
    action() {
        inquirer.prompt({
            type: "list",
            message: "Please select one of the following:",
            name: "superAction",
            choices: ["View Product Sales by Department", "Create New Department", "Exit"]
        }).then((response) => {

            switch (response.superAction) {

                case "View Product Sales by Department":
                    connection.query("SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales FROM departments LEFT JOIN products ON departments.department_name = products.department_name GROUP BY department_id", (err, res, fields) => {
                        if (err) throw err;

                        for (let i = 0; i < res.length; i++) {
                            res[i].total_profit = (res[i].product_sales - res[i].over_head_costs);
                        }

                        console.log("\n");

                        var table = cTable.getTable(
                            res
                        );

                        console.log(table);
                        supervisor.action();
                    });
                break;

                case "Create New Department":
                    inquirer.prompt([
                        {
                            type: "input",
                            message: "Please enter department name:",
                            name: "deptName"
                        },
                        {
                            type: "input",
                            message: "Enter new department overhead costs:",
                            name: "deptCost"
                        }
                    ]).then((response) => {
                        connection.query("INSERT INTO departments SET ?", {department_name: response.deptName, over_head_costs: response.deptCost}, (err, res, fields) => {
                            if (err) throw err;
                            console.log("\nNew department has been added!\n");
                            supervisor.action();
                        });
                    });
                break;

                case "Exit":
                    connection.end();
                break;
            }
        });
    }
}

function afterConnection() {
    supervisor.action();
}