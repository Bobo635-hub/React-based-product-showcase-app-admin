// Import React useState to manage form input values
import { useState } from 'react';

// Import the shared API base URL
import { API_URL } from '../api';

// Import component styling
import './AddProduct.css';

// Available product categories displayed in the dropdown
const CATEGORIES = ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Watches', 'Cufflinks'];

// Manage product form values using React state
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