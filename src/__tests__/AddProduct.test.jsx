import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import AddProduct from '../pages/AddProduct';

// Mock fetch before each test
beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ id: 13, name: 'Test Ring' }),
    })
  );
});

// Test 2: shows every field
test('renders all form fields', () => {
  render(<AddProduct />);
  ['Name', 'Description', 'Category', 'Material', 'Price', 'Stock', 'Image'].forEach((label) => {
    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });
});

// Test 3: category dropdown includes Watches and Cufflinks from db.json
test('category dropdown has all categories', () => {
  render(<AddProduct />);
  expect(screen.getByRole('option', { name: 'Watches' })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: 'Cufflinks' })).toBeInTheDocument();
});

// Test 4: typing updates the input
test('typing updates the name field', () => {
  render(<AddProduct />);
  fill('Name', 'Test Ring');
  expect(screen.getByLabelText('Name')).toHaveValue('Test Ring');
});
// Test 5: submitting sends a POST with numbers for price and stock
test('submits the new product with POST', async () => {
  render(<AddProduct />);
  fill('Name', 'Test Ring');
  fill('Description', 'A test ring');
  fill('Category', 'Rings');
  fill('Material', 'Silver');
  fill('Price', '500');
  fill('Stock', '3');
  fill('Image', '/images/test-ring.png');

  fireEvent.click(screen.getByRole('button', { name: 'Add Product' }));

  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  const [url, options] = fetch.mock.calls[0];
  expect(url).toContain('/products');
  expect(options.method).toBe('POST');
  expect(JSON.parse(options.body)).toEqual({
    name: 'Test Ring',
    description: 'A test ring',
    category: 'Rings',
    material: 'Silver',
    price: 500,
    stock: 3,
    image: '/images/test-ring.png',
  });
});
// Test 6: calls onAdd with the saved product and clears the form
test('calls onAdd and clears the form after submit', async () => {
  const onAdd = vi.fn();
  render(<AddProduct onAdd={onAdd} />);

  fill('Name', 'Test Ring');

  fireEvent.click(screen.getByRole('button', { name: 'Add Product' }));

  await waitFor(() =>
    expect(onAdd).toHaveBeenCalledWith({ id: 13, name: 'Test Ring' })
  );

  expect(screen.getByLabelText('Name')).toHaveValue('');
});