import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { test, expect } from "vitest";
import Header from "../components/Header";

// Test 1: the Header shows the store name we give it
test("shows the store name", () => {
  // 1. Draw the Header on a fake page
  render(
    <MemoryRouter>
      <Header store={{ name: "Merc Jewelry" }} />
    </MemoryRouter>
  );

  // 2. Look for the text on the page
  const storeName = screen.getByText("Merc Jewelry");

  // 3. Check that it is there
  expect(storeName).toBeInTheDocument();
});



