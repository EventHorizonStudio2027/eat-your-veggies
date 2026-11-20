# Development changelog

## 2026-11-19 — Batch 26: saved-state safety and companion personality
- Saved adventure immediately when opening parent settings or when the browser loses focus, reducing lost progress between periodic autosaves.
- Validated saved visible-vegetable indices with a bounded integer Set before restoring, making save loading more robust.
- Added a veggie-munched event and expressive bouncing/turning reactions for Sprig; stronger celebration for the garden's requested veggie, respecting reduced-motion settings.
- Hid legacy sparkle collectibles during the vegetable adventure to reduce clutter, preserving their previous visibility when leaving play.
- Interface improvement: added a compact parent-facing explanation of how device saving and vegetable-choice changes work; softened mobile score styling to free visual attention for exploration.
- All changes committed to GitHub. The local clone attempt could not resolve github.com, so live browser/mobile and CI verification remain open.

## Previous batches
- Parent-selected veggies, toddler joystick and tap-to-walk, in-game munch progression, animated garden repairs, six persistent discoveries, four distinct landmark sculptures, butterflies, 2.5D camera, save/resume, victory/replay, garden journey UI and GitHub Actions static checks.
