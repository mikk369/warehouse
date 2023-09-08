<?php
include "db_config.php";
$connection = mysqli_connect($host . ":" . $port, $userName, $password, $database);

// if ($connection) {
//     echo "Connected to database";
// } else {
//     echo "Database Connection failed: " . mysqli_connect_error();
// }
?>
