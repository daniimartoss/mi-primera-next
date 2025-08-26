const $q = document.getElementById("q");
const $status = document.getElementById("status");
const $results = document.getElementById("results");
const $weather = document.getElementById("weather");
const $daily = document.querySelector("#daily")

// --- debounce para evitar llamadas excesivas ---
function debounce(fn, delay = 450) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

// --- llamada a API de ciudades ---
async function searchCities(name) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=10&language=es`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data.results ?? [];
}

// --- llamada a API del clima actual ---
async function checkWeather(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&daily=temperature_2m_min,temperature_2m_max&timezone=auto`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return {
    current: data.current ?? null,
    units: data.current_units ?? null,
    daily: data.daily ?? null,
    time: data.current?.time ?? null,
  };
}

// --- pintar resultados de ciudades ---
function renderCities(cities) {
  if (!cities.length) {
    $results.innerHTML = "";
    $status.textContent = "Sin resultados.";
    return;
  }
  $status.textContent = `Resultados: ${cities.length}`;
  $results.innerHTML = cities.map(c => `
    <li data-lat="${c.latitude}" data-lon="${c.longitude}" data-name="${c.name}">
      <strong>${c.name}</strong>${c.admin1 ? `, ${c.admin1}` : ""}${c.country ? `, ${c.country}` : ""}
      <div class="meta">Lat: ${c.latitude} · Lon: ${c.longitude}</div>
    </li>
  `).join("");


  $results.querySelectorAll("li").forEach(li => {
    li.addEventListener("click", async () => {
      const lat = parseFloat(li.dataset.lat);
      const lon = parseFloat(li.dataset.lon);
      const name = li.dataset.name;

      $status.textContent = `Seleccionado: ${name} · obteniendo clima…`;
      try {
        const { current, units, daily } = await checkWeather(lat, lon);
        renderWeather(name, current, units, daily);
        $status.textContent = `Seleccionado: ${name}`;
      } catch (err) {
        console.error(err);
        $status.textContent = "Error al obtener el clima.";
        $weather.innerHTML = "";
      }
    });
  });
}

// --- pintar clima actual ---
function renderWeather(name, current, units, daily) {
  if (!current || !units) {
    $weather.innerHTML = `<p>No hay datos de clima para <strong>${name}</strong>.</p>`;
    return;
  }

  const t = current.temperature_2m;
  const tw = units.temperature_2m;
  const w = current.wind_speed_10m;
  const wu = units.wind_speed_10m;
  const time = current.time ?? "";
  const  max = daily.temperature_2m_max;
  const  min = daily.temperature_2m_min;
  const times = daily.time;

  $weather.innerHTML = `
    <div class="weather-card">
      <h2>${name}</h2>
      <p>Temperatura: <strong>${t}${tw}</strong></p>
      <p>Viento: <strong>${w}${wu}</strong></p>
      ${time ? `<p style="opacity: 0.75;">Actualizado: ${time}</p>` : ""}
    </div>
  `;

  $daily.innerHTML = `
  <h1 class="prevT">Prevision 3 dias</h1>
  <div class="prev">📅 ${times[1]} - ${min[1]}${tw} / ${max[1]}${tw}</div>
  <div class="prev">📅 ${times[2]} - ${min[2]}${tw} / ${max[2]}${tw}</div>
  <div class="prev">📅 ${times[3]} - ${min[3]}${tw} / ${max[3]}${tw}</div>

  `
}

// --- ejecutar búsqueda (con debounce) ---
async function doSearch(term) {
  if (!term.trim()) {
    $status.textContent = "Escribe para buscar.";
    $results.innerHTML = "";
    $weather.innerHTML = "";
    
    return;
  }
  $status.textContent = "Buscando ciudades…";
  try {
    const cities = await searchCities(term);
    renderCities(cities);
    $weather.innerHTML = "";
    $daily.innerHTML = "";
  } catch (err) {
    console.error(err);
    $status.textContent = "Error buscando ciudades.";
    $results.innerHTML = "";
    $weather.innerHTML = "";
    $daily.innerHTML = "";
  }
}

const debounced = debounce((v) => doSearch(v), 500);
$q.addEventListener("input", e => debounced(e.target.value));
