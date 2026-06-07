async function init() {
  try {
    const series = await fetchPopularSeries();
    renderCards(series, "#series-grid", "tv");
  } catch (err) {
    document.querySelector("#series-grid").innerHTML =
      `<p class="error-msg">Errore nel caricamento delle serie.</p>`;
    console.error(err);
  }
}

init();