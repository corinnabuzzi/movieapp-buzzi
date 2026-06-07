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

async function init() {
  try {
    const movies = await fetchPopularMovies();
    const grid = document.querySelector("#movies-grid");
    movies.forEach(item => grid.appendChild(createCard(item, "movie")));
  } catch (err) {
    document.querySelector("#movies-grid").innerHTML =
      `<p class="error-msg">Errore nel caricamento dei film.</p>`;
    console.error(err);
  }
}

init();