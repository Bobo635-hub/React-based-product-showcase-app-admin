# Dashboard Admin Portal

An administrator portal for a jewelry e-commerce site, built as a React single-page app with a simulated backend. Admins can browse the catalogue, search for products, add new products, and edit or delete existing ones.

## Tech stack

- **Frontend:** React (Vite), React Router
- **Backend:** Express server that reads and writes `server/db.json`
- **Testing:** Vitest and React Testing Library

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer (check with `node -v`)
- npm (comes with Node)
- Git

## Getting started

1. **Clone the repository and switch to `develop`**

   ```bash
   git clone <repo-url>
   cd <repo-folder>
   git checkout develop
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the app and the server together**

   ```bash
   npm start
   ```

4. **Open it in your browser**

   | What | Address |
   |---|---|
   | React app | http://localhost:5173 |
   | API  | http://localhost:3001 |


   If the page loads with the Header, Footer, and product placeholders, you're set up correctly.

## Scripts

| Command | What it does |
|---|---|
| `npm start` | Runs the API server and the React app together |
| `npm run server` | Runs only the Express API on port 3001 |
| `npm run dev` | Runs only the React app on port 5173 |
| `npm run reset` | Restores `server/db.json` from the clean copy `server/db.seed.json` |
| `npm test` | Runs the test suite |
| `npm run build` | Builds the app for production into `dist/` |

## Backend and data

All data lives in `server/db.json`, which the Express server (`server/index.js`) reads and writes. Changes made in the app are saved to this file, so they survive page refreshes and server restarts.

Run `npm run reset` any time you want to go back to the clean starting data.

### Product shape

```json
{
  "id": 1,
  "name": "Solitaire Ring",
  "description": "Classic round-cut stone with a slim band",
  "category": "Rings",
  "material": "18k Gold",
  "price": 1250,
  "stock": 6,
  "image": "https://placehold.co/600x600/F3EAD6/5A4410?text=Solitaire+Ring"
}
```

Categories: Rings, Necklaces, Earrings, Bracelets, Watches, Cufflinks.

### API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/store_info/1` | Store name, tagline, and contact details |
| GET | `/products` | All products |
| GET | `/products/:id` | One product |
| POST | `/products` | Add a product |
| PATCH | `/products/:id` | Update fields of a product |
| DELETE | `/products/:id` | Delete a product |

## App routes

| Route | Page |
|---|---|
| `/` | Home |
| `/products` | Product list and search |
| `/products/new` | Add product |
| `/products/:id` | Product detail (edit and delete) |
| `*` | Page not found |

## Project structure

```
.
├── server/
│   ├── index.js          Express API
│   ├── db.json           Live data
│   └── db.seed.json      Clean copy for npm run reset
├── src/
│   ├── main.jsx
│   ├── App.jsx           Routes, Header, Footer
│   ├── api.js            API_URL constant
│   ├── index.css         Shared styles and colour tokens
│   ├── hooks/useFetch.js Custom data-fetching hook
│   ├── components/       Header, Footer, and shared components
│   ├── pages/            Home, ProductList, AddProduct, ProductDetail, NotFound
│   └── __tests__/        Tests, one file per feature
└── package.json
```

## Team workflow

We work on feature branches that merge into `develop`. `develop` merges into `main` only for the final release.

```
main      stable, final release only
develop   integration: everyone's finished work lands here
feature/* one branch per person, created from develop
```

| Person | Branch | Files |
|---|---|---|
| 1 | `feature/routing-landing` | `src/pages/Home.jsx` |
| 2 | `feature/product-list-search` | `src/pages/ProductList.jsx`, `ProductCard` |
| 3 | `feature/add-product-form` | `src/pages/AddProduct.jsx`, `ProductForm` |
| 4 | `feature/product-detail-admin` | `src/pages/ProductDetail.jsx` |

### Starting your work

```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-branch
```

### Day to day

- Commit small and often, with messages like `feat: add search bar` or `fix: clear form after submit`.
- Pull `develop` into your branch at least once a day: `git pull origin develop`.
- Push your branch: `git push -u origin feature/your-branch`.

### Pull requests

1. Open a pull request with **base: `develop`** (not `main`) and **compare: your feature branch**.
2. Include tests for your feature.
3. A teammate reviews it: pull the branch, run `npm start` and `npm test`, then approve.
4. After the merge, delete the feature branch.
5. Everyone runs `git pull origin develop` to get the new code.

### Rules

- Nobody pushes directly to `main` or `develop`.
- Edit only your own page and component files.
- Ask the scaffold owner before changing `App.jsx`, `index.css`, `Header`, `Footer`, or `server/index.js`.
- Use `useFetch` and `API_URL` for requests so the whole team stays consistent.

## Testing

```bash
npm test
```

Each feature has its own test file in `src/__tests__/`. Tests mock `fetch`, so they do not need the server running.

## Troubleshooting

| Problem | Fix |
|---|---|
| `Missing script: "server"` | You are in the wrong folder, or the script is missing from the root `package.json`. Run `npm run` to list available scripts |
| `Failed to resolve import "./api"` (or another file) | The file is missing or in the wrong folder. Check `src/api.js`, `src/hooks/useFetch.js`, and every file imported in `App.jsx` |
| Blank page | Open the browser console (F12). The red error shows which file or import is broken |
| `EADDRINUSE` | Port 3001 or 5173 is already in use. Stop the other process or change the port |
| Footer says "Store details are unavailable" | The server is not running. Start it with `npm start` |
| `Cannot GET /` on port 3001 | The API has no page at the root. Use `/products` or `/store_info/1`, or open the React app on port 5173 |
| Data looks wrong or broken | Run `npm run reset` to restore the clean data |
| Server fails with a JSON error | `server/db.json` has a syntax error. Fix it, or run `npm run reset` |