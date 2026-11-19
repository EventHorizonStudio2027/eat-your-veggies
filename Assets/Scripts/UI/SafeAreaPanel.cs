using UnityEngine;

namespace EatYourVeggies.UI
{
    /// <summary>Keeps bottom story controls above device home indicators and notches.</summary>
    [RequireComponent(typeof(RectTransform))]
    public sealed class SafeAreaPanel : MonoBehaviour
    {
        private RectTransform rect;
        private Rect previousSafeArea;
        private Vector2Int previousSize;

        private void Awake() { rect = GetComponent<RectTransform>(); Apply(); }
        private void Update()
        {
            if (previousSafeArea != Screen.safeArea || previousSize.x != Screen.width || previousSize.y != Screen.height)
                Apply();
        }

        private void Apply()
        {
            if (Screen.width <= 0 || Screen.height <= 0) return;
            previousSafeArea = Screen.safeArea;
            previousSize = new Vector2Int(Screen.width, Screen.height);
            var safeBottom = Screen.safeArea.yMin / Screen.height;
            rect.anchorMin = new Vector2(0.05f, Mathf.Max(0.04f, safeBottom + 0.015f));
            rect.anchorMax = new Vector2(0.95f, Mathf.Min(0.55f, rect.anchorMin.y + 0.26f));
        }
    }
}
