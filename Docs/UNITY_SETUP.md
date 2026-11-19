# Unity editor verification checklist

1. Clone this repository and open its root folder in Unity Hub.
2. Install Unity 6 editor matching ProjectSettings/ProjectVersion.txt, or allow Hub to migrate the project.
3. Let the package manager resolve dependencies. If it fails, record the package and editor version.
4. In Unity choose **Eat Your Veggies > Create Broccoli Forest Prototype**.
5. Open Assets/Scenes/BroccoliForest.unity if not already active and press Play.
6. Confirm the 3D clearing, hero, narration card, and Continue button are visible.
7. Tap Continue through the entire story without any real-world food interaction.
8. Run EditMode tests in Window > General > Test Runner.
9. Report console errors and screenshots. No test results have been claimed yet.

The generated prototype is not a finished game, has placeholder geometry, and needs supervised child UX testing.
