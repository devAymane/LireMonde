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
