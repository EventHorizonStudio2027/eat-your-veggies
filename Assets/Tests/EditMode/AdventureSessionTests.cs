using System.Collections.Generic;
using EatYourVeggies.Adventure;
using NUnit.Framework;

public sealed class AdventureSessionTests
{
    [Test]
    public void OptionalFoodDiscoveryNeverBlocksStory()
    {
        var session = new AdventureSession(new List<AdventureStep>
        {
            new AdventureStep { Id = "intro", Narration = "Meet Sprig" },
            new AdventureStep { Id = "discovery", OptionalFoodDiscovery = true },
            new AdventureStep { Id = "celebration" }
        });

        Assert.IsTrue(session.Continue());
        Assert.IsTrue(session.Continue()); // no eating or parent confirmation required
        Assert.IsTrue(session.Continue());
        Assert.IsTrue(session.IsComplete);
    }

    [Test]
    public void CheckpointRejectsInvalidIndex()
    {
        var session = new AdventureSession(new List<AdventureStep>
        {
            new AdventureStep { Id = "intro" }
        });
        Assert.Throws<System.ArgumentOutOfRangeException>(() => session.RestoreCheckpoint(2));
    }
}
