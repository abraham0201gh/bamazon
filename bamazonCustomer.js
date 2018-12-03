// Already Installed: (1) NPM init -y  (to get package.JSON)  (2) NPM mysql (connects node to mysql server)  (3) NPM inquirer

// Require these libraries
var mysql = require("mysql");
var inquirer = require("inquirer");

// Create way to connect to server 
var connection = mysql.createConnection({
    host: "localhost",
    // Our Port or try 8080
    port: "3306",
    // Username
    user: "root",
    // Info for connection to MySQL Workbench
    password: "3edc#EDC",
    // MySQL Database
    database: "bamazonDB"    
});

// Making the actual connection to server and test for errors then call function to display bamazon database products table
  connection.connect(function(err) {
    if (err) throw err;
//  console.log("connected as id " + connection.threadId);
//connection.end();
    console.log("")
  runQueries();
  });

  // Setting variables for string spacing adjustment within the table columns
  var spaces1 = "        ";
  var spaces2 = "                      ";
  var adjusted = "";
  var adjusted1 = ""; 
  // Code to also display department name column
//var adjusted2 = "";
  var adjusted3 = "";
  // Code to also display stock quantity column
//var adjusted4 = "";

  // Display the products table to the terminal from the MySQL bamazonDB database
  function runQueries(){
    console.log("");
    console.log("========---WELCOME TO BAMAZON---========")
//  console.log("====================---WELCOME TO BAMAZON---====================")
//  console.log("============================---WELCOME TO BAMAZON---============================")
    console.log("");
    connection.query("SELECT * FROM products", function(err, res, fields){
    // console.log(res);
    console.log((fields[0].name + "  "), (fields[1].name + "           "), (fields[3].name));
    console.log("-------   ------------            -----");
//  console.log((fields[0].name + "  "), (fields[1].name + "           "), (fields[2].name + "        "), (fields[3].name));
//  console.log("-------   ------------            ---------------         -----");
//  console.log((fields[0].name + " "), (fields[1].name + "          "), (fields[2].name + "       "), (fields[3].name + "     "), (fields[4].name));
//  console.log("-------  ------------           ---------------        -----      --------------");

    // Output each response (each specific column) to do something with the response (in this case it's to console.log out r in each response).  This arrow function:-- res.forEach(r => {  --is same as---  res.forEach(function(r)  ---.
    res.forEach(function(r){

      // Setting all to strings to be able to properly space, in particular, the integers within the columns
      s = r.item_id.toString();      
      s1 = r.product_name.toString();
      // Code to also display department name column      
//    s2 = r.department_name.toString();
      s3 = r.price.toString();          
      // Code to also display stock quantity column
//    s4 = r.stock_quantity.toString();

      // Concatenating the strings with spaces to manipulate within the column without spacing distortions
      adjusted = s + spaces1.slice(s.length); 
      adjusted1 = s1 + spaces2.slice(s1.length);
      // Code to also display department name column 
//    adjusted2 = s2 + spaces2.slice(s2.length); 
      adjusted3 = s3 + spaces1.slice(s3.length); 
      // Code to also display stock quantity column
//    adjusted4 = s4 + spaces1.slice(s4.length); 

      // Diplaying the properly aligned table (four columns required: item id, product name, department, price)
      // Note: Use of backtick (not single quotes)
      console.log(`${adjusted}  ${adjusted1}  ${adjusted3}`);
      // Code to also display department name column
//    console.log(`${adjusted}  ${adjusted1}  ${adjusted2}  ${adjusted3}`);
      // Code to also display stock quantity column
//    console.log(`${adjusted} | ${adjusted1} | ${adjusted2} | ${adjusted3} | ${adjusted4}`);
    })
    console.log("\n");
    purchaseSelection();
  })
}


// Ask customer to enter proudct ID and quantity
function purchaseSelection(){
  inquirer.prompt([{
    name: "product_id",
    type: "input",
    message: "Please enter the item ID number of the product you would like to buy:"  
  },    

  {
    name: "product_quantity",
    type: "input",
    message: "How many would you like to purchase?"
  }
  ])

  // Collect and store usser responses
  .then(function(answers) {

    var IdSelected = answers.product_id; 
    var quantitySelected = answers.product_quantity; 
//  console.log(quantitySelected);

    // Query bamazonDB database to determine if sufficient product units are available 
    connection.query("SELECT * FROM products WHERE item_id=?", [IdSelected], function(err, res){
    //console.log(res);

      // Compare user product quantity selected with available supplies in the products table
       if (answers.product_quantity > res[0].stock_quantity){
        console.log("\n")
        console.log("  The quantity you requested is not currently available.  Please consider ordering fewer units. \n  Thank You.");

        // Six second delay for user to read the out-of-stock comment.  Then user is prompted again with the table of products.
        setTimeout(function(){runQueries()}, 6000);
      }
      else {
        // Update the products table with new inventory amount.
        var updatedQuantity = res[0].stock_quantity - quantitySelected; 
        updateDatabase(IdSelected, updatedQuantity);
        console.log("\n");
        console.log("   --  The updated inventory for this product: " + updatedQuantity + " remaining  --   "); 
        console.log(""); 

        // Compute the user's total purchase cost.
        var totalCost = res[0].price * quantitySelected;         
        console.log("*****  Thank You For Your Order.  The total purchase amount is: " + "$" + totalCost + "  *****");  
        console.log("\n");
        //console.log("");
//      connection.end();
      }   
    }) 
  })
}


// Update stock_quantity column in database table.  Input item afffected by update and input change in invetory number.   
function updateDatabase(IdSelected, updatedQuantity) {
  connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [updatedQuantity, IdSelected], function(err, result){
    if (err) throw err;
    // Displays number of records updated
//   console.log(result.affectedRows + " record(s) updated");
    // Displays new inventory count
//  console.log(updatedQuantity);

  // User is given 20 seconds to review the total purchase cost and then is prompted again with the table of products.  
  setTimeout(function(){runQueries()}, 20000);
  })
}


