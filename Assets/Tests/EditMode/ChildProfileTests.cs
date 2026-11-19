using EatYourVeggies.Profiles;
using NUnit.Framework;

public sealed class ChildProfileTests
{
    [Test]
    public void NewProfileHasSafeDefaults()
    {
        var profile = ChildProfile.Create("");
        Assert.AreEqual("Little Explorer", profile.DisplayName);
        Assert.AreEqual("sprig", profile.CompanionId);
        Assert.IsNotEmpty(profile.Id);
    }

    [Test]
    public void ProfileIdsAreUnique()
    {
        Assert.AreNotEqual(ChildProfile.Create("A").Id, ChildProfile.Create("B").Id);
    }
}
