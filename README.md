```markdown
# Volubiks Jewelry — Landing (initial commit)

This commit contains the client-side landing page for "Royal Volubiks Jewelries".

How to run locally (frontend only)
1. cd client
2. npm install
3. npm run dev
4. Open http://localhost:5173

What I'll add next (after you confirm push)
- Full Shop and Product pages
- Server (Express) with SQLite for products & orders
- Paystack and Moniepoint integration (server endpoints and webhook)
- devcontainer and Codespace-ready configuration
- Instructions for adding Paystack & Moniepoint keys (env)


## Importing products from a spreadsheet

You can manage product data using a CSV or Excel spreadsheet and import it into `data/products.json`.

Template CSV:
- `data/products.csv` (columns: `id,name,slug,price,currency,image,description,category,featured,inventory,tags`)

Steps
1. Edit `data/products.csv` (or create an Excel `.xlsx` file with the same headers).
2. Add any product images under `public/images/` and reference them in the `image` column (e.g., `/images/pendant.jpg`) or provide absolute URLs to remote images.
3. Run one of the following commands:

   - To import product data only:

     npm run import:products data/products.csv

   - To import product data and copy images into an import folder **and** into `public/images` (creates `data/imports/<timestamp>/images`, copies images into `public/images`, and writes `products.json` there):

     npm run import:products data/products.csv -- --copy-images

This writes `data/products.json` (global). When `--copy-images` is used the script will:

   - copy images into `data/imports/<timestamp>/images` (keeps an import snapshot),
   - also copy images into `public/images` so the app can serve them immediately,
   - update the `image` path in the global `data/products.json` to point to the public path (`/images/<filename>`).

To avoid overwrites, existing files in `public/images` are preserved and new files are renamed if necessary (e.g., `IMG-1.jpg`).

If you prefer to overwrite existing files instead of renaming, pass the `--overwrite-images` flag when importing; this will copy images directly to `public/images/<filename>` and replace any existing files with the same name.

Notes
- The import script uses the `xlsx` package so it can read CSV or Excel files.
- `tags` can be a semicolon or comma-separated list.

```
