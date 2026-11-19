using UnityEngine;
using UnityEngine.UI;

namespace EatYourVeggies.World
{
    /// <summary>Optional tactile forest discovery. Never gates story progression.</summary>
    public sealed class ForestWonderController : MonoBehaviour
    {
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
            if (wonders == null || collected >= wonders.Length) return;
            var wonder = wonders[collected];
            if (wonder != null) wonder.SetActive(false);
            collected++;
            Refresh();
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
