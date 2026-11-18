
import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LandingPage from "../pages/Home";

// Mock the useFetch hook
vi.mock("../hooks/useFetch", () => ({
  default: () => ({
    data: {
      id: 1,
      name: "Merc Jewelry",
      tagline: "Jewelry for every occasion",
      description:
        "An independent jewelry house offering rings, necklaces, earrings and bracelets.",
    },
    loading: false,
    error: null,
  }),
}));

describe("LandingPage", () => {
  it("renders the landing page correctly", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );
  });

  it("displays the store name", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Merc Jewelry")).toBeInTheDocument();
  });

  it("displays the store tagline", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Jewelry for every occasion")
    ).toBeInTheDocument();
  });

  it("displays the store description", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/An independent jewelry house offering rings/)
    ).toBeInTheDocument();
  });

  it("displays the hero heading", () => {
  render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", {
      name: "Elegance in Every Detail.",
    })
  ).toBeInTheDocument();
});

it("displays the Browse Products button", () => {
  render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("link", { name: /browse products/i })
  ).toBeInTheDocument();
});

it("displays an Add Products button", () => {
  render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("link", { name: /add products/i })
  ).toBeInTheDocument();
});

it("displays the Shop by Category section", () => {
  render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: /shop by category/i })
  ).toBeInTheDocument();
});

// it("displays the first six products", () => {
//   render(
//     <MemoryRouter>
//       <LandingPage />
//     </MemoryRouter>
//   );

//   expect(screen.getByText("Solitaire Ring")).toBeInTheDocument();
//   expect(screen.getByText("Classic Leather Watch")).toBeInTheDocument();
//   expect(screen.getByText("Pearl Drop Earrings")).toBeInTheDocument();
//   expect(screen.getByText("Onyx Square Cufflinks")).toBeInTheDocument();
//   expect(screen.getByText("Infinity Necklace")).toBeInTheDocument();
//   expect(screen.getByText("Tennis Bracelet")).toBeInTheDocument();
// });

// it("displays product images with alt text", () => {
//   render(
//     <MemoryRouter>
//       <LandingPage />
//     </MemoryRouter>
//   );

//   const images = screen.getAllByRole("img");

//   expect(images.length).toBeGreaterThanOrEqual(6);

//   images.forEach((image) => {
//     expect(image).toHaveAttribute("alt");
//   });
// });
 });
