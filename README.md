# CRASHOUT V1.3.11

Full-repository snapshot of the Crashout mobile web app.

## Current features

- Three launch settings: Bar, Pregame, and Anywhere
- Waterfall-style setting menu animation on every app launch
- Mobile multi-touch finger selection
- White ring-to-solid-circle lock animation
- Random gradient theme on each restart
- Persistent shuffled prompt decks per setting
- No prompt repeats until the active setting deck is exhausted
- iPhone Home Screen safe-area fix
- Installable Progressive Web App with offline caching
- Custom Crashout app icons

## Prompt bank

- Total cards: 126
- Bar pool: 103
- Pregame pool: 111
- Anywhere pool: 73

The internal setting key for the Pregame button is `pregame-house`, because the
Pregame pool also contains prompts suitable for house parties.

## Required repository structure

```text
CRASHOUT-V1.3.5/
├── index.html
├── styles.css
├── app.js
├── prompts.js
├── manifest.webmanifest
├── service-worker.js
├── VERSION.txt
├── README.md
└── assets/
    ├── icon-192.png
    ├── icon-512.png
    └── crashout-logo-gradient-centered.png
```

## Deploying

Upload the contents of this folder to the root of the GitHub repository.
Cloudflare Pages should use:

- Framework preset: None
- Build command: `exit 0`
- Build output directory: `.`
- Production branch: `main`

## Important baseline note

Treat this package as the stable V1.3.5 restore point. Future changes should be
applied on top of this version unless a newer stable snapshot replaces it.


## V1.3.6 changes

- Once the finger circles begin pulsing, the selection is committed.
- Players may lift their fingers during the pulse without resetting the round.
- The launch menu now uses the submitted Crashout logo instead of the small text wordmark.
- The logo exits with the rest of the setting menu after a setting is selected.


## V1.3.7 changes

- Added 14 user-approved high-chaos prompts.
- Added 6 Bar-only prompts.
- Added 8 Pregame-only prompts.
- Prompt decks automatically rebuild because the bank signature changed.


## V1.3.8 changes

- Added 12 user-approved interactive drinking cards.
- Added 11 Pregame drinking/group cards.
- Added 1 Bar drinking card.
- All drinking instructions refer to one normal sip unless the group chooses otherwise.
- Prompt decks automatically rebuild because the bank signature changed.


## V1.3.9 changes

- Replaced the broken launch-menu logo with the exact user-supplied PNG.
- The image is stored unchanged as `assets/crashout-menu-logo.png`.
- Updated the HTML reference and service-worker cache.
- Used a new asset filename and cache version to bypass the previous missing-image cache.


## V1.3.10 changes

- Embedded the exact user-supplied PNG directly inside `index.html`.
- Removed the external launch-menu logo dependency.
- Positioned the logo small at the top center of the setting menu.
- This prevents missing-image icons caused by asset paths or stale caches.


## V1.3.11 changes

- Removed the black background from the exact supplied menu logo PNG.
- Preserved the white logo artwork and anti-aliased edges.
- Embedded the transparent PNG directly inside `index.html`.
- Removed the CSS blend mode because the image now has true transparency.
