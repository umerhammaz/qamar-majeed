# QamarMajeed.exe

Fun brotherhood site for Qamar Majeed. **HTML + CSS + vanilla JS only.** Modular, plug-and-play.

## Run locally
- Serve over HTTP (fetch needs a server): `python3 -m http.server 8000` or VS Code Live Server.
- Open http://localhost:8000

## Feature = folder
Each feature lives in `src/features/<id>/` with `html` + `css` + `js`. Same contract: `default export { mount(root, ctx) }`.

## Turn a feature on/off
Edit `config/features.config.js`: set `enabled: false` to hide it. Delete the folder + config line to remove it permanently. Site keeps working.

## Add a new feature
1. Create `src/features/my-feature/` with `my-feature.html`, `.css`, `.js`.
2. Export `{ mount(root, ctx) }` from `.js`.
3. Add one entry to `config/features.config.js` with `html`, `css`, `module`, `order`.
4. Done — loader handles CSS inject, HTML fetch, and mount.

## Cross-feature comms
Use the event bus: `bus.emit("points:award", 5)`, `bus.on("points:award", fn)`. Never import one feature from another.

## Storage
Use `ctx.storage` (namespaced per feature): `ctx.storage.set("key", value)`.

## Sounds
Drop `.mp3` files in `assets/audio/` (`bhai.mp3`, `hmm.mp3`, `chai.mp3`, `lol.mp3`). Missing files are ignored gracefully.

## Secret
Click the navbar logo 5 times.