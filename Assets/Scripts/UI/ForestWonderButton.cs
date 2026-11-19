using EatYourVeggies.World;
using UnityEngine;
using UnityEngine.UI;

namespace EatYourVeggies.UI
{
    public static class ForestWonderButton
    {
        public static void Attach(ForestWonderController controller)
        {
            var canvas = Object.FindFirstObjectByType<Canvas>();
            if (canvas == null) return;
            var buttonObject = new GameObject("Find Wonder Button", typeof(RectTransform), typeof(Image), typeof(Button));
            buttonObject.transform.SetParent(canvas.transform, false);
            var rect = buttonObject.GetComponent<RectTransform>();
            rect.anchorMin = new Vector2(0.20f, 0.68f);
            rect.anchorMax = new Vector2(0.80f, 0.76f);
            rect.offsetMin = rect.offsetMax = Vector2.zero;
            buttonObject.GetComponent<Image>().color = new Color(0.98f, 0.84f, 0.46f);
            buttonObject.GetComponent<Button>().onClick.AddListener(controller.CollectNext);
            var labelObject = new GameObject("Find Wonder Label", typeof(RectTransform), typeof(Text));
            labelObject.transform.SetParent(buttonObject.transform, false);
            var label = labelObject.GetComponent<Text>();
            label.font = Resources.GetBuiltinResource<Font>("LegacyRuntime.ttf");
            label.text = "Find a Wonder Light";
            label.fontSize = 38;
            label.resizeTextForBestFit = true;
            label.resizeTextMinSize = 22;
            label.alignment = TextAnchor.MiddleCenter;
            label.color = new Color(0.12f, 0.23f, 0.15f);
            label.raycastTarget = false;
            var labelShadow = labelObject.AddComponent<Shadow>();
            labelShadow.effectColor = new Color(1f, 1f, 1f, 0.25f);
            labelShadow.effectDistance = new Vector2(0f, -2f);
            label.rectTransform.anchorMin = Vector2.zero;
            label.rectTransform.anchorMax = Vector2.one;
            label.rectTransform.offsetMin = label.rectTransform.offsetMax = Vector2.zero;

            var counterObject = new GameObject("Wonder Counter", typeof(RectTransform), typeof(Text));
            counterObject.transform.SetParent(canvas.transform, false);
            var counter = counterObject.GetComponent<Text>();
            counter.font = Resources.GetBuiltinResource<Font>("LegacyRuntime.ttf");
            counter.fontSize = 32;
            counter.resizeTextForBestFit = true;
            counter.resizeTextMinSize = 20;
            counter.alignment = TextAnchor.MiddleCenter;
            counter.color = Color.white;
            var counterOutline = counterObject.AddComponent<Outline>();
            counterOutline.effectColor = new Color(0.08f, 0.25f, 0.16f, 0.85f);
            counterOutline.effectDistance = new Vector2(2f, -2f);
            counter.rectTransform.anchorMin = new Vector2(0.16f, 0.77f);
            counter.rectTransform.anchorMax = new Vector2(0.84f, 0.82f);
            counter.rectTransform.offsetMin = counter.rectTransform.offsetMax = Vector2.zero;
            controller.Initialize(WonderMarker.FindObjects(), counter, buttonObject.GetComponent<Button>());
        }
    }

    /// <summary>Marker for optional visual collectibles.</summary>
    public sealed class WonderMarker : MonoBehaviour
    {
        public static GameObject[] FindObjects()
        {
            var markers = Object.FindObjectsByType<WonderMarker>(FindObjectsSortMode.None);
            var result = new GameObject[markers.Length];
            for (int i = 0; i < markers.Length; i++) result[i] = markers[i].gameObject;
            return result;
        }
    }
}
