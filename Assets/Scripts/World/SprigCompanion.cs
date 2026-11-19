using UnityEngine;

namespace EatYourVeggies.World
{
    /// <summary>Friendly bobbing companion made from placeholder shapes.</summary>
    public sealed class SprigCompanion : MonoBehaviour
    {
        private Vector3 home;
        private void Awake() { home = transform.position; }
        private void Update()
        {
            transform.position = home + Vector3.up * (Mathf.Sin(Time.time * 1.8f) * 0.12f);
            transform.Rotate(0f, 12f * Time.deltaTime, 0f, Space.World);
        }
    }
}
