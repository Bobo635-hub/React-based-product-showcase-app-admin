import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { test, expect } from "vitest";
import Header from "../components/Header";

// Helper: draws the Header on a fake page.
// You can pass a different store, or leave it out to use the default.
function renderHeader(store = { name: "Merc Jewelry" }) {
  render(
    <MemoryRouter>
      <Header store={store} />
    </MemoryRouter>
  );
}

// ----- Store name tests -----

test("shows the store name", () => {
  renderHeader();
  expect(screen.getByText("Merc Jewelry")).toBeInTheDocument();
});

test("shows a different store name", () => {
  renderHeader({ name: "Gem and Gold Co." });
  expect(screen.getByText("Gem and Gold Co.")).toBeInTheDocument();
});



// ----- Navbar link tests -----

test("Home link goes to the home page", () => {
  renderHeader();
  const homeLink = screen.getByRole("link", { name: "Home" });
  expect(homeLink).toHaveAttribute("href", "/");
});

