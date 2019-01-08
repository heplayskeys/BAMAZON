var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect((err) => {
    if(err) throw err;
    console.log("Connected to DB as " + connection.threadId + "\n");
    afterConnection();
});

var manager = {

    action() {

        connection.query("SELECT * FROM products", (err, res, fields) => {

            inquirer.prompt({
                type: "list",
                message: "Please select one of the following:",
                name: "mgmtAction",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
            }).then((response) => {

                switch (response.mgmtAction) {

                    case "View Products for Sale":
                        console.log("\n");
                        for (let i = 0; i < res.length; i++) {
                            console.log((i + 1) + ". " + res[i].product_name + " -- Price: " + res[i].price + " -- Qty: " + res[i].stock_quantity);
                        }
                        console.log("\n");
                        this.action();
                    break;

                    case "View Low Inventory":
                        console.log("The following products are low in stock (< 5):\n");
                        for (let i = 0; i < res.length; i++) {
                            if (res[i].stock_quantity < 5) {
                                console.log(res[i].item_id + ". " + res[i].product_name + " -- Price: " + res[i].price + " -- Qty: " + res[i].stock_quantity);
                            }
                        }
                        console.log("\n");
                        this.action();
                    break;

                    case "Add to Inventory":
                        var products = [];
                        
                        for (let i = 0; i < res.length; i++) {
                            products[i] = res[i].item_id + ". " + res[i].product_name;
                        }

                        inquirer.prompt([
                            {
                                type: "list",
                                message: "Which item would you like to stock?",
                                name: "stockItem",
                                choices: products
                            },
                            {
                                type: "input",
                                message: "How many would you like to stock?",
                                name: "stockAmount"
                            }
                        ]).then((response) => {
                            var stockId = (response.stockItem).substr(0, (response.stockItem).indexOf("."));
                            var stockCnt = parseInt(response.stockAmount) + parseInt(res[stockId - 1].stock_quantity);

                            connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: stockCnt}, {item_id: stockId}], (err, res, fields) => {
                                if (err) throw err;
                                console.log("\nProduct inventory has been updated.\n");
                                manager.action();
                            });
                        });
                    break;

                    case "Add New Product":
                        inquirer.prompt([
                            {
                                type: "input",
                                message: "Enter product name:",
                                name: "prodName"
                            },
                            {
                                type: "input",
                                message: "Enter department name:",
                                name: "prodDept"
                            },
                            {
                                type: "input",
                                message: "Enter price:",
                                name: "prodPrice"
                            },
                            {
                                type: "input",
                                message: "Enter inventory count:",
                                name: "prodStock"
                            }
                        ]).then((response) => {
                            connection.query("INSERT INTO products SET ?", {product_name: response.prodName, department_name: response.prodDept, price: response.prodPrice, stock_quantity: response.prodStock}, (err, res, fields) => {
                                if (err) throw err;
                                console.log("\nProduct has been added into inventory.\n");
                                manager.action();
                            });
                        });
                    break;

                    case "Exit":
                        console.log("\nHave a great day!");
                        connection.end();
                    break;
                }
            });
        });
    }

}

function afterConnection() {
    
    manager.action();
}