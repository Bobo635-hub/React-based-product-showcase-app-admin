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