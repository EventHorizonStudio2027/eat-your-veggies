# Development changelog

## 2026-11-20 — Batch 36: keyboard regression fix, stable animations and clear parent hold

- Fixed a real gameplay regression: the canvas receives keyboard focus on start, but Space previously worked only with body focus. Arrow/WASD movement and Space-to-munch now work when the game canvas is focused; game shortcuts do not activate while interacting with setup or other controls.
- Fixed long-session Pea Party balloon vertical drift by animating around each balloon's original height instead of accumulating position deltas every frame.
- Added a visual fill meter directly inside the grown-up three-second hold button; releasing resets the fill.
- Strengthened CI checks for canvas-focused keyboard handling, fixed-height balloon animation, and visual parent-gate progress.
- UI improvement: the grown-up confirmation button now visibly fills as it is held, improving clarity without adding a separate progress widget.
- Source committed to GitHub. GitHub Pages live verification was attempted but the runtime could not resolve the public hostname; device gameplay and workflow execution remain unverified.


## 2026-11-19 — Batch 35: distinctive garden restoration and safer adult gate

- Parent checkpoint: cancel an in-progress hold on window blur, hidden tab, or Escape, preventing a hold from completing while the parent is away.
- Tomato Town: added eight animated fountain droplets that appear and rise as restoration progresses, remaining active after the fountain is repaired.
- Broccoli Grove: added six bridge posts and two long railings that rise alongside the bridge planks, creating a clearer, complete repair.
- Pea Party: added a nine-light colorful garland that gradually illuminates as the party is restored; animation respects reduced-motion settings.
- UI/accessibility: simplified adult hold countdown to whole seconds, avoiding excessive screen-reader live announcements.
- CI: added checks for the three garden-specific repair animations. All source changes committed to GitHub; live deployment/device QA and GitHub Actions execution remain unverified.


## 2026-11-19 — Batch 34: parent-only checkpoint and safer toddler navigation

- Added a dedicated grown-up checkpoint before parent settings can open. The adult must press and hold for three seconds; both pointer and keyboard input are supported.
- Pauses the adventure behind the checkpoint, saves current progress before opening it, and resumes safely if the adult cancels.
- Added cancellation handling for pointer release/cancel and keyboard key release so a child cannot accidentally complete a partial hold.
- Added a calm, high-contrast frosted checkpoint with one prominent hold action and a clear back button.
- Strengthened GitHub Actions static checks for parent-gate markup, hold lifecycle, keyboard and cancellation paths.
- Corrected button font declarations to valid CSS font shorthand.
- Interface improvement: parent settings now feel like a distinct, protected adult space instead of a normal in-game button.
- Changes committed to GitHub. CI execution and live deployment/device QA are not independently verified; the public Pages URL could not be inspected through the available browser fetch.


## 2026-11-19 — Batch 33: device-aware rendering and graceful graphics recovery

- Added device-aware renderer quality: antialiasing and pixel ratio are tuned using device memory, CPU core count and viewport size to reduce GPU load on modest phones/tablets.
- Added WebGL context-loss/restoration listeners. If a device loses its graphics context, the game now displays a friendly recovery message and a clear reload action rather than silently leaving a blank canvas.
- Polished the recovery overlay with a soft frosted-glass treatment and prominent, accessible retry button.
- Bumped the service-worker cache to veggieverse-v5 so returning players receive the updated renderer and recovery UI.
- Strengthened GitHub Actions static checks for WebGL recovery hooks, recovery UI wiring and the expected cache version.
- UI improvement: recovery state now uses a calm, parent-readable overlay with a single obvious action, keeping technical errors away from toddler-facing copy.
- GitHub commits succeeded. The workflow wrapper returned no pull-request runs for the main-branch commit; CI result and actual mobile/device behavior remain unverified.


## 2026-11-19 — Batch 32: preserve vegetable shapes, companion pickup reactions and accessibility

- Fixed target-vegetable animation to scale from each model's authored base dimensions, preserving carrot/broccoli/tomato/pea proportions.
- Added a dedicated veggie-collected event. Sprig now reacts when the toddler finds a vegetable, with a stronger celebration when it matches the active garden goal; existing munch reactions remain.
- Added polite, atomic announcements for found and munched totals so assistive technology can track the child's inventory and progress.
- Strengthened GitHub Actions static checks to require the progressbar semantics and the vegetable interaction/adventure reset event hooks.
- Interface improvement: pickup and munch counters are now assistive-technology live regions without adding visual clutter to the game HUD.
- GitHub commits succeeded; Actions run result and live Pages/device testing are not independently verified.


## 2026-11-19 — Batch 31: preserve vegetable art, garden wayfinding and offline freshness

- Fixed a visual regression in target-vegetable pulsing: pulse scaling now multiplies each model's authored base scale, preserving the distinct proportions of carrots, broccoli, tomatoes and peas.
- Made destination signposts respond to the current garden: the active destination is larger and gently pulses, completed areas remain visually distinct, and reset restores the neutral state.
- Corrected garden progress accessibility semantics by placing the progressbar role and live value on the visible progress track rather than its decorative fill child.
- Bumped the service-worker cache version to v4 so existing installs fetch the latest shell and game modules rather than retaining the prior cache namespace.
- UI improvement: stronger active-destination wayfinding makes the next garden more obvious without adding another text panel.
- Changes committed to GitHub; CI execution, Pages deployment and real-device QA are still not independently verified.


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
