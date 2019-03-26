# BAMAZON

**Bamazon** is everything your one-stop-online-shop!

You will be Bamazed!


**The following inputs are valid:**
1. node bamazonCustomer.js
    - *result:* User will be provided a list of available items in the Bamazon store. Using the item number listed, the customer can select an item to purchase and enter the quantity they'd like to purchase.
    
    *See below for a successful purchase and for a failed purchase, due to insufficient quantity:*
    
    ![Successful Purchase](/images/image1.PNG)
    - Here, the customer has placed a successful order by entering the item number and quantity desired. Since the Bamazon store has adequate stock, the purchase completes, a reciept is displayed and the customer can move on.

    ![Failed Purchase](/images/image2.PNG)
    - When the customer encounters a failed purchase, the Bamazon store will notify the customer of the insufficient stock to accommodate the order. Additionally, should there be stock available, the customer will be provided with the current stock count and the ability to adjust their desired quantity.

2. node bamazonManager.js
    - *result:* Manager can 'View Products for Sale,' 'View Low Inventory,' 'Add to Inventory,' and 'Add New Product.'

    *See below for the execution of the above listed tasks:*

    ![View Products for Sale](/images/image3.PNG)
    - A manager can select to view all products for sale, which will display a list of all items available in the store, displaying name, price, and quantity.

    ![View Low Inventory](/images/image4.PNG)
    - Viewing low inventory items in the store will return a list of all items at Bamazon, which have less than 5 counts remaining in stock.

    ![Add to Inventory](/images/image5.PNG)
    - Managers can replenish the inventory count of a selected product within the store. This can be done to previously highly demanded items, which have a depleted stock count or to items that are currently abundant in the store.

    ![Add New Product](/images/image6.PNG)
    - When a new product is added, a manager can declare a product name, price, department (in which the product will be categorized), and a stock count.

3. node bamazonSupervisor.js
    - *result:* Supervisor can 'View Product Sales by Department' and 'Create New Department'

    *See below for the execution of the above listed tasks:*

    ![View Product Sales by Department](/images/image7.PNG)
    - When a supervisor elects to view product sales by department, a table is shown, displaying departments by name, its overhead, revenue, and profit.

    ![Create New Department](/images/image8.PNG)
    - Supervisors can create new departments to categorize newly added products in the Bamazon store. When setting up the new department, Supervisors are asked to input the department name and overhead costs.