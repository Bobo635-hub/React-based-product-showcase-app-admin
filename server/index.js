import express from "express";
import cors from "cors";
import { readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "db.json");
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

const readDb = async () => JSON.parse(await readFile(DB_PATH, "utf-8"));
const writeDb = (db) => writeFile(DB_PATH, JSON.stringify(db, null, 2));

function validate(body, partial = false) {
  const errors = [];
  const { name, description, category, material, price, stock } = body;
  const text = (v) => typeof v === "string" && v.trim().length > 0;

  if (!partial || name !== undefined) if (!text(name)) errors.push("name is required");
  if (!partial || category !== undefined) if (!text(category)) errors.push("category is required");
  if (!partial || material !== undefined) if (!text(material)) errors.push("material is required");
  if (!partial || description !== undefined)
    if (typeof description !== "string") errors.push("description must be text");
  if (!partial || price !== undefined)
    if (typeof price !== "number" || !(price > 0)) errors.push("price must be a positive number");
  if (!partial || stock !== undefined)
    if (!Number.isInteger(stock) || stock < 0) errors.push("stock must be a whole number, 0 or more");
  return errors;
}

// READ
// Show db.json exactly as it is stored in the file
app.get(["/", "/db"], async (req, res, next) => {
  try {
    const raw = await readFile(DB_PATH, "utf-8");
    res.type("application/json").send(raw);
  } catch (err) { next(err); }
});

app.get("/store_info/:id", async (req, res, next) => {
  try {
    const db = await readDb();
    const info = db.store_info.find((s) => s.id === Number(req.params.id));
    info ? res.json(info) : res.status(404).json({ error: "Not found" });
  } catch (err) { next(err); }
});

app.get("/products", async (req, res, next) => {
  try {
    const db = await readDb();
    res.json(db.products);
  } catch (err) { next(err); }
});

app.get("/products/:id", async (req, res, next) => {
  try {
    const db = await readDb();
    const product = db.products.find((p) => p.id === Number(req.params.id));
    product ? res.json(product) : res.status(404).json({ error: "Product not found" });
  } catch (err) { next(err); }
});

// CREATE
app.post("/products", async (req, res, next) => {
  try {
    const errors = validate(req.body);
    if (errors.length) return res.status(400).json({ errors });
    const db = await readDb();
    const nextId = db.products.reduce((max, p) => Math.max(max, p.id), 0) + 1;
    const { name, description, category, material, price, stock } = req.body;
    const product = {
      id: nextId,
      name: name.trim(),
      description,
      category: category.trim(),
      material: material.trim(),
      price,
      stock,
    };
    db.products.push(product);
    await writeDb(db);
    res.status(201).json(product);
  } catch (err) { next(err); }
});

// UPDATE
app.patch("/products/:id", async (req, res, next) => {
  try {
    const errors = validate(req.body, true);
    if (errors.length) return res.status(400).json({ errors });
    const db = await readDb();
    const index = db.products.findIndex((p) => p.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Product not found" });
    const { name, description, category, material, price, stock } = req.body;
    const changes = Object.fromEntries(
      Object.entries({ name, description, category, material, price, stock }).filter(([, v]) => v !== undefined)
    );
    db.products[index] = { ...db.products[index], ...changes };
    await writeDb(db);
    res.json(db.products[index]);
  } catch (err) { next(err); }
});

// DELETE
app.delete("/products/:id", async (req, res, next) => {
  try {
    const db = await readDb();
    const before = db.products.length;
    db.products = db.products.filter((p) => p.id !== Number(req.params.id));
    if (db.products.length === before) return res.status(404).json({ error: "Product not found" });
    await writeDb(db);
    res.status(204).end();
  } catch (err) { next(err); }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));