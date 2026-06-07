# Movie App

Progetto d'esame, modulo Frontend JS @ ITS Tech Talent Factory, 2026.

Autore: Buzzi Corinna

Traccia: https://github.com/lukeku62/esame-frontend

---

# Devlog 

## 0 — Init repo e struttura cartelle

Creata la repo e la struttura base del progetto:

```
movie-app/
├── index.html
├── movies.html
├── series.html
├── profile.html
├── css/
│   └── style.css
└── js/
    ├── config.js
    ├── api.js
    ├── main.js
    ├── movies.js
    └── series.js
```

## 1 — HTML e CSS

Creati `index.html` e `css/style.css` con i minimi requisiti strutturali:

- `<header>` con navbar e link alle pagine
- `<main>` con due sezioni: `#movies-grid` e `#series-grid`
- `<footer>`
- CSS: reset, dark background, griglia card con `auto-fill`, stile card minimale, media query per mobile

### Redesign e SSOT definition

Ridefinita l'estetica e stabilita la SSOT visiva tramite CSS custom properties:

**Palette**

- Background: `#0e0c0f`
- Accent: `#c41e3a`
- Testo primario: `#f0eef5`

**Font**

- Display (titoli, logo, h2): `DM Serif Display`
- Corpo (nav, testo, card): `DM Sans`

**Scelte stilistiche**

- Hero con titolo display grande, `<em>` in rosso corsivo, nessun gradiente
- Sezioni separate da `border-top` sottile
- Navbar con `backdrop-filter: blur(8px)`
- Card: `border-radius: 4px`, hover solo `translateY(-3px)`

---

## 2 — JS e fetch TMDB

### config.js

Creato `js/config.js` con la costante `API_KEY`. File escluso da Git.

### api.js

Creato `js/api.js` con:

- Costanti `BASE_URL` e `IMG_BASE_URL`
- `fetchTrendingMovies()` → `/trending/movie/day`
- `fetchTrendingSeries()` → `/trending/tv/day`
- `fetchPopularMovies()` → `/movie/popular`
- `fetchPopularSeries()` → `/tv/popular`

### main.js

Creato `js/main.js` con:

- `createCard(item, type)` — genera un `<div class="card">` con poster (o placeholder) + titolo + anno
- `renderCards(items, gridId, type)` — svuota il grid e appende le card
- `init()` — funzione `async` che chiama `fetchTrendingMovies` e `fetchTrendingSeries` con `try/catch` separati, mostra messaggio di errore inline in caso di fallimento
- `init()` chiamata direttamente a fine file

### movies.js e series.js

Creati `js/movies.js` e `js/series.js` con:

- `createCard(item, type)` — identica a quella in `main.js` (duplicazione consapevole, no moduli)
- `init()` — chiama rispettivamente `fetchPopularMovies` e `fetchPopularSeries` con `try/catch`
- `init()` chiamata direttamente a fine file

---

## 3 — profile.html

Creata `profile.html` con:

- Hero con nome autore
- Header profilo: avatar con iniziali, nome, data iscrizione, link GitHub
- Griglia profili: card con iniziali, stato attivo, card "Aggiungi" con bordo tratteggiato
- Sezione bio con testo placeholder
- Nessuna chiamata API — pagina interamente statica
- CSS aggiunto a `style.css`: `.profile-header-section`, `.profile-avatar-large`, `.profile-grid`, `.profile-card`, `.profile-badge`
