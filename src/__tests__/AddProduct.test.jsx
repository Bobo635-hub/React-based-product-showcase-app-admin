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
