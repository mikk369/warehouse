<?php
//add CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// Include the database connection
require_once "../db/db_connect.php";
// if the incoming request method is OPTIONS it, immediately returns 0 otherwise getting CORS error
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {    
    return 0;    
}   else {
    // Check if the request is a PATCH request
     if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
         // Get the raw JSON data from the request body
    $json_data = file_get_contents('php://input');
    
    // Attempt to decode the JSON data
    $data = json_decode($json_data, true);
    
    // Extract data from the decoded JSON
    $id = isset($data['id']) ? $data['id'] : '';
    $name = isset($data['name']) ? $data['name'] : '';
    $description = isset($data['description']) ? $data['description'] : '';
    $quantity = isset($data['quantity']) ? $data['quantity'] : '';
    $price = isset($data['price']) ? $data['price'] : '';
    
    // Validate the data
        if (empty($id) || empty($name) || empty($price)) {
            http_response_code(400); // Bad Request
            echo "ID, Name, and Price are required";
        } else {
            // Update the product in the database
            $query = "UPDATE products SET name=?, description=?, quantity=?, price=? WHERE id=?";
            $stmt = $connection->prepare($query);
            $stmt->bind_param("ssisi", $name, $description, $quantity, $price, $id);
            // execute the statement 
            if ($stmt->execute()) {
                echo "Product updated successfully!";
            } else {
                echo "Error updating product: " . $stmt->error;
            }
            
            // Close the prepared statement
            $stmt->close();
        }
        
        // Close the database connection
        mysqli_close($connection);
    } else {
        http_response_code(405); // Method Not Allowed
        echo "Invalid request method!";
    }
    
}
    ?>
