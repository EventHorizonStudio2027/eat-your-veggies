# Eat Your Veggies — Product contract (Focus Phase)

## Product promise
A preschooler explores a gentle 3D world, finds and munches virtual vegetables, and watches four gardens recover. Parents choose which vegetables are included. **No real-world food consumption is required.** All progress remains local to the device; no account, payment, or backend is needed for the MVP.

## Exactly five core functions
1. **Parent setup**: choose one or more vegetable types, start the game, and reach settings through the adult-hold gate. Verify selection persistence and changing selections starts a fresh adventure.
2. **Explore**: move with a touch joystick, tap-to-walk, or arrow/WASD keyboard controls; moving and tapping must not conflict. Pause/blur must release input.
3. **Collect and munch**: collect visible selected veggies by proximity, show basket feedback, and consume the appropriate veggie using the munch button or Space. No dead ends if required veggies run out.
4. **Restore gardens**: correct munches increase a visible progress bar, update the corresponding world feature, celebrate completion, and eventually show the victory screen. All four garden types must be playable in any parent-selected subset.
5. **Save and replay**: reload resumes the same selection, progress, basket, remaining veggies, position and repaired gardens. A new adventure must reset all game state and visuals.

## Not in the focused MVP
- Legacy eight-sparkle quest, unrelated story-carousel controls and collectible side goals are not part of the core experience. Hide the retired UI; remove dead implementation only after the five functions are verified end-to-end.
- No user accounts, cloud saves, leaderboards, payments, social features, real-world eating checks, or analytics tracking.
- Decorative upgrades must not displace fixes, tests or preschool usability.

## Definition of done
- Every visible control works in a real browser, on desktop and touch devices.
- Test each parent selection (single veggie and all four), start, collection, munch, restoration, victory, replay, save/resume, focus loss, parent gate, and offline reload.
- Test on mobile and desktop; check console errors, WebGL recovery, accessibility and frame rate.
- Confirm GitHub Actions and GitHub Pages deployment; source assertions alone do **not** count as gameplay verification.
- Keep completed issues in CHANGELOG; restart remaining priorities at #1 in ACTIVE_ISSUES.

## Release blockers
GitHub issue #1: verify public deployment and live gameplay. GitHub issue #2: production artwork, device performance and preschool usability. No release-complete claim until tested.
