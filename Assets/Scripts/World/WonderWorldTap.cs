using EatYourVeggies.UI;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.InputSystem;

namespace EatYourVeggies.World
{
    /// <summary>Optional direct touch/click on glowing objects; UI remains an accessible alternative.</summary>
    public sealed class WonderWorldTap : MonoBehaviour
    {
        private ForestWonderController controller;
        public void Initialize(ForestWonderController target) { controller = target; }

        private void Update()
        {
            if (controller == null || Camera.main == null) return;
            Vector2 position;
            int pointerId = -1;
            if (Touchscreen.current != null && Touchscreen.current.primaryTouch.press.wasPressedThisFrame)
            {
                position = Touchscreen.current.primaryTouch.position.ReadValue();
                pointerId = Touchscreen.current.primaryTouch.touchId.ReadValue();
            }
            else if (Mouse.current != null && Mouse.current.leftButton.wasPressedThisFrame)
            {
                position = Mouse.current.position.ReadValue();
            }
            else return;

            if (EventSystem.current != null && EventSystem.current.IsPointerOverGameObject(pointerId)) return;
            Ray ray = Camera.main.ScreenPointToRay(position);
            if (Physics.Raycast(ray, out var hit, 100f) && hit.collider.GetComponent<WonderMarker>() != null)
                controller.Collect(hit.collider.gameObject);
        }
    }
}
