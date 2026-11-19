using EatYourVeggies.Adventure;
using EatYourVeggies.UI;
using UnityEngine;

namespace EatYourVeggies.World
{
    /// <summary>Playable prototype built entirely from primitives; replace with authored art later.</summary>
    public sealed class BroccoliForestBootstrap : MonoBehaviour
    {
        [SerializeField] private AdventureHud hud;
        private void Start()
        {
            BuildWorld();
            if (hud == null) hud = AdventureHudFactory.Create();
            hud.Bind(BroccoliIntro.Create());
            var wonderController = new GameObject("Forest Wonder Controller").AddComponent<ForestWonderController>();
            ForestWonderButton.Attach(wonderController);
            var sprig = FindFirstObjectByType<SprigCompanion>();
            if (sprig != null) wonderController.WonderCollected += sprig.Celebrate;
        }

        private void BuildWorld()
        {
            var floor = GameObject.CreatePrimitive(PrimitiveType.Plane);
            floor.name = "Forest Clearing";
            floor.transform.localScale = new Vector3(4f, 1f, 4f);
            Colorize(floor, new Color(0.39f, 0.72f, 0.42f));
            for (int i = 0; i < 9; i++)
            {
                float angle = i * Mathf.PI * 2f / 9f;
                float x = Mathf.Cos(angle) * 13f;
                float z = Mathf.Sin(angle) * 13f;
                CreateTree(new Vector3(x, 0f, z), i);
            }
            var hero = GameObject.CreatePrimitive(PrimitiveType.Capsule);
            hero.name = "Little Hero";
            hero.transform.position = new Vector3(0f, 1f, 0f);
            Colorize(hero, new Color(0.96f, 0.75f, 0.34f));
            CreateFireflies();
            CreateSprig();

            if (Camera.main == null)
            {
                var cameraObject = new GameObject("Adventure Camera");
                cameraObject.tag = "MainCamera";
                cameraObject.AddComponent<Camera>();
                cameraObject.AddComponent<AudioListener>();
            }
            Camera.main.transform.position = new Vector3(0f, 12f, -17f);
            Camera.main.transform.LookAt(new Vector3(0f, 1f, 0f));
            if (FindFirstObjectByType<Light>() == null)
            {
                var lightObject = new GameObject("Warm Sunlight");
                var sunlight = lightObject.AddComponent<Light>();
                sunlight.type = LightType.Directional;
                sunlight.intensity = 1.3f;
                lightObject.transform.rotation = Quaternion.Euler(48f, -25f, 0f);
            }
        }

        private static void CreateSprig()
        {
            var sprig = new GameObject("Sprig - Broccoli Companion");
            sprig.transform.position = new Vector3(2.4f, 1.1f, 0.4f);
            var stem = GameObject.CreatePrimitive(PrimitiveType.Capsule);
            stem.name = "Sprig Stem";
            stem.transform.SetParent(sprig.transform, false);
            stem.transform.localScale = new Vector3(0.65f, 0.65f, 0.65f);
            Colorize(stem, new Color(0.50f, 0.83f, 0.34f));
            for (int i = 0; i < 3; i++)
            {
                var crown = GameObject.CreatePrimitive(PrimitiveType.Sphere);
                crown.name = "Sprig Floret " + i;
                crown.transform.SetParent(sprig.transform, false);
                crown.transform.localPosition = new Vector3((i - 1) * 0.48f, 0.65f + (i == 1 ? 0.3f : 0f), 0f);
                crown.transform.localScale = Vector3.one * 0.95f;
                Colorize(crown, new Color(0.20f, 0.66f, 0.31f));
            }
            sprig.AddComponent<SprigCompanion>();
        }

        private static void CreateFireflies()
        {
            for (int i = 0; i < 8; i++)
            {
                float angle = i * Mathf.PI * 2f / 8f;
                var glow = GameObject.CreatePrimitive(PrimitiveType.Sphere);
                glow.name = "Wonder Light " + (i + 1);
                glow.transform.position = new Vector3(Mathf.Cos(angle) * 5f, 2.1f + (i % 3) * 0.4f, Mathf.Sin(angle) * 5f);
                glow.transform.localScale = Vector3.one * 0.35f;
                var collider = glow.GetComponent<Collider>();
                if (collider != null) Object.Destroy(collider);
                Colorize(glow, new Color(1f, 0.88f, 0.32f));
                glow.AddComponent<ForestSparkle>();
                glow.AddComponent<WonderMarker>();
            }
        }

        private static void CreateTree(Vector3 position, int index)
        {
            var trunk = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
            trunk.name = "Tree " + index + " Trunk";
            trunk.transform.position = position + Vector3.up * 1.7f;
            trunk.transform.localScale = new Vector3(0.55f, 1.7f, 0.55f);
            Colorize(trunk, new Color(0.48f, 0.31f, 0.2f));
            var crown = GameObject.CreatePrimitive(PrimitiveType.Sphere);
            crown.name = "Tree " + index + " Crown";
            crown.transform.position = position + Vector3.up * 4f;
            crown.transform.localScale = new Vector3(3.4f, 3.1f, 3.4f);
            Colorize(crown, new Color(0.2f, 0.58f + (index % 3) * 0.05f, 0.27f));
        }

        private static void Colorize(GameObject target, Color color)
        {
            var renderer = target.GetComponent<Renderer>();
            var material = new Material(Shader.Find("Universal Render Pipeline/Lit") ?? Shader.Find("Standard"));
            material.color = color;
            renderer.material = material;
        }
    }
}
