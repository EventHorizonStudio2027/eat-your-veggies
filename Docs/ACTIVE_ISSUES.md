# Active issues — Eat Your Veggies (Focus Phase)

Completed work is archived in Docs/CHANGELOG.md. Outstanding priorities restart at #1 here; permanent GitHub issue numbers remain unchanged.

1. **Live end-to-end gameplay verification** — prove parent setup, movement, collection/munch, restoration, save/replay and updated v9 cache work on the published site. **User input required for real-device QA:** open the public game and report whether starting, moving and collecting work. [GitHub issue #1](https://github.com/FatesPassage/eat-your-veggies/issues/1).
2. **Mobile/preschool usability verification** — touch controls, performance, accessible feedback and caregiver comprehension. [GitHub issue #2](https://github.com/FatesPassage/eat-your-veggies/issues/2).
3. **Executable browser regression tests** — replace static substring checks with actual gameplay tests for save/resume, garden transitions, adult gate and victory.
4. **Remove hidden legacy sparkle/story logic safely** — reduce unused code after verifying the five core functions.
5. **Offline and release readiness** — verify service-worker v9 activation, Three.js caching, WebGL recovery and GitHub Actions/Pages status.

See Docs/PRODUCT_SCOPE.md. No real-world eating is required.

## Deployment and reliability pass — 2026-11-23
- Correct Pages setting is **GitHub Actions**, not Deploy from a branch; deployment workflow exists at `.github/workflows/deploy-pages.yml`.
- Workflow now triggers when `sw.js`, `manifest.webmanifest`, or `tests/**` changes, and runs dependency-free static entry/asset smoke checks before publishing.
- Keyboard focus visibility on the game canvas improved.
- **Not verified:** GitHub Actions result, live public site, mobile play, and WebGL execution. Static smoke checks are not a substitute for browser gameplay testing.
- **User input needed if Pages is not enabled:** select Settings → Pages → Source → GitHub Actions; report any GitHub Pages authorization or environment approval error.

## Interaction reliability pass — 2026-11-23
Completed this iteration (separate from the numbered open issues):
- Save current adventure when the page is backgrounded or closed, not only on collection/munch.
- Bound restored counters and validate restored basket items.
- Correct the tomato's calyx leaf orientation for a more recognizable silhouette.
- Reduce the garden goal panel on short/landscape and narrow screens.
- Add static smoke assertions for persistence and HUD safeguards; finish with a softer, higher-contrast garden goal panel.

Verification gap: commits and code checks exist, but real browser execution, GitHub Actions success, deployment and device QA are not yet confirmed. Open issues #1–#5 remain active until verified.

## Joystick and HUD interaction pass — 2026-11-23
Completed in source: joystick ignores presses outside active gameplay; unrelated pointer release events no longer cancel the active joystick; delayed gameplay status text no longer overwrites parent-settings state; static regression assertions added; joystick touch/focus affordance refined. Browser/device execution still requires verification. Active issues #1–#5 remain open.

## Touch and navigation cleanup — 2026-11-23
- Fixed active joystick pointer ownership: a second finger no longer takes control away from the first.
- Clear the tap-to-move destination ring immediately upon arrival or manual movement.
- Added source-level regression assertions; mobile score chips now occupy less space.
- Still unresolved: executable real-browser regression tests, successful published deployment verification, and real-device controls. These changes are committed but not proven in a live game session.

## Gameplay popups — 2026-11-23
- User-reported: gameplay overlays obstruct the central playfield.
- Implemented: reposition persistent status, transient toast, and garden celebration to peripheral compact layouts; mobile and short-landscape overrides added.
- Added static regression assertions. Still needs real mobile/desktop visual verification and user confirmation; do not mark resolved until observed in a deployed game.

## Gameplay popup follow-up — 2026-11-23
- Idle guidance no longer remains onscreen indefinitely: active messages dismiss after 2.6 seconds; opening parent settings dismisses them immediately.
- Service worker shell cache bumped to v10 to replace older UI styles on refresh/revisit.
- Static assertions added for notification visibility and cache version. Not yet browser-tested; visual QA and deployment verification remain open.

## Gameplay transition and touch pass — 2026-11-23
Completed in source (awaiting browser verification): ignore secondary pointer touches on the 3D canvas; guard zero-size canvas raycasts; clear transient notices on start/replay/victory; reclaim mobile space by hiding secondary discovery counter during play; add static regression guards. Active issues #1–#5 remain open because runtime and device verification have not occurred.
