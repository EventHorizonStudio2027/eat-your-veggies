using EatYourVeggies.Adventure;
using UnityEngine;
using UnityEngine.UI;

namespace EatYourVeggies.UI
{
    public sealed class AdventureHud : MonoBehaviour
    {
        [SerializeField] private Text narration;
        [SerializeField] private Button continueButton;
        private AdventureSession session;

        public void Bind(AdventureSession adventure)
        {
            session = adventure;
            if (continueButton != null)
            {
                continueButton.onClick.RemoveListener(Advance);
                continueButton.onClick.AddListener(Advance);
            }
            Refresh();
        }

        public void Advance()
        {
            if (session == null) return;
            session.Continue();
            Refresh();
        }

        private void Refresh()
        {
            if (narration != null)
                narration.text = session == null ? "Welcome, Little Explorer!" :
                    session.IsComplete ? "You did it! The forest is glowing again!" :
                    session.Current.Narration;
            if (continueButton != null)
                continueButton.interactable = session != null && !session.IsComplete;
        }
    }
}
