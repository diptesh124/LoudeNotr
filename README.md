# LoudNote 📣

**Say it once. Let everyone hear it.**

LoudNote is a public, anonymous message board built for people to speak up about issues that matter — police brutality, corruption, human rights, environmental concerns, public services, and more. Posts can be text, photos, voice notes, video links, or hand-drawn sketches, and everything is shown on a public feed that anyone can browse and filter.

The app is fully localized into **13 Indian languages** (English, Hindi, Bengali, Telugu, Marathi, Tamil, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese, and Urdu, including right-to-left layout support).

## ⚠️ A note on anonymity

Everything posted here is **public** — anyone, including government actors, can see it. LoudNote does not implement identity verification, encryption, or takedown/moderation tooling. Before deploying this for real-world use by at-risk individuals, you should think carefully about:
- Server-side anonymity (IP logging, hosting jurisdiction, metadata in uploaded photos/audio)
- Content moderation and abuse prevention
- Legal exposure for you as the operator, and for your users, in the jurisdictions where they live

This project is a UI/UX starting point, not a hardened whistleblowing platform.

## Features

- ✍️ **Five post types** — text, photo, voice note, video link (YouTube embed), and freehand sketch
- 🏷️ **Categorized posts** — Police Brutality, Corruption, Human Rights, Environment, Public Services, Other
- 🔍 **Filterable public feed** — by post type and by category
- 🌐 **13-language UI** — including full RTL support for Urdu
- 📱 **Mobile-first responsive design**
- 🎙️ **In-browser audio recording** (20-second cap) via `MediaRecorder`
- 🖼️ **Client-side image compression** before upload
- 🎨 **Freehand canvas drawing** with touch and mouse support

## Tech stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/) — build tool & dev server
- [lucide-react](https://lucide.dev/) — icon set

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (comes with Node)

### Installation

```bash
git clone https://github.com/<your-username>/loudnote.git
cd loudnote
npm install
```

### Run locally

```bash
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

The production build is output to `dist/`.

## Data storage

Posts are stored through a small `window.storage` key-value interface (`get`, `set`, `delete`, `list`), defined in `src/main.jsx`.

- **Inside Claude.ai artifacts:** `window.storage` is provided by the host environment and persists data across sessions, shared across all viewers of the artifact.
- **Everywhere else (this repo, self-hosted, etc.):** `main.jsx` falls back to the browser's `localStorage`. This means posts persist only in the browser they were created in — **not** synced across devices or visible to other users.

If you want a real shared public feed (multiple users posting/reading from anywhere), you'll need to replace the storage layer with an actual backend — for example a small Node/Express + database API, Supabase, or Firebase — and swap out the `window.storage` calls in `src/App.jsx` for calls to that backend.

## Project structure

```
loudnote/
├── index.html          # HTML entry point
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx        # React entry point + storage fallback
    └── App.jsx         # Main LoudNote component (all UI + logic)
```

## Customization

- **Add a language:** add a new entry to the `T` object in `src/App.jsx` and a matching entry in the `LANGS` array.
- **Add a category:** add a key to `CAT_KEYS`, an emoji to `CAT_EMOJI`, and translated labels to each language block in `T`.
- **Change the color theme:** colors are defined inline in the `styles` object at the bottom of `src/App.jsx` (look for the pink/yellow gradient values like `#ff2e88` and `#ffd23f`).

## License

Add a license of your choice (e.g., MIT) before publishing publicly.

## Contributing

Issues and pull requests are welcome. Please open an issue first to discuss significant changes.
