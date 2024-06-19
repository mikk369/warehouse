import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Getproducts() {
  // Define a variable to hold the API URL
  let apiUrl = 'https://wareback.webcodes.ee/api/get_products.php';
  const [products, setProducts] = useState([]);

  // State to manage sorting options
  const [sortBy, setSortBy] = useState(''); // Initially no sorting

  // Update the 'sortBy' state when the sorting option changes
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };
  // Update the apiUrl based on the selected sorting option
  if (sortBy === 'price_asc') {
    apiUrl += '?sortBy=price_asc';
  } else if (sortBy === 'price_desc') {
    apiUrl += '?sortBy=price_desc';
  } else if (sortBy === 'quantity_asc') {
    apiUrl += '?sortBy=quantity_asc';
  } else if (sortBy === 'quantity_desc') {
    apiUrl += '?sortBy=quantity_desc';
  }
  useEffect(() => {
    // Use the 'useEffect' hook to fetch data from the API when 'apiUrl' or component mounts
    axios.get(apiUrl).then(function (response) {
      // Set the products in state with the data fetched from the API
      setProducts(response.data);
    });
    // The effect will run whenever 'apiUrl' changes
  }, [apiUrl]);
  return (
    <div className="getProducts">
      <h1>List of added products</h1>
      <label className="sortByMenu">
        <>
          <Link to="/AddProducts">
            <button className="addProductButton">AddProducts</button>
          </Link>
        </>
        <span>Sort by: </span>
        <select value={sortBy} onChange={handleSortChange} className="sortSelect">
          <option value="">-- Select Sorting --</option>
          <option value="price_asc">Price (Ascending)</option>
          <option value="price_desc">Price (Descending)</option>
          <option value="quantity_asc">Quantity (Ascending)</option>
          <option value="quantity_desc">Quantity (Descending)</option>
        </select>
      </label>

      <ul className="unorderedList">
        {/* Map through the 'products' array and render each product */}
        {products.map((product) => (
          <li key={product.id} className="listItems">
            <div>Name: {product.name}</div>
            <div>Description: {product.description}</div>
            <div>Quantity: {product.quantity}</div>
            <div>Price: {product.price}</div>
            <div className="editButtonWrapper">
              {/* Create a link to edit the product with its unique 'id' */}
              <Link to={`/EditProduct/${product.id}`} className="link">
                <button className="editButton">Edit</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Getproducts;
