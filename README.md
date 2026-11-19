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

## Team rules

### Git and branches

- Nobody pushes directly to `main` or `develop`. Everything goes through a pull request.
- Always create your feature branch from `develop`, never from `main`.
- Name branches `feature/short-description`, and keep one feature per branch.
- Pull `develop` into your branch at least once a day to avoid large merge conflicts.
- Use clear commit messages with a prefix: `feat:`, `fix:`, `test:`, `docs:`, or `style:`.
- Never use `git push --force` on a shared branch.
- Delete your feature branch after it has been merged. Keep `develop`.

### Pull requests and reviews

- Open pull requests with **base: `develop`**. Double-check this before you click Create.
- Every pull request includes tests for its feature and passes `npm test`.
- Every pull request needs one approval from a teammate before it is merged.
- Reviewers pull the branch, run `npm start` and `npm test`, and click through the feature, not just read the code.
- Open a draft pull request early so teammates can see progress.
- Only `develop` merges into `main`, and only for the final release. The release pull request uses a regular merge (not squash) so the branch history stays visible.

### File ownership

- Edit only your own page and component files.
- Ask the scaffold owner before changing `App.jsx`, `index.css`, `Header`, `Footer`, or `server/index.js`. These are shared and cause conflicts when several people edit them.
- Reuse the shared pieces: `useFetch` for loading data, `API_URL` for the server address, and the shared CSS classes (`.btn`, `.card`, `.grid`) and colour tokens in `index.css`.
- Keep to the product shape `{ id, name, description, category, material, price, stock, image }`. If you need a new field, agree on it with the team first, because it affects the server, the form, and every test.

### Data

- `server/db.json` is shared test data. Run `npm run reset` before you demo or test, to start from the clean seed data.
- Do not commit changes to `server/db.json` that came from your own testing. Only commit it when the team has agreed to change the seed data, and update `server/db.seed.json` at the same time.

### Code quality

- Use functional components and hooks.
- Give every form input a visible `<label>`, and every image meaningful `alt` text.
- Handle loading, error, and empty states on every page that fetches data.
- Remove `console.log` calls and unused code before you open a pull request.

### Testing

- Every feature has its own test file in `src/__tests__/`.
- Mock `fetch` in tests so they never depend on the real server.
- Do not merge a pull request with failing tests.

### Communication

- Hold a 10-minute check-in every day. Each person says what works, what is next, and what is blocking them.
- If you are blocked for more than an hour, say so in the group chat right away so someone can help.
- Write down open questions and decisions in the group chat or on the Trello board, so nothing is lost.
- Update your Trello card as you work: move it to the next list when it is done.

### Schedule

- **Day 1 (Wed Nov 18):** setup and core build. Every feature branch exists and has a draft pull request open.
- **Day 2 (Thu Nov 19):** finish features, write tests, and merge into `develop`.
- **Day 3 (Fri Nov 20):** integration, bug fixes only, a freeze at midday, then the release from `develop` into `main` and submission.
- After the Day 3 freeze, only bug fixes approved by the integration lead are merged.

### Definition of done

A feature is done when it:

1. Works with real data from the server.
2. Handles loading, error, and empty states.
3. Looks right on desktop and on a phone-width screen.
4. Has passing tests.
5. Has been reviewed, merged into `develop`, and its branch deleted.

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