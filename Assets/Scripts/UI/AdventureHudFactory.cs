using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;
using UnityEngine.InputSystem.UI;

namespace EatYourVeggies.UI
{
    /// <summary>Builds a touch-first prototype UI without requiring prefab assets.</summary>
    public static class AdventureHudFactory
    {
        public static AdventureHud Create()
        {
            if (Object.FindFirstObjectByType<EventSystem>() == null)
            {
                var events = new GameObject("UI Event System", typeof(EventSystem), typeof(InputSystemUIInputModule));
                events.GetComponent<InputSystemUIInputModule>().AssignDefaultActions();
            }

            var canvasObject = new GameObject("Adventure HUD", typeof(Canvas), typeof(CanvasScaler), typeof(GraphicRaycaster));
            var canvas = canvasObject.GetComponent<Canvas>();
            canvas.renderMode = RenderMode.ScreenSpaceOverlay;
            var scaler = canvasObject.GetComponent<CanvasScaler>();
            scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            scaler.referenceResolution = new Vector2(1080, 1920);
            scaler.screenMatchMode = CanvasScaler.ScreenMatchMode.MatchWidthOrHeight;
            scaler.matchWidthOrHeight = 0.5f;

            var panel = new GameObject("Story Panel", typeof(RectTransform), typeof(Image));
            panel.transform.SetParent(canvasObject.transform, false);
            var rect = panel.GetComponent<RectTransform>();
            rect.anchorMin = new Vector2(0.05f, 0.04f);
            rect.anchorMax = new Vector2(0.95f, 0.30f);
            rect.offsetMin = rect.offsetMax = Vector2.zero;
            panel.AddComponent<SafeAreaPanel>();
            panel.GetComponent<Image>().color = new Color(0.10f, 0.24f, 0.19f, 0.94f);

            var narration = MakeText(panel.transform, "Story Narration", "Welcome to Broccoli Forest!", 44);
            var nr = narration.rectTransform;
            nr.anchorMin = new Vector2(0.07f, 0.38f);
            nr.anchorMax = new Vector2(0.93f, 0.94f);
            nr.offsetMin = nr.offsetMax = Vector2.zero;
            narration.alignment = TextAnchor.MiddleCenter;
            narration.color = Color.white;
            narration.resizeTextForBestFit = true;
            narration.resizeTextMinSize = 24;

            var buttonObject = new GameObject("Continue Button", typeof(RectTransform), typeof(Image), typeof(Button));
            buttonObject.transform.SetParent(panel.transform, false);
            var br = buttonObject.GetComponent<RectTransform>();
            br.anchorMin = new Vector2(0.22f, 0.06f);
            br.anchorMax = new Vector2(0.78f, 0.36f);
            br.offsetMin = br.offsetMax = Vector2.zero;
            buttonObject.GetComponent<Image>().color = new Color(0.98f, 0.78f, 0.29f);
            var button = buttonObject.GetComponent<Button>();
            var buttonLabel = MakeText(buttonObject.transform, "Button Label", "Continue", 42);
            buttonLabel.color = new Color(0.16f, 0.25f, 0.18f);
            buttonLabel.alignment = TextAnchor.MiddleCenter;
            buttonLabel.rectTransform.anchorMin = Vector2.zero;
            buttonLabel.rectTransform.anchorMax = Vector2.one;
            buttonLabel.rectTransform.offsetMin = buttonLabel.rectTransform.offsetMax = Vector2.zero;

            var hud = canvasObject.AddComponent<AdventureHud>();
            hud.Configure(narration, button, buttonLabel);
            return hud;
        }

        private static Text MakeText(Transform parent, string name, string value, int size)
        {
            var go = new GameObject(name, typeof(RectTransform), typeof(Text));
            go.transform.SetParent(parent, false);
            var text = go.GetComponent<Text>();
            text.font = Resources.GetBuiltinResource<Font>("LegacyRuntime.ttf");
            text.fontSize = size;
            text.text = value;
            text.raycastTarget = false;
            return text;
        }
    }
}
