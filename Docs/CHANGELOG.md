# Development changelog

## 2026-11-19 — Batch 24: priority bug fixes and garden identity

- Fixed major interface overlap: the legacy sparkle quest, story panel, companion panel and welcome panel no longer obstruct the toddler's vegetable adventure while playing. Gameplay HUD is hidden until a parent starts the game.
- Fixed discovery notifications triggering before the parent starts: discoveries now require an active game state and stop during settings/victory.
- Added four distinct 3D storybook garden landmark sculptures with stage-aware scaling and palette variations, giving each garden a clearer visual identity.
- Added a GitHub Actions game-quality workflow to check JavaScript syntax, required DOM IDs, vegetable types and service worker cache entries on pushes and pull requests.
- Tuned small-screen level card spacing and game-control placement to reclaim usable world space.
- Changes committed to GitHub; live gameplay and CI results still require independent verification.

## Previous batches
- Parent vegetable selection, toddler joystick and tap-to-walk, veggie pickup and munch-to-advance, four magical repairs, six discoveries, 2.5D follow camera, save/resume, victory/replay, garden journey UI and PWA shell.
