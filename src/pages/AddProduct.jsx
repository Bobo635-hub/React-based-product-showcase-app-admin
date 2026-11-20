// Import React useState to manage form input values
import { useState } from 'react';

// Import the shared API base URL
import { API_URL } from '../api';

// Import component styling
import './AddProduct.css';

// Available product categories displayed in the dropdown
const CATEGORIES = ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Watches', 'Cufflinks'];

// Manage the product form input values using React state
const [name, setName] = useState('');
const [description, setDescription] = useState('');
const [category, setCategory] = useState('');
const [material, setMaterial] = useState('');
const [price, setPrice] = useState('');
const [stock, setStock] = useState('');
const [image, setImage] = useState('');

// Handle form submission and prepare the new product data
  function handleSubmit(e) {

    // Prevent the browser from refreshing the page when the form is submitted
    e.preventDefault();

    // Create an object containing all the product details entered by the user
    const newProduct = {
      name,
      description,
      category,
      material,

      // Convert price and stock from strings into numbers before sending to the API
      price: Number(price),
      stock: Number(stock),
      image,
    };
    // Send a POST request to the backend API to save the new product
    fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      // Convert the API response into JSON format
      .then((res) => res.json())
      .then((data) => {

        // Pass the newly created product to the parent component if onAdd exists
        onAdd?.(data);

        // Clear all form fields after successfully adding the product
        setName('');
        setDescription('');
        setCategory('');
        setMaterial('');
        setPrice('');
        setStock('');
        setImage('');
      });
      return (
    // Display the product form inside a styled card
    <form className="card form-card" onSubmit={handleSubmit}>
      <h2>Add Product</h2>

      {/* Display a short description below the form heading */}
      <p className="Form-subtitle">
        Fill in the details below to add a new product to the store.
      </p>

      {/* Input field for the product name */}
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      {/* Text area for entering the product description */}
      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      {/* Display category and material inputs side by side */}
      <div className="row">
        <div className="field">
          <label htmlFor="category">Category</label>

          {/* Generate dropdown options dynamically from the CATEGORIES array */}
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="material">Material</label>
          <input id="material" value={material} onChange={(e) => setMaterial(e.target.value)} />
        </div>
      </div>

      {/* Display price and stock inputs side by side */}
      <div className="row">
        <div className="field">
          <label htmlFor="price">Price</label>
          <input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="stock">Stock</label>
          <input id="stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
        </div>
      </div>

      {/* Input field for the product image path */}
      <div className="field">
        <label htmlFor="image">Image</label>
        <input id="image" value={image} onChange={(e) => setImage(e.target.value)} />
      </div>

      {/* Display form action buttons */}
      <div className="actions">
        <button type="submit" className="btn btn-primary">Add Product</button>
        <button type="button" className="btn btn-secondary" onClick={() => window.history.back()}>
          Cancel
        </button>
      </div>
    </form>
  )