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

// Helper function for filling form fields
function fill(label, value) {
  fireEvent.change(screen.getByLabelText(label), {
    target: { value },
  });
}