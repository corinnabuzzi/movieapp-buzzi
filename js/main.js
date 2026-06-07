function createCard(item, type) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.addEventListener("click", () => {
    window.location.href = `detail.html?id=${item.id}&type=${type}`;
  });

  const title = type === "movie" ? item.title : item.name;
  const date = type === "movie" ? item.release_date : item.first_air_date;
  const year = date ? date.slice(0, 4) : "—";

  if (item.poster_path) {
    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
    img.alt = title;
    card.appendChild(img);
  } else {
    const placeholder = document.createElement("div");
    placeholder.classList.add("card-img-placeholder");
    placeholder.textContent = "Nessuna immagine";
    card.appendChild(placeholder);
  }

  const info = document.createElement("div");
  info.classList.add("card-info");
  info.innerHTML = `
    <p class="card-title">${title}</p>
    <p class="card-year">${year}</p>
  `;
  card.appendChild(info);

  return card;
}

function renderCards(items, gridId, type) {
  const grid = document.querySelector(gridId);
  grid.innerHTML = "";
  items.forEach(item => {
    const card = createCard(item, type);
    grid.appendChild(card);
  });
}

async function init() {
  try {
    const movies = await fetchTrendingMovies();
    renderCards(movies, "#movies-grid", "movie");
  } catch (err) {
    document.querySelector("#movies-grid").innerHTML =
      `<p class="error-msg">Errore nel caricamento dei film.</p>`;
    console.error(err);
  }

  try {
    const series = await fetchTrendingSeries();
    renderCards(series, "#series-grid", "tv");
  } catch (err) {
    document.querySelector("#series-grid").innerHTML =
      `<p class="error-msg">Errore nel caricamento delle serie.</p>`;
    console.error(err);
  }
}

init();