# Development changelog

## 2026-11-20 — Focus Phase, Batch 48: five-function MVP and working-app discipline

- Defined a strict five-function product contract in Docs/PRODUCT_SCOPE.md: parent setup, explore, collect/munch, restore gardens, save/replay; includes acceptance criteria and explicit non-goals.
- Removed the unrelated sparkle quest, story carousel, welcome and companion panels from the visible game UI without breaking legacy DOM references.
- Hid the obsolete read-story and sparkle-restart buttons; retained parent settings and sound.
- Fixed fresh adventure spawn to match the canonical character spawn in web/main.js (-1.7, 0, 1).
- Added static CI guards for focused UI scope and correct spawn.
- Separate final visual polish committed after documentation.
- Source committed to GitHub; browser/device tests and published Pages status still require independent verification.


## 2026-11-20 — Batch 47: particle lifecycle, restored landmark glow, and chapter UI

- Fixed celebration particle cleanup: starting a new adventure now removes leftover transient particle meshes and clears the particle list; paused gameplay no longer starts a new celebration.
- Restored garden sculptures now receive a persistent soft emissive highlight that appears immediately on completion and resets for a new adventure.
- Isolated each sculpture crown's material so the emissive effect cannot accidentally recolor other scenery sharing the garden palette.
- Improved the in-game chapter banner and progress fill contrast, glass-like depth, and compact mobile fit.
- Expanded CI static assertions for celebration cleanup, isolated crown materials and completion glow.
- A separate extra final visual refinement is committed after this documentation update.
- Source changes committed; real-browser gameplay, live Pages deployment and GitHub Actions execution are not independently verified.


## 2026-11-20 — Batch 46: offline fallback, world performance and landmark clarity

- Fixed service-worker handling of transient HTTP 404/500 errors: use the previously cached working asset when available; rotated offline cache to veggieverse-v8.
- Reused a single geometry and base material for restoration fireflies instead of creating sixteen identical geometries.
- Corrected reduced-motion behavior so flower and discovery rotations reset to a stationary pose immediately.
- Added permanent, color-coded 3D pedestal landmarks at the four garden restoration sites to help young children recognize destinations.
- Updated static CI checks for cache version, HTTP fallback, shared firefly geometry, landmark creation and reduced-motion rotation.
- An independent final design polish follows this documentation update.
- All source changes saved to GitHub; CI execution, public deployment and real-device gameplay remain unverified.


## 2026-11-20 — Batch 45: victory overlay, Sprig expression and garden color identity

- Fixed the final garden celebration banner remaining visible over the victory dialog.
- Prevented Sprig's cheerful eye accents from briefly flashing before the first animation frame.
- Added a warm smile color change during Sprig's celebration reaction.
- Made restoration fireflies match the current garden's distinct color identity; shared material instances avoid recoloring all fireflies each frame.
- Expanded CI static checks for victory overlay cleanup and garden glow materials.
- An extra final UI polish is committed after this documentation update.
- Source saved to GitHub; public deployment, CI execution and browser QA remain unverified.


## 2026-11-20 — Batch 44: parent gate cleanup and world-aligned restoration markers

- Fixed an overlooked adult-hold unlock path that left held keyboard inputs and the tap destination active when opening parent settings.
- Corrected the Pea Party restoration firefly center to match the actual 3D party location at z=-5.
- Added four lightweight ground-level restoration halos, with progress-dependent opacity and distinct garden colors.
- Hide the halos when gameplay pauses and reset them with the world to avoid lingering effects.
- Expanded static CI assertions for parent-gate input cleanup, Pea Party placement and garden halos.
- One independent end-of-batch interface design polish is committed after documentation.
- Source committed to GitHub; browser gameplay and workflow execution still require verification.


## 2026-11-20 — Batch 43: garden restoration fireflies and reset reliability

- Added sixteen lightweight 3D restoration fireflies around the active garden; the effect grows with the chapter's repair progress and honors reduced-motion preferences.
- Reset bloom progress and hide restoration fireflies when starting a new adventure, preventing visual carryover.
- Hide the fireflies when exploration is paused, including while parent controls are open.
- Updated successful munch feedback to explicitly connect progress with the garden waking up.
- Interface improvement: improved objective line spacing, text wrapping and tabular progress numerals for readability.
- Expanded CI static checks for world restoration effects, pause state and fresh-world reset.
- One extra final visual change follows this documentation commit.
- Source committed to GitHub; browser playthrough and GitHub Actions results remain unverified.


## 2026-11-20 — Batch 42: new-adventure reset, input handoff and milestone clarity

- Reset the hero to the garden starting position and clear held inputs when a genuinely new adventure begins; saved adventures still restore their previous position.
- Make tapping a vegetable or the ground override stale keyboard/joystick movement so the tap-to-walk marker and actual movement agree.
- Clear held movement on game canvas blur, preventing unintended continued walking after keyboard focus changes.
- UI improvement: refine the four chapter milestones with compact responsive spacing, clearer active-garden highlight and completed-garden contrast.
- Extend static GitHub Actions assertions for new-game reset, input handoff and canvas blur behavior.
- An additional final visual refinement is committed after documentation as the last design pass.
- Source changes are committed to GitHub; live deployment, real-device playthrough and CI execution are still unverified.


## 2026-11-20 — Batch 41: tap-to-walk clarity, safe input lifecycle and targeted discovery

- Added a subtle 3D destination ring to show where tap-to-walk will lead, with gentle motion and reduced-motion support.
- Cleared destination indicators and movement state when opening parent controls, losing focus, backgrounding, winning or replaying.
- Tightened vegetable tap targeting to only currently selected, visible vegetable types.
- Extended static CI checks for the marker, targeting filter and victory movement reset.
- Extra end-of-batch visual polish: see the follow-on final design commit for an additional tactile HUD refinement.
- Source committed to GitHub. Actual browser gameplay, GitHub Actions results and mobile verification remain outstanding.


## 2026-11-20 — Batch 40: offline engine readiness, parent input safety and garden-themed UI

- Pre-cache the exact Three.js 0.170.0 module during service-worker installation when online; failure is non-fatal so game shell installation still succeeds. Bumped offline cache to veggieverse-v7.
- Clear keyboard and tap-to-walk movement state when pausing for parent controls, preventing unexpected movement after canceling the adult gate.
- Tag each completed garden's celebration with its vegetable type and give Carrot, Broccoli, Tomato and Pea their own coordinated, readable pastel palette.
- Extended static GitHub Actions checks for offline engine prefetch, parent input reset and themed celebration.
- Confirmed via GitHub issue fetch that permanent issues #1 and #2 remain open. The public GitHub Pages hostname still cannot be resolved from this runtime, so deployment, browser QA and workflow execution remain unverified.
- Interface improvement: garden-specific celebration colors communicate each completed chapter without adding permanent controls or occupying extra space.


## 2026-11-20 — Batch 39: expressive Sprig and more rewarding garden completion

- Added a reactive 3D smile and delighted eye accents to Sprig when the child collects or munches vegetables.
- Extended Sprig's celebration when a full garden is restored.
- Added a Sprig-centered sparkle burst alongside the existing garden repair celebration; respects reduced-motion preferences.
- UI improvement: compressed gameplay guidance into a softly translucent, readable status chip to use screen space more effectively.
- Extended static CI checks for Sprig's facial expression and completion reaction.
- All source changes committed to GitHub. Device QA, browser rendering and Actions execution remain unverified.


## 2026-11-20 — Batch 38: anti-softlock gameplay, offline responsiveness and accessible completion

- Added a goal-vegetable availability guard: after munching or loading a saved adventure, the game respawns enough missing goal vegetables to finish the current garden, avoiding a toddler-facing progression softlock.
- Updated service-worker network-first shell caching to fall back to an available cached copy after 2.5 seconds on a slow network, rather than waiting indefinitely; bumped cache to veggieverse-v6.
- Moved keyboard focus to the victory heading when the game ends, and back to the parent setup when replaying.
- UI improvement: garden restoration progress now uses a clearer pastel gradient, stronger track contrast and a subtle glow, without consuming more screen space; reduced-motion support retained.
- Expanded static CI assertions for the softlock guard, offline fallback, cache version and victory focus.
- All changes committed to main. Static assertions were authored but GitHub Actions execution and browser/device gameplay have not been independently verified.


## 2026-11-20 — Batch 37: restoration delight and adult-dialog accessibility

- Added keyboard focus containment in the adult confirmation dialog: Tab/Shift+Tab cycle between its two controls, while Escape cancels.
- Added a brief, unique on-screen garden repair celebration for all four gardens (flowers, bridge, fountain, party) and automatically dismiss it.
- Reset stale celebration banners when a new adventure starts, and made the banner respect reduced-motion preferences.
- Improved interface use of space: celebration floats over the 3D world without permanently enlarging the HUD; corrected invalid adult button font shorthand.
- Extended CI static checks for adult-dialog focus containment and garden completion feedback.
- All source changes committed to GitHub. Public Pages hostname resolution failed from the container, so live gameplay and Actions run status remain unverified.


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
