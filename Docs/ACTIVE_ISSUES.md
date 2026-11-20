# Active issues — Eat Your Veggies (Focus Phase)

Completed work is archived in Docs/CHANGELOG.md. Outstanding priorities restart at #1 here; permanent GitHub issue numbers remain unchanged.

1. **Verify all five core functions end-to-end in a real published browser** — parent setup, movement, collect/munch, restoration, save/replay, including recovery from damaged saves. **User action needed for external-device QA:** confirm whether the public game loads and identify any failed interaction. [GitHub issue #1](https://github.com/FatesPassage/eat-your-veggies/issues/1).
2. **Mobile and preschool usability verification** — touch input, sound, performance, accessibility and caregiver comprehension. [GitHub issue #2](https://github.com/FatesPassage/eat-your-veggies/issues/2).
3. **Executable gameplay regression tests** — replace substring-only assertions with browser interaction tests for saves, level changes, parent gate and victory.
4. **Remove legacy sparkle/story code safely** — after verifying the five core functions, eliminate unused logic.
5. **Offline and release verification** — cached Three.js, service worker, WebGL recovery and GitHub Actions/Pages status.

See Docs/PRODUCT_SCOPE.md. No real-world eating is required.
