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

var userItem;
var userQty;

function reqId() {
    inquirer.prompt(
        {
            type: "input",
            message: "Please enter the ITEM NO. you'd like to purchase:",
            name: "itemNo"
        })
    .then((response) => {

        userItem = response.itemNo;
        console.log(userItem);
        reqQty();
    });
}

function reqQty() {
    inquirer.prompt(
        {
            type: "input",
            message: "What quatity would you like to purchase?",
            name: "itemQty"
        })
    .then((response) => {

        userQty = response.itemQty;
        console.log(userQty);
    });
}

function afterConnection() {

    connection.query("SELECT item_id, product_name, price FROM products", (err, res, fields) => {
        if (err) throw err;

        for (let i = 0; i < res.length; i++) {
            console.log(res[i].item_id + ". " + res[i].product_name + " -- " + res[i].price);
        }

        console.log("\n");

        reqId();
    });
}