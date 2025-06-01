# E-commerce Product Listing

A modern, responsive product listing page built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui** — created as part of a senior frontend technical assessment.

## 🚀 Quick Start

1. **Clone or download the project**
2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
├── app/                    # Next.js App Router (routing, pages, layouts, global styles)
│   ├── layout.tsx          # Root layout (fonts, theme provider)
│   ├── page.tsx            # Home page (product listing entry)
│   ├── not-found.tsx       # 404 page for app-level routes
│   ├── loading.tsx         # Loading skeleton for main page
│   ├── globals.css         # Global styles (Tailwind, CSS vars)
│   └── products/           # Product-related routes
│       └── [id]/           # Dynamic product detail pages
│           ├── page.tsx        # Product details page
│           ├── loading.tsx     # Loading skeleton for product details
│           └── not-found.tsx   # 404 for product details
├── components/             # Reusable React components
│   ├── product-listing-page.tsx    # Main product listing logic/UI
│   ├── product-card.tsx           # Product card display
│   ├── product-grid.tsx           # Product grid layout
│   ├── product-filters.tsx        # Filtering UI (category, price)
│   ├── product-pagination.tsx     # Pagination controls
│   ├── product-search.tsx         # Search bar
│   ├── error-message.tsx          # Error display component
│   ├── loading-skeleton.tsx       # Loading skeleton for products
│   ├── mobile-filters-drawer.tsx  # Mobile filter drawer
│   └── ui/                        # shadcn/ui-based primitives (Button, Card, Badge, etc.)
├── hooks/                  # Custom React hooks
│   └── use-products.ts         # Product fetching/filtering logic
├── lib/                    # Utilities and data fetching
│   ├── get-product.ts          # Fetch a single product by ID
│   └── utils.ts                # Utility functions (e.g., classnames)
├── types/                  # TypeScript type definitions
│   └── index.ts                # Product, props, and hook types
├── __tests__/              # Centralized Jest test files
│   ├── product-listing-page.test.tsx  # Product listing tests
│   ├── product-filters.test.tsx       # Filter component tests
│   └── details-page.test.tsx          # Product details page tests
```

## ✅ Features

- Product listing with **pagination**
- **Category** and **price range** filtering
- **Search** functionality
- Responsive layout & mobile-optimized filter drawer
- **Product detail** pages
- Fully **accessible** components
- Built using **TypeScript**
- **Unit tests** with Jest

## 🛠️ Technologies

- **Next.js 14** – React framework with App Router
- **TypeScript** – For static typing
- **Tailwind CSS** – Utility-first CSS framework
- **shadcn/ui** – Prebuilt, accessible UI components
- **Radix UI** – Underlying primitives used by shadcn/ui
- **Jest** – Unit testing framework
- **DummyJSON API** – Fake product data

## 🧪 Testing

Run unit tests with:

```bash
npx jest
```

Tests include key UI components and data logic.

## 🧩 Troubleshooting

If styles or components don't render:

1. **Check Tailwind CSS is compiled**

   ```bash
   npm run build
   ```

2. **Verify critical files exist**

   - `tailwind.config.js`
   - `postcss.config.js`
   - `app/globals.css`

3. **Clear cache and restart**

   ```bash
   rm -rf .next
   npm run dev
   ```

4. **Inspect browser console** for any runtime errors

## 🧭 Development Scripts

- `npm run dev` – Start local dev server
- `npm run build` – Create production build
- `npm run start` – Run production server
- `npm run lint` – Lint codebase
- `npx jest` – Run test suite
