using UnityEngine;
using UnityEngine.UI;
using System;

namespace EatYourVeggies.World
{
    /// <summary>Optional tactile forest discovery. Never gates story progression.</summary>
    public sealed class ForestWonderController : MonoBehaviour
    {
        public event Action<int, int> WonderCollected;
        private int collected;
        private Text counter;
        private Button collectButton;
        private GameObject[] wonders;

        public void Initialize(GameObject[] objects, Text counterText, Button button)
        {
            wonders = objects;
            counter = counterText;
            collectButton = button;
            Refresh();
        }

        public void CollectNext()
        {
            if (wonders == null) return;
            foreach (var wonder in wonders)
            {
                if (wonder != null && wonder.activeSelf)
                {
                    Collect(wonder);
                    return;
                }
            }
        }

        public void Collect(GameObject wonder)
        {
            if (wonders == null || wonder == null || !wonder.activeSelf) return;
            if (System.Array.IndexOf(wonders, wonder) < 0) return;
            wonder.SetActive(false);
            collected++;
            Refresh();
            WonderCollected?.Invoke(collected, wonders.Length);
        }

        private void Refresh()
        {
            if (counter == null) return;
            if (collectButton != null) collectButton.interactable = wonders != null && collected < wonders.Length;
            int total = wonders == null ? 0 : wonders.Length;
            counter.text = collected >= total && total > 0
                ? "The forest is sparkling!"
                : "Wonder lights: " + collected + " / " + total;
        }
    }
}
