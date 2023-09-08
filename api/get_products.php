<?php
//add CORS headers
header("Access-Control-Allow-Origin: * ");
header("Access-Control-Allow-Methods: * ");
header("Access-Control-Allow-Headers: * ");

//Get db connection
require_once '../db/db_connect.php';

// Get the sortBy parameter from the request
$sortBy = isset($_GET['sortBy']) ? $_GET['sortBy'] : '';

// Query products from the database based on the sortBy parameter
if ($sortBy === 'price_asc') {
    $query = "SELECT * FROM products ORDER BY price ASC";
} elseif ($sortBy === 'price_desc') {
    $query = "SELECT * FROM products ORDER BY price DESC";
} elseif ($sortBy === 'quantity_asc') {
    $query = "SELECT * FROM products ORDER BY quantity ASC";
} elseif ($sortBy === 'quantity_desc') {
    $query = "SELECT * FROM products ORDER BY quantity DESC";
} else {
    $query = "SELECT * FROM products";
}

//Send a query to the MySQL database
$result = mysqli_query($connection, $query);
//If no result show error
if (!$result) {
    die("Database query failed: " . mysqli_error($connection));
}
// Encode the result directly to JSON and echo it
echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC));
//Close connection
mysqli_close($connection);
?>
