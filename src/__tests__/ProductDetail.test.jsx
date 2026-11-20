import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import ProductDetail from "../pages/ProductDetail";

const product = {
  id: 1,
  name: "Solitaire Ring",
  description: "Classic round-cut stone with a slim band",
  category: "Rings",
  material: "18k Gold",
  price: 1250,
  stock: 6,
  image: "",
};

// Draws the page at a route, like the real app does
function renderPage(path = "/products/1") {
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products" element={<p>Product list page</p>} />
      </Routes>
    </MemoryRouter>
  );
}

// A fake server: answers GET, PATCH and DELETE without the real server
beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url, options) => {
      if (options?.method === "PATCH") {
        return { ok: true, json: async () => ({ ...product, ...JSON.parse(options.body) }) };
      }
      if (options?.method === "DELETE") {
        return { ok: true, json: async () => ({}) };
      }
      if (String(url).endsWith("/products/999")) {
        return { ok: false, json: async () => ({}) };
      }
      return { ok: true, json: async () => product };
    })
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

// Test 1: the form is pre-filled with the product
test("shows the product values in the form", async () => {
  renderPage();
  expect(await screen.findByLabelText("Name")).toHaveValue("Solitaire Ring");
  expect(screen.getByLabelText("Price (USD)")).toHaveValue("1250");
  expect(screen.getByLabelText("Stock")).toHaveValue("6");
});

