// Import React useState to manage form input values
import { useState } from 'react';

// Import the shared API base URL
import { API_URL } from '../api';

// Import component styling
import './AddProduct.css';

// Available product categories displayed in the dropdown
const CATEGORIES = ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Watches', 'Cufflinks'];