using UnityEngine;
using UnityEngine.UI;

namespace EatYourVeggies.World
{
    /// <summary>Optional tactile forest discovery. Never gates story progression.</summary>
    public sealed class ForestWonderController : MonoBehaviour
    {
        private int collected;
        private Text counter;
        private GameObject[] wonders;

        public void Initialize(GameObject[] objects, Text counterText)
        {
            wonders = objects;
            counter = counterText;
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
            int total = wonders == null ? 0 : wonders.Length;
            counter.text = collected >= total && total > 0
                ? "The forest is sparkling! ✨"
                : "Wonder lights: " + collected + " / " + total;
        }
    }
}
