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
    if (err) throw err;
    console.log("Connected to DB as " + connection.threadId);
    afterConnection();
});

var store = {

    userItem: null,
    userQty: null,
    itemPrice: null,
    itemStock: null,
    itemName: null,
    itemPrice: null,
    
    reqId() {
        inquirer.prompt(
            {
                type: "input",
                message: "Please enter the ITEM NO. you'd like to purchase:",
                name: "itemNo"
            })
        .then((response) => {

            this.userItem = response.itemNo;
            
            connection.query("SELECT stock_quantity FROM products", (err, res, fields) => {

                if (err) throw err;

                if (res[this.userItem - 1].stock_quantity > 0) {
                    this.reqQty();
                }
                else {
                    this.invCheck();
                }
            });
        });
    },

    reqQty() {
        inquirer.prompt(
            {
                type: "input",
                message: "What quatity would you like to purchase?",
                name: "itemQty"
            })
        .then((response) => {

            this.userQty = response.itemQty;
            this.invCheck();
        });
    },

    invCheck() {

        connection.query("SELECT * FROM products", (err, res, fields) => {
            if (err) throw err;

            this.itemStock = res[this.userItem - 1].stock_quantity;

            if (this.itemStock !== 0) {

                if ((this.itemStock - this.userQty) >= 0) {
                    
                    this.itemStock -= this.userQty;

                    this.itemName = res[this.userItem - 1].product_name;
                    this.itemPrice = res[this.userItem - 1].price;

                    connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: this.itemStock, product_sales: (this.userQty * this.itemPrice)}, {item_id: this.userItem}], (err, res, fields) => {
                        if (err) throw err;

                        console.log("Your order for \'" + this.itemName + "\' has been placed. Thank you!\n");
                        console.log("SALE RECEIPT:");
                        console.log("---------------");
                        console.log(this.userQty + " X " + this.itemName);
                        console.log("Total: $" + (this.userQty * this.itemPrice).toFixed(2) + "\n");

                        inquirer.prompt(
                            {
                                type: "confirm",
                                message: "Would you like to place another order?",
                                name: "newOrder"
                            }
                        ).then((response) => {
                            if (response.newOrder) {
                                afterConnection();
                            }
                            else {
                                console.log("\nHave a great day!")
                                connection.end();
                            }
                        });
                    });
                }

                else {
                    console.log("We currently do not have sufficient stock of \'" + res[this.userItem - 1].product_name + "\' to fill your order. Current Stock: " + this.itemStock + "\n");

                    if (this.itemStock !== 0) {
                        inquirer.prompt(
                            {
                                type: "confirm",
                                message: "Would you like to select a different quantity?",
                                name: "reOrder"
                            }
                        ).then((response) => {

                            if (response.reOrder) {
                                this.reqQty();
                            }
                            else {
                                inquirer.prompt(
                                    {
                                        type: "confirm",
                                        message: "Would you like to place a different order?",
                                        name: "newOrder"
                                    }
                                ).then((response) => {
        
                                    if (response.newOrder) {
                                        afterConnection();
                                    }
                                    else {
                                        console.log("\nHave a great day!");
                                        connection.end();
                                    }
                                });
                            }
                        });
                    } 
                }
            }
        });
    }
}

function afterConnection() {

    connection.query("SELECT * FROM products", (err, res, fields) => {
        if (err) throw err;

        console.log("\nSTORE ITEMS:");
        console.log("---------------");

        for (let i = 0; i < res.length; i++) {

            if (res[i].stock_quantity > 0) {
                console.log(res[i].item_id + ". " + res[i].product_name + " -- " + res[i].price);
            }
            else {
                console.log(res[i].item_id + ". " + res[i].product_name + " -- " + "SOLD OUT");
            }
        }

        console.log("\n");

        store.reqId();
    });
}