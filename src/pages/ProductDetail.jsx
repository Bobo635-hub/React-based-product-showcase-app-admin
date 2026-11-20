// OWNER: feature/product-detail-admin
// TODO: read :id with useParams, show the product, PATCH to edit, DELETE to remove.
import { useState } from 'react';
import { useParams } from 'react-router-dom';
// Shared API base URL and fetch hook already used in App.jsx
import { API_URL } from '../api';
import useFetch from '../hooks/useFetch';
// Reuse the form-card styles from the Add Product page
import './AddProduct.css';
import './ProductDetail.css';

// Categories shown in the dropdown (same list as Add Product)
const CATEGORIES = ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Watches', 'Cufflinks'];

// Add ProductDetail component (receives the product as a prop, so tests can render it directly)
function ProductDetail({ product }) {
  // Add form state, pre-filled from the product (hooks must run before any early return)
  const [name, setName] = useState(product?.name ?? '');
  const [description, setDescription] = useState(product?.description ?? '');
  const [category, setCategory] = useState(product?.category ?? '');
  const [material, setMaterial] = useState(product?.material ?? '');
  const [price, setPrice] = useState(product?.price ?? '');
  const [stock, setStock] = useState(product?.stock ?? '');
  const [image, setImage] = useState(product?.image ?? '');

  // Add fallback text to ProductDetail
  if (!product) {
    return <p>No product details available</p>;
  }

  // Add handleSave: send PATCH request to json-server with the edited values
  function handleSave(e) {
    // Stop the browser from reloading the page
    e.preventDefault();

    fetch(`${API_URL}/products/${product.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description,
        category,
        material,
        // Inputs return strings, so convert these to numbers
        price: Number(price),
        stock: Number(stock),
        image,
      }),
    });
  }

  // Add handleDelete: send DELETE request, then go back to the products list
  function handleDelete() {
    fetch(`${API_URL}/products/${product.id}`, { method: 'DELETE' }).then(() => {
      window.location.href = '/products';
    });
  }

  return (
    // Page wrapper: breadcrumb on top, two columns below
    <div className="detail-page">
      {/* Breadcrumb back to the products list */}
      <nav className="breadcrumb">
        <a href="/products">Products</a> / <span>{product.name}</span>
      </nav>

      {/* Two-column layout: image on the left, edit form on the right */}
      <div className="detail">
        {/* Image card: shows the saved picture, or a placeholder if there is none */}
        <div className="card image-card">
          <div className="image-box">
            {product.image ? <img src={product.image} alt={product.name} /> : 'Product image'}
          </div>
        </div>

        {/* Edit form card */}
        <form className="card form-card" onSubmit={handleSave}>
          {/* Show saved product name as heading */}
          <h2>{product.name}</h2>

          {/* Name field */}
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          {/* Description field (textarea for longer text) */}
          <div className="field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Group category and material in a row */}
          <div className="row">
            <div className="field">
              <label htmlFor="category">Category</label>
              {/* Dropdown built from the CATEGORIES list */}
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

          {/* Group price and stock in a row */}
          <div className="row">
            <div className="field">
              <label htmlFor="price">Price (USD)</label>
              <input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="stock">Stock</label>
              <input id="stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
            </div>
          </div>

          {/* Image path or URL (plain text, not type="url") */}
          <div className="field">
            <label htmlFor="image">Image URL</label>
            <input id="image" value={image} onChange={(e) => setImage(e.target.value)} />
          </div>

          {/* Save and delete buttons */}
          <div className="actions">
            <button type="submit" className="btn btn-primary">Save changes</button>
            <button type="button" className="btn btn-secondary btn-danger" onClick={handleDelete}>
              Delete product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Route wrapper: reads :id from the URL, loads the product, passes it to ProductDetail
export function ProductDetailPage() {
  // Read the id from the URL, e.g. /products/3
  const { id } = useParams();
  // Load the product from the API
  const { data: product, loading, error } = useFetch(`${API_URL}/products/${id}`);

  // Show a message while loading or if the request failed
  if (error) return <p>Could not load product.</p>;
  if (loading || !product) return <p>Loading...</p>;

  // key resets the form state when a different product is opened
  return <ProductDetail key={product.id} product={product} />;
}

// Export ProductDetail component
export default ProductDetail;