

import { useState } from 'react';
import { API_URL } from '../api';
import './AddProduct.css';

// Available product categories
const CATEGORIES = [
  'Rings',
  'Necklaces',
  'Earrings',
  'Bracelets',
  'Watches',
  'Cufflinks',
];

function AddProduct({ onAdd }) {
  // Manage each product input value using React state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [material, setMaterial] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState('');

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    // Prepare the new product data
    const newProduct = {
      name,
      description,
      category,
      material,
      price: Number(price),
      stock: Number(stock),
      image,
    };

    // Send product data to the backend
    fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to add product');
        }
        return res.json();
      })
      .then((data) => {
        // Notify the parent component
        onAdd?.(data);

        // Clear all form fields
        setName('');
        setDescription('');
        setCategory('');
        setMaterial('');
        setPrice('');
        setStock('');
        setImage('');
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });
  }

