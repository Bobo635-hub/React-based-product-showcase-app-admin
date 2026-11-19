// OWNER: feature/add-product-form
// TODO: form with name, description, category, material, price, stock. POST /products, then useNavigate("/products").
//  Add AddProduct component with heading
//  Add name input with state
import { useState } from 'react';

function AddProduct({ onAdd }) {
  const [name, setName] = useState('');
  // Add description input with state
  const [description, setDescription] = useState('');
  // Add category input with state
  const [category, setCategory] = useState('');
  // Add material input with state
  const [material, setMaterial] = useState('');
  // Add price input with state
  const [price, setPrice] = useState('');
  // Add stock input with state
  const [stock, setStock] = useState('');
  // Add image input with state
  const [image, setImage] = useState('');

  // Add handleSubmit and build newProduct object
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

    // Send POST request to json-server on submit
    fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      // Call onAdd with the saved product
      .then((res) => res.json())
      .then((data) => {
        onAdd(data);
        // Clear the form after adding a product
        setName('');
        setDescription('');
        setCategory('');
        setMaterial('');
        setPrice('');
        setStock('');
        setImage('');
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>

      <label htmlFor='name'>Name</label>
      <input id='name' value={name} onChange={(e) => setName(e.target.value)} />

      {/* Add description input with state */}
      <label htmlFor='description'>Description</label>
      <input id='description' value={description} onChange={(e) => setDescription(e.target.value)} />

      {/* Add category input with state */}
      <label htmlFor='category'>Category</label>
      <input id='category' value={category} onChange={(e) => setCategory(e.target.value)} />

      {/* Add material input with state */}
      <label htmlFor='material'>Material</label>
      <input id='material' value={material} onChange={(e) => setMaterial(e.target.value)} />

      {/* Add price input with state */}
      <label htmlFor='price'>Price</label>
      <input id='price' type='number' value={price} onChange={(e) => setPrice(e.target.value)} />

      {/* Add stock input with state */}
      <label htmlFor='stock'>Stock</label>
      <input id='stock' type='number' value={stock} onChange={(e) => setStock(e.target.value)} />

      {/* Add image input with state */}
      <label htmlFor='image'>Image</label>
      <input id='image' value={image} onChange={(e) => setImage(e.target.value)} />

      {/* Add submit button to AddProduct form */}
      <button type='submit'>Add Product</button>
    </form>
  );
}

export default AddProduct;