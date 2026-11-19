using System.Collections.Generic;

namespace EatYourVeggies.Adventure
{
    public static class BroccoliIntro
    {
        public static AdventureSession Create()
        {
            return new AdventureSession(new List<AdventureStep>
            {
                new AdventureStep { Id = "meet_sprig", Narration = "Hello, Little Explorer! I'm Sprig. Let's find our forest friends!" },
                new AdventureStep { Id = "find_leaves", Narration = "Look! Three sparkling leaves are waiting for us." },
                new AdventureStep { Id = "veggie_discovery", Narration = "Would you like to explore broccoli today? It's okay to say no!", OptionalFoodDiscovery = true },
                new AdventureStep { Id = "celebration", Narration = "Hooray! You helped our forest sparkle!" }
            });
        }
    }
}
