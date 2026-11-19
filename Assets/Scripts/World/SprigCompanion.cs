using UnityEngine;

namespace EatYourVeggies.World
{
    /// <summary>Friendly bobbing companion made from placeholder shapes.</summary>
    public sealed class SprigCompanion : MonoBehaviour
    {
        private Vector3 home;
        private float celebrationUntil;
        public void Celebrate(int found, int total)
        {
            celebrationUntil = Time.time + 1.3f;
        }
        private void Awake() { home = transform.position; }
        private void Update()
        {
            transform.position = home + Vector3.up * (Mathf.Sin(Time.time * (Time.time < celebrationUntil ? 7f : 1.8f)) * (Time.time < celebrationUntil ? 0.28f : 0.12f));
            transform.Rotate(0f, (Time.time < celebrationUntil ? 110f : 12f) * Time.deltaTime, 0f, Space.World);
        }
    }
}
