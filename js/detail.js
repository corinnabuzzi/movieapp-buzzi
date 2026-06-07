function getParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    id: params.get("id"),
    type: params.get("type"),
  };
}

function renderDetail(item, type) {
  const container = document.querySelector("#detail-container");

  const title = type === "movie" ? item.title : item.name;
  const date = type === "movie" ? item.release_date : item.first_air_date;
  const year = date ? date.slice(0, 4) : "—";
  const overview = item.overview || "Nessuna descrizione disponibile.";
  const vote = item.vote_average ? item.vote_average.toFixed(1) : "—";
  const poster = item.poster_path
    ? `<img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${title}" class="detail-poster" />`
    : `<div class="card-img-placeholder">Nessuna immagine</div>`;

  container.innerHTML = `
    <div class="detail-layout">
      <div class="detail-poster-wrap">
        ${poster}
      </div>
      <div class="detail-info">
        <p class="detail-year">${year}</p>
        <h1 class="detail-title">${title}</h1>
        <p class="detail-vote">★ ${vote}</p>
        <p class="detail-overview">${overview}</p>
        <a href="javascript:history.back()" class="detail-back">← Torna indietro</a>
      </div>
    </div>
  `;
}

async function init() {
  const { id, type } = getParams();
  const container = document.querySelector("#detail-container");

  if (!id || !type) {
    container.innerHTML = `<p class="error-msg">Parametri mancanti.</p>`;
    return;
  }

  try {
    const item = await fetchDetail(id, type);
    renderDetail(item, type);
  } catch (err) {
    container.innerHTML = `<p class="error-msg">Errore nel caricamento del dettaglio.</p>`;
    console.error(err);
  }
}

init();