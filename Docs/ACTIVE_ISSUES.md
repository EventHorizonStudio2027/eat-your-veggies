# Active issues — Eat Your Veggies (Focus Phase)

Completed work is archived in Docs/CHANGELOG.md. Outstanding priorities restart at #1 here; permanent GitHub issue numbers remain unchanged.

1. **Prove the five core functions work end-to-end in the published game** — parent setup, movement, collection/munch, garden restoration, save/replay. **User input needed for external device QA:** open the public game and report whether it loads and which interaction fails, if any. [GitHub issue #1](https://github.com/FatesPassage/eat-your-veggies/issues/1).
2. **Real browser/mobile quality and preschool usability** — test touch controls, WebGL performance, accessible controls and child/caregiver comprehension. [GitHub issue #2](https://github.com/FatesPassage/eat-your-veggies/issues/2).
3. **Remove retired legacy code safely** — after core flow verification, delete hidden sparkle/story logic and reduce CPU/DOM complexity without breaking the 3D game.
4. **Reliable offline and recovery behavior** — verify cached Three.js, offline reload, failed asset handling and WebGL restoration.
5. **Release gate and regression testing** — add real browser-based smoke tests and confirm GitHub Actions and Pages publication.

See Docs/PRODUCT_SCOPE.md for the five-function contract. No real-world eating is required.
