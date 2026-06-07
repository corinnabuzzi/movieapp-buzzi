async function init() {
  try {
    const movies = await fetchPopularMovies();
    renderCards(movies, "#movies-grid", "movie");
  } catch (err) {
    document.querySelector("#movies-grid").innerHTML =
      `<p class="error-msg">Errore nel caricamento dei film.</p>`;
    console.error(err);
  }
}

init();