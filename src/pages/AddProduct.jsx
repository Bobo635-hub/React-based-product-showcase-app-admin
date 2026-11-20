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

export default function AddProduct({ onAdd, onCancel }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [material, setMaterial] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState('');

  function resetForm() {
    setName('');
    setDescription('');
    setCategory('');
    setMaterial('');
    setPrice('');
    setStock('');
    setImage('');
  }

  function handleCancel() {
    resetForm();
    onCancel?.();
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newProduct = {
      name,
      description,
      category,
      material,
      price: Number(price),
      stock: Number(stock),
      image,
    };

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
        onAdd?.(data);
        resetForm();
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });
  }

  return (
    <div className="add-product-page">
      <div className="add-product-wrapper">
        <div className="add-product-header">
          <h2>Add product</h2>
          <p className="add-product-subtitle">Add a new item to the store catalog.</p>
        </div>

        <form className="add-product-form" onSubmit={handleSubmit}>
          <label className="form-field">
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="form-field">
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          <div className="form-row-two">
            <label className="form-field">
              Category
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-field">
              Material
              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="form-row-two">
            <label className="form-field">
              Price (USD)
              <input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>

            <label className="form-field">
              Stock
              <input
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </label>
          </div>

          <label className="form-field">
            Image URL
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </label>

          <div className="add-product-actions">
            <button type="submit" className="btn-submit">
              Add product
            </button>
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}