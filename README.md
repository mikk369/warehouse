# Warehouse Project

- [Clone] app to computer:

1. git clone https://github.com/mikk369/warehouse.git
2. cd to warehouse folder
3. Make npm install to get dependencies
4. To start React development server: npm start

- [XAMPP](https://www.apachefriends.org/index.html) XAMPP for apatche and SQL.

1. Start XAMPP server and ensure that Apache and MySQL are running.
2. Open PHPMyAdmin by visiting http://localhost/phpmyadmin in your browser.
3. Import database [warehouse.sql] from databaseDump folder.
4. start the PHP backend server on port [8000]
5. php -S localhost:8000

## Approach

## Project structure:

    I used React for the frontend and PHP for the backend. The App itself is for managing list of
    products with features of adding,editing products with sort functionality.

## Frontend

    to build frontend i used React:

- [GetProduct]: This component retrieves and displays a list of products. It includes a dropdown menu to
  select sorting options (e.g., by price or quantity). Sorting options trigger API requests to fetch
  products in the desired order.

- [AddProducts]: This component allows users to add new products by submitting a form. After a
  product is added, the user is redirected to the product list.

- [EditProducts]: This component enables users to edit existing product details. It retrieves the current
  product data based on the product ID and allows users to update the information.

## Backend:

    The backend of the project is implemented in PHP, serving as a RESTful API to interact with the MySQL database.

- [add_products.php]: This script handles POST requests to add new products to the database.

- [get_products.php]: This script handles GET requests to retrieve a list of products from the database.
  It includes logic to sort the products based on the provided sorting.

- [update_products.php]: This script handles PATCH requests to update product details in the database.
