# 📚 LireMonde

> A vanilla JS book discovery and reading list manager, powered by `json-server`.

---

## 📁 Project Structure

```
liremonde/
├── index.html   # App shell — navbar, modal, root div
├── style.css    # All styles including dark mode
├── script.js    # State, API calls, rendering, events
└── db.json      # Local database for json-server
```

---

## ✨ Features

- **Browse & filter** — book cards grid with genre chips and live search
- **Reading list** — toggle any book into your personal to-read list
- **Book modal** — cover, description, and metadata in a popup
- **Admin panel** — add, edit, and delete books via the API

---

## 🚀 Getting Started

### 1. Install json-server

```bash
npm install -g json-server
```

### 2. Start the API

```bash
json-server --watch db.json --port 3000
```

### 3. Open the app

Open `index.html` in your browser, or use the **Live Server** extension in VS Code.

---

## 🔌 API Endpoints

| Method   | Endpoint        | Description              |
|----------|-----------------|--------------------------|
| `GET`    | `/livres`       | Fetch all books          |
| `GET`    | `/livres/:id`   | Fetch one book (modal)   |
| `POST`   | `/livres`       | Add a new book           |
| `PATCH`  | `/livres/:id`   | Edit or toggle `toRead`  |
| `DELETE` | `/livres/:id`   | Delete a book            |

