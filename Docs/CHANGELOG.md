# Development changelog

## 2026-11-19 — Batch 30: keyboard access, HUD clarity and stronger CI

- Made the 3D game canvas keyboard-focusable with explicit arrow/WASD/Space instructions and a relationship to the live gameplay status.
- Focus now moves into the game when the adventure starts and returns to the first parent vegetable checkbox when Parent Settings is opened.
- Improved the objective/status pill's readability on small screens, refined translucent objective styling and added a clear keyboard focus ring.
- Strengthened GitHub Actions static validation: detect duplicate HTML IDs, require keyboard canvas access and live status semantics, and verify game modules exist in the service-worker shell.
- Corrected the duplicate-ID check to use a simple reliable attribute matcher.
- Changes committed to GitHub. Workflow wrapper returned no pull-request runs for the latest push; CI execution and live device testing remain unverified.


## 2026-11-19 — Batch 29: accessible objectives, stable state and polish

- Added assistive-technology progress semantics to the garden repair bar, including the correct dynamic goal count and spoken value text for each vegetable garden.
- Added an accessible label and polite announcement behavior to the Munch action.
- Added a final parent-selection safety improvement: saved exploration secrets reset when the parent changes the vegetable selection, while the same selection resumes its saved journey.
- Added four color-coded garden signposts as wayfinding landmarks, improving the sense of place without adding text-heavy UI.
- Improved rendering efficiency by pausing scene updates while the page is hidden and reusing the camera-follow vector.
- Interface improvement: the currently required vegetable now gently pulses, directing toddlers toward the next useful action; respects reduced-motion preference.
- GitHub commits succeeded. No pull-request workflow runs were returned for the latest commit; this does not establish push CI success. Live browser and device testing remain open.


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
