using UnityEngine;

namespace EatYourVeggies.World
{
    /// <summary>Subtle, low-motion ambient animation for the prototype forest.</summary>
    public sealed class ForestSparkle : MonoBehaviour
    {
        private Vector3 startPosition;
        private void Awake() { startPosition = transform.position; }
        private void Update()
        {
            float bob = Mathf.Sin(Time.time * 1.3f + transform.GetSiblingIndex()) * 0.14f;
            transform.position = startPosition + Vector3.up * bob;
            transform.Rotate(Vector3.up, 18f * Time.deltaTime, Space.World);
        }
    }
}
