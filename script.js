const API = "http://localhost:3000/livres";

const app = document.getElementById("app-root");
const modal = document.getElementById("bookModal");
const modalBody = document.getElementById("modalBody");
const searchInput = document.getElementById("globalSearchInput");
const badge = document.getElementById("toReadCountBadge");

let books = [];
let view = "home";
let genre = "ALL";
let search = "";

// ================= API =================
const api = {
  get: async () => (await fetch(API)).json(),

  getOne: async (id) =>
    (await fetch(`${API}/${id}`)).json(),

  add: async (data) =>
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }),

  update: async (id, data) =>
    fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }),

  delete: async (id) =>
    fetch(`${API}/${id}`, { method: "DELETE" })
};


// ================= LOAD =================
async function loadBooks() {
  books = await api.get();
  render();
  updateBadge();
}

function updateBadge() {
  badge.textContent = books.filter(b => b.toRead).length;
}

// ================= FILTER =================
function filteredBooks() {
  let data = [...books];

  if (view === "toread") {
    data = data.filter(b => b.toRead);
  }

  if (genre !== "ALL" && view === "home") {
    data = data.filter(b => b.genre === genre);
  }

  if (search.trim()) {
    const q = search.toLowerCase();

    data = data.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.genre.toLowerCase().includes(q)
    );
  }

  return data;
}


// ================= CARD =================
function card(book) {
  return `
    <div class="card" onclick="showBook(${book.id})">
      <div class="card-img"
        style="background-image:url('${book.cover}')">
      </div>

      <div class="card-content">
        <div class="card-title">${book.title}</div>
        <div class="card-author">${book.author}</div>
        <div class="card-genre">${book.genre}</div>

        <button class="toRead-btn ${book.toRead ? "active" : ""}"
          onclick="toggleRead(event, ${book.id})">
          ${book.toRead ? "✔️ In To Read" : "📖 Add to Read"}
        </button>
      </div>
    </div>
  `;
}

// ================= HOME =================
function renderHome() {
  const genres = ["ALL", ...new Set(books.map(b => b.genre))];

  return `
    <div class="filters-bar">
      <div class="genre-filters">
        ${genres.map(g => `
          <span 
            class="genre-chip ${genre === g ? "active" : ""}"
            onclick="setGenre('${g}')">
            ${g}
          </span>
        `).join("")}
      </div>

      <span class="badge">
        ${filteredBooks().length} books
      </span>
    </div>

    <div class="books-grid">
      ${filteredBooks().map(card).join("")}
    </div>
  `;
}
