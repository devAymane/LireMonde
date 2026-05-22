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

