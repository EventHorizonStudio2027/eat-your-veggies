using EatYourVeggies.Adventure;
using UnityEngine;

namespace EatYourVeggies.UI
{
    /// <summary>Prototype tap interaction; final build will use a visible accessible button.</summary>
    public sealed class TapToAdvance : MonoBehaviour
    {
        private AdventureSession session;
        private void Start() { session = BroccoliIntro.Create(); }
        private void Update()
        {
            if (session == null || session.IsComplete) return;
            bool tapped = Input.GetMouseButtonDown(0);
            if (tapped)
            {
                Debug.Log(session.Current.Narration);
                session.Continue();
                if (session.IsComplete) Debug.Log("Forest restored!");
            }
        }
    }
}
