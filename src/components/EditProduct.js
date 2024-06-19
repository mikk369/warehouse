import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function EditProduct() {
  // Create a navigate function to control routing
  const navigate = useNavigate();
  // Access the 'id' parameter from the URL
  const { id } = useParams();

  const [product, setProduct] = useState({
    id: '',
    name: '',
    description: '',
    quantity: 0,
    price: 0,
  });

  //Fetch the product data when the component mounts or when 'id' changes
  useEffect(() => {
    axios
      .get(`https://wareback.webcodes.ee/api/get_products.php`)
      .then((response) => {
        const allProducts = response.data;

        // Find the product with the specified ID
        const currentProduct = allProducts.find((item) => item.id === id);

        if (currentProduct) {
          // Set the current product's data into the product state
          setProduct({
            id: currentProduct.id,
            name: currentProduct.name,
            description: currentProduct.description,
            quantity: currentProduct.quantity,
            price: currentProduct.price,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert the product object to JSON
    const jsonData = JSON.stringify(product);
    // Send a PATCH request to update the product with the specified 'id'
    axios
      .patch(`http://localhost:8000/api/update_products.php/${id}`, jsonData)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="editProduct">
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit} className="editProductForm">
        <label>Name: </label>
        <input type="text" name="name" onChange={handleChange} value={product.name} />
        <label>Description: </label>
        <input type="text" name="description" onChange={handleChange} value={product.description} />
        <label>Quantity: </label>
        <input type="number" name="quantity" onChange={handleChange} value={product.quantity} />
        <label>Price: </label>
        <input type="text" name="price" onChange={handleChange} value={product.price} />
        <div className="button-wrapper">
          <button className="editProductButton">edit</button>
          <Link to="/">
            <button className="editBackButton">Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
