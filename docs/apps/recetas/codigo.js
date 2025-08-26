const $q = document.getElementById("q");
const $status = document.getElementById("status");
const $results = document.getElementById("results");
const $loader = document.getElementById("loader");

let currentToken = 0; // se incrementa en cada búsqueda, avita el desorden de peticiones


async function fetchMeals(query) {
const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`; //la funcion encode es para parsear a formato de url
const res = await fetch(url);
if (!res.ok) throw new Error(`HTTP ${res.status}`);
const data = await res.json();
return data.meals ?? [];
}

function renderMeals(meals) {
    if (!meals.length) {
    $results.innerHTML = "";
    $status.textContent = "Sin resultados.";
    return;
    }
    $status.textContent = `Resultados: ${meals.length}`;
    $results.innerHTML = meals.map(m => `
    <li class="card">
        <img src="${m.strMealThumb || ''}" alt="${m.strMeal}" onerror="this.classList.add('fallback'); this.removeAttribute('src');">
        <div class="body">
        <p class="title">${m.strMeal}</p>
        <p class="meta">${m.strCategory ?? "Sin categoría"} · ${m.strArea ?? "N/A"}</p>
        </div>
    </li>
    `).join("");
}


async function search(term) {
if (!term.trim()) {
    $status.textContent = "Escribe para buscar.";
    $results.innerHTML = "";
    hideLoader();
    return;
}

const token = ++currentToken;       // token de esta búsqueda
showLoader("Cargando…");
$status.textContent = "Buscando…";

try {
    const meals = await fetchMeals(term);
    if (token !== currentToken) return;  // llegó tarde: ignora
    renderMeals(meals);
} catch (err) {
    console.error(err);
    if (token !== currentToken) return;  // ignora si no es la última
    $status.textContent = "Error buscando recetas.";
    $results.innerHTML = "";
} finally {
    if (token === currentToken) hideLoader(); // solo la última oculta
}
}


const debouncedSearch = debounce((value) => {
search(value);
}, 500);

$q.addEventListener("input", (e) => {
debouncedSearch(e.target.value);
});



// ANIMACION DEL SPIN

function showLoader(text = "Cargando…") {
    $loader.querySelector(".loader-text").textContent = text;
    $loader.classList.remove("hidden");
}

function hideLoader() {
    $loader.classList.add("hidden");
}


// DEBOUNCE 

function debounce(fn, delay = 400) {
let timer;
return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
};
}
