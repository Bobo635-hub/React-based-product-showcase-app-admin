
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../api';
import './AddProduct.css';

const CATEGORIES = [
  'Rings',
  'Necklaces',
  'Earrings',
  'Bracelets',
  'Watches',
  'Cufflinks',
];

function AddProduct({ onAdd }) {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [material, setMaterial] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // Validate the form
    if (
      !name.trim() ||
      !description.trim() ||
      !category ||
      !material.trim() ||
      price === '' ||
      stock === '' ||
      !image.trim()
    ) {
      setError('Please fill in all product fields.');
      return;
    }

    if (
      !Number.isFinite(Number(price)) ||
      Number(price) < 0 ||
      !Number.isInteger(Number(stock)) ||
      Number(stock) < 0
    ) {
      setError('Enter a valid price and a non-negative whole number for stock.');
      return;
    }

    const newProduct = {
      name: name.trim(),
      description: description.trim(),
      category,
      material: material.trim(),
      price: Number(price),
      stock: Number(stock),
      image: image.trim(),
    };

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Failed to add product. Please try again.');
      }

      const savedProduct = await response.json();

      // Notify the parent if a callback is provided
      if (typeof onAdd === 'function') {
        onAdd(savedProduct);
      }

      // Return to the products page after saving
      navigate('/products');
    } catch (err) {
      setError(
        err.message || 'Unable to connect to the server. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <h2>Add Product</h2>

      <p className="Form-subtitle">
        Fill in the details below to add a new product to the store.
      </p>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <div className="field">
        <label htmlFor="name">Product Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the product"
          required
        />
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>

            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="material">Material</label>
          <input
            id="material"
            type="text"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            placeholder="e.g. Gold, Silver"
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            type="number"
            min="0"
            step="1"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Available quantity"
            required
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="image">Product Image URL</label>
        <input
          id="image"
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://example.com/image.jpg"
          required
        />
      </div>

      {image.trim() && (
        <div className="image-preview">
          <p>Image Preview</p>
          <img
            src={image}
            alt="Product preview"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            onLoad={(e) => {
              e.currentTarget.style.display = 'block';
            }}
          />
        </div>
      )}

      <div className="actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          disabled={loading}
          onClick={() => navigate('/products')}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AddProduct;

