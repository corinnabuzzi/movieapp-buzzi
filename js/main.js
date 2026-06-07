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