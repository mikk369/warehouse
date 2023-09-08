import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';

function Addproducts() {
  // Get the current location from React Router
  const location = useLocation();
  // Check if the current location is the main page
  const isMainPage = location.pathname === '/';
  // Create a navigate function to control routing
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    quantity: '',
    price: '',
  });

  const handleChange = (e) => {
    // Destructure the 'name' and 'value' properties from the input element
    const { name, value } = e.target;
    setInputs({
      // Create a copy of the current 'inputs' state
      ...inputs,
      // Update the specified input field with the new value
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior (page reload)
    e.preventDefault();
    // Create a new FormData object to store form data
    const formData = new FormData();
    for (const key in inputs) {
      // Add each input field and its value to the FormData
      formData.append(key, inputs[key]);
    }

    try {
      // Send a POST request to add a new product with form data
      await axios.post('http://localhost:8000/api/add_products.php', formData);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="addProducts">
      <h1>Add products</h1>
      <form onSubmit={handleSubmit} className="addProductForm">
        <label>Name: </label>
        <input type="text" name="name" onChange={handleChange} />
        <label>Description: </label>
        <input type="text" name="description" onChange={handleChange} />
        <label>Quantity: </label>
        <input type="number" name="quantity" onChange={handleChange} />
        <label>Price: </label>
        <input type="text" name="price" onChange={handleChange} />
        <div className="buttonWrapper">
          <button className="addProductButton">Add</button>
          {/* hide back button when on main page  */}
          {!isMainPage && (
            <Link to="/">
              <button className="addProductBackButton">back</button>
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}

export default Addproducts;
