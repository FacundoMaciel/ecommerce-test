# Amazon Clone

A fully functional Amazon-inspired e-commerce web application built with **Vanilla JavaScript**, **HTML5**, and **CSS3**. No frontend frameworks, no external libraries — just pure web standards backed by a lightweight Node.js server.

---

## Features

- **User authentication** — Register and log in with session persistence via `localStorage`
- **Product catalog** — Browse 80+ products with images, ratings, and prices
- **Search** — Real-time filtering by product name and keywords
- **Pagination** — 12 products per page with prev/next navigation
- **Shopping cart** — Add, remove, and persist cart items across sessions
- **Checkout** — Review cart items with estimated delivery dates
- **Delivery options** — Choose between FREE, standard, or express shipping per item
- **Order summary** — Itemized breakdown with subtotal, shipping, tax, and order total
- **Responsive header** — Cart count and personalized greeting update dynamically

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla JS (ES Modules), HTML5, CSS3 |
| Backend | Node.js — built-in `http` module only |
| Persistence | `localStorage` (cart + session), `users.json` (accounts) |
| Testing | Node.js built-in test runner (`node:test`) |
| Dependencies | **None** |

---

## Project Structure

```
amazon-clone/
├── backend/
│   ├── products.json          # Product catalog data
│   └── users.example.json     # Template for users.json (not tracked in git)
├── data/
│   ├── auth.js                # Session management (localStorage + cookies)
│   ├── cart.js                # Cart state and localStorage persistence
│   ├── deliveryOptions.js     # Shipping options definitions
│   └── products.js            # Product class with helpers (price, stars, etc.)
├── images/
│   ├── icons/                 # UI icons
│   ├── products/              # Product images
│   └── ratings/               # Star rating images (0–50)
├── scripts/
│   ├── amazon.js              # Main catalog page logic
│   ├── login.js               # Login form handler
│   ├── register.js            # Registration form handler
│   ├── checkout.js            # Checkout page entry point
│   ├── checkout/
│   │   ├── orderSummary.js    # Cart items renderer with delivery options
│   │   └── paymentSummary.js  # Price breakdown renderer
│   └── utils/
│       ├── filterProducts.js  # Search/keyword filtering
│       ├── money.js           # Currency formatting
│       ├── pagination.js      # Page slicing logic
│       ├── validateLogin.js   # Login validation
│       └── validateRegister.js# Registration validation
├── styles/
│   ├── pages/                 # Page-specific CSS
│   └── shared/                # Shared header and general styles
├── tests/                     # Unit tests (Node.js test runner)
├── index.html                 # Product catalog
├── checkout.html              # Checkout page
├── login.html                 # Login page
├── register.html              # Registration page
├── orders.html                # Orders history
├── tracking.html              # Order tracking
├── server.js                  # HTTP server + /api/register endpoint
└── package.json
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher (no npm install needed — zero dependencies)

### Setup

```bash
# 1. Clone the repository
git clone <repository-url>
cd amazon-clone

# 2. Create the users file from the example template
cp backend/users.example.json backend/users.json

# 3. Start the server
npm start
# or
node server.js
```

Open your browser at **http://localhost:3000**

> The server root redirects to `login.html`. After logging in you are taken to the product catalog.

---

## Test Accounts

After copying `users.example.json` to `users.json`, the following account is available:

| Email | Password |
|---|---|
| `john@example.com` | `password123` |

You can also register a new account directly from the app.

---

## Running Tests

```bash
npm test
```

The test suite uses the **Node.js built-in test runner** — no Jest, no Mocha, no extra installs.

| Test file | What it covers |
|---|---|
| `validateLogin.test.js` | Credential matching, case sensitivity, empty inputs |
| `validateRegister.test.js` | Field validation, duplicate email detection |
| `money.test.js` | Currency formatting (cents → dollars) |
| `filterProducts.test.js` | Search by name and keyword |
| `pagination.test.js` | Page slicing and total page calculation |

Expected output: **13 passing** tests.

---

## How It Works

### Authentication Flow

1. User registers via the form — the server `POST /api/register` endpoint validates the data and appends the new user to `backend/users.json`
2. On login, the client fetches `backend/users.json` and validates credentials locally
3. The authenticated user object is stored in `localStorage` and a cookie for session persistence
4. Every protected page checks `getCurrentUser()` on load and redirects to `login.html` if no session exists

### Cart Persistence

The cart is stored as a JSON array in `localStorage`. It survives page reloads and navigation between catalog and checkout without any server round-trips.

### Delivery Options & Pricing

Each cart item independently tracks its chosen delivery option. The payment summary aggregates all items in real time: `subtotal + shipping + 10% tax = order total`.

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/*` | Serves static files (HTML, CSS, JS, images) |
| `POST` | `/api/register` | Creates a new user account |

---

## Security Notes

- `backend/users.json` is excluded from version control (see `.gitignore`) — it contains user data and must not be committed
- Passwords are stored in plain text — this project is for educational purposes only and is **not production-ready**
- Authentication is client-side only — do not use this as a model for real auth flows

---

## License

MIT License — free to use, modify, and distribute.
