<?php 
//add CORS headers
header("Access-Control-Allow-Origin: * ");
header("Access-Control-Allow-Methods: * ");
header("Access-Control-Allow-Headers: * ");
//Get db connection
require_once "../db/db_connect.php";

//Recive POST data from form with superglobal
$name = isset($_POST['name']) ? $_POST['name'] : '';
$description = isset($_POST['description']) ? $_POST['description'] : '';
$quantity = isset($_POST['quantity']) ? $_POST['quantity'] : '';
$price = isset($_POST['price']) ? $_POST['price'] : '';

//Validation
if(empty($name) || empty($price)){
    echo "Name and Price are required";
    exit;
}
//Make sql query
$query = "INSERT INTO products (name, description, quantity, price) VALUES (?, ?, ?, ?)";
$stmt = $connection->prepare($query);

//bind parametrs to query
$stmt->bind_param("ssid",$name, $description, $quantity, $price);
//Error handling
if ($stmt->execute()) {
    echo "Product added successfully!";
} else {
    echo "Error adding product: " . $stmt->error;
}
//close prepared statement
$stmt->close();
//close connection
mysqli_close($connection);
?>