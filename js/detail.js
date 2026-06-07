function getParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    id: params.get("id"),
    type: params.get("type"),
  };
}

function formatRuntime(minutes) {
  if (!minutes) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function renderDetail(item, credits, type) {
  const container = document.querySelector("#detail-container");

  const title = type === "movie" ? item.title : item.name;
  const date = type === "movie" ? item.release_date : item.first_air_date;
  const year = date ? date.slice(0, 4) : null;
  const overview = item.overview || "Nessuna descrizione disponibile.";
  const vote = item.vote_average ? item.vote_average.toFixed(1) : null;
  const runtime = type === "movie" ? formatRuntime(item.runtime) : null;
  const genres = item.genres || [];

  // Backdrop o poster come sfondo hero
  const backdropPath = item.backdrop_path || item.poster_path;
  const backdropUrl = backdropPath
    ? `https://image.tmdb.org/t/p/w1280${backdropPath}`
    : null;

  // Poster
  const posterHtml = item.poster_path
    ? `<img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${title}" class="detail-poster" />`
    : `<div class="detail-poster-placeholder">Nessuna immagine</div>`;

  // Meta items — solo quelli con dato reale
  const metaItems = [];
  if (vote) {
    metaItems.push(`
      <div class="detail-meta-item">
        <span class="detail-meta-label">Rating</span>
        <span class="detail-meta-value detail-meta-value--accent">${vote}/10</span>
      </div>
    `);
  }
  if (year) {
    metaItems.push(`
      <div class="detail-meta-item">
        <span class="detail-meta-label">Anno</span>
        <span class="detail-meta-value">${year}</span>
      </div>
    `);
  }
  if (runtime) {
    metaItems.push(`
      <div class="detail-meta-item">
        <span class="detail-meta-label">Durata</span>
        <span class="detail-meta-value">${runtime}</span>
      </div>
    `);
  }

  // Genres
  const genresHtml = genres.length > 0
    ? `<div class="detail-genres">${genres.map(g => `<span class="detail-genre-badge">${g.name}</span>`).join("")}</div>`
    : "";

  // Credits
  const crew = credits?.crew || [];
  const cast = credits?.cast || [];

  const directors = crew.filter(p => p.job === "Director").map(p => p.name);
  const writers = crew.filter(p => ["Screenplay", "Writer", "Story"].includes(p.job)).map(p => p.name);
  const producers = crew.filter(p => p.job === "Producer").map(p => p.name).slice(0, 3);

  // Per le serie, il director non esiste — usiamo "Created by"
  const creators = item.created_by?.map(p => p.name) || [];

  const creditRows = [];
  if (type === "tv" && creators.length > 0) {
    creditRows.push({ label: "Creato da", value: creators.join(", ") });
  }
  if (directors.length > 0) {
    creditRows.push({ label: "Regia", value: directors.join(", ") });
  }
  if (writers.length > 0) {
    creditRows.push({ label: "Sceneggiatura", value: writers.slice(0, 3).join(", ") });
  }
  if (producers.length > 0) {
    creditRows.push({ label: "Produzione", value: producers.join(", ") });
  }

  const creditsHtml = creditRows.length > 0
    ? creditRows.map(row => `
        <div class="detail-credit-row">
          <span class="detail-credit-label">${row.label}</span>
          <span class="detail-credit-value">${row.value}</span>
        </div>
      `).join("")
    : `<p class="detail-empty">Dati non disponibili</p>`;

  // Cast (primi 6)
  const topCast = cast.slice(0, 6);
  const castHtml = topCast.length > 0
    ? topCast.map(actor => `
        <div class="detail-cast-row">
          <span class="detail-cast-name">${actor.name}</span>
          <span class="detail-cast-character">${actor.character || ""}</span>
        </div>
      `).join("")
    : `<p class="detail-empty">Dati non disponibili</p>`;

  container.innerHTML = `
    <div class="detail-hero" ${backdropUrl ? `style="--backdrop-url: url('${backdropUrl}')"` : ""}>
      <div class="detail-hero-overlay"></div>
      <div class="detail-hero-content">
        <div class="detail-poster-wrap">
          ${posterHtml}
        </div>
        <div class="detail-hero-info">
          <a href="javascript:history.back()" class="detail-back">← Indietro</a>
          <h1 class="detail-title">${title}</h1>
          ${metaItems.length > 0 ? `<div class="detail-meta-grid">${metaItems.join("")}</div>` : ""}
          <p class="detail-overview">${overview}</p>
          ${genresHtml}
        </div>
      </div>
    </div>

    <div class="detail-lower">
      <div class="detail-credits-section">
        <h2 class="detail-section-title">Credits</h2>
        <div class="detail-credits-table">
          ${creditsHtml}
        </div>

        <h2 class="detail-section-title" style="margin-top: 3rem;">Cast principale</h2>
        <div class="detail-cast-table">
          ${castHtml}
        </div>
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
    // Due chiamate in parallelo — più veloce di farle in sequenza
    const [item, credits] = await Promise.all([
      fetchDetail(id, type),
      fetchCredits(id, type),
    ]);
    renderDetail(item, credits, type);
  } catch (err) {
    container.innerHTML = `<p class="error-msg">Errore nel caricamento del dettaglio.</p>`;
    console.error(err);
  }
}

init();
