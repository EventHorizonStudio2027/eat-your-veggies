# Development changelog

## 2026-11-19 — Batch 28: new-adventure integrity, visual guidance, mobile efficiency

- Fixed a cross-adventure state leak: changing the parent's vegetable choices now clears previous exploration secrets, while unchanged choices continue saved progress.
- Added four color-coded 3D garden signposts to help preschool players visually distinguish destinations.
- Reduced background CPU/GPU work by skipping 3D scene updates while the browser tab is hidden; reused a camera-follow vector rather than allocating one every frame.
- UI improvement: gently pulsing the vegetables required for the active garden makes the next action easier to discover, with reduced-motion support.
- Committed changes to GitHub; full deployed browser/mobile and CI verification are still outstanding.


## 2026-11-19 — Batch 27: lifecycle correctness and visible exploration
- Fixed replay lifecycle: returning to parent setup now stops discovery interactions; replay clears previously found secrets.
- Added explicit reset of repaired scenery between new adventures, while preserving collected discoveries on normal save/resume.
- Fixed a saved-progress regression discovered during implementation: world reset and discovery reset are separate, so reopening a saved game does not erase secrets.
- Added Space keyboard shortcut for munching when the game canvas/body is active.
- Interface improvement: introduced a lavender Secrets 0/6 counter, synced with saved discoveries and updated immediately on collection/reset.
- GitHub commits succeeded. Full deployed site/device QA and CI results are still unverified.

## Previous batches
- Parent-selected vegetables, toddler tap-to-walk and joystick, veggie munch-to-advance, magical world repairs, six persistent discoveries, Sprig animations, garden landmarks and butterflies, 2.5D follow camera, save/resume, victory/replay, garden journey UI, and GitHub Actions static checks.
