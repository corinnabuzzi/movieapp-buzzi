const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

async function fetchTrendingMovies() {
  const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=it-IT`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Errore HTTP: ${response.status}`);
  const data = await response.json();
  return data.results;
}

async function fetchTrendingSeries() {
  const url = `${BASE_URL}/trending/tv/day?api_key=${API_KEY}&language=it-IT`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Errore HTTP: ${response.status}`);
  const data = await response.json();
  return data.results;
}

async function fetchPopularMovies() {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=it-IT`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Errore HTTP: ${response.status}`);
  const data = await response.json();
  return data.results;
}

async function fetchPopularSeries() {
  const url = `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=it-IT`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Errore HTTP: ${response.status}`);
  const data = await response.json();
  return data.results;
}

async function fetchDetail(id, type) {
  const url = `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=it-IT`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Errore HTTP: ${response.status}`);
  return response.json();
}