# Movie App

Progetto d'esame, modulo Frontend JS @ ITS Tech Talent Factory, 2026.

Autore: Buzzi Corinna

Traccia: https://github.com/lukeku62/esame-frontend

---

## Devlog 

### Init repo e struttura cartelle

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

### HTML e CSS base

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