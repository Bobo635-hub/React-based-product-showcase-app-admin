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