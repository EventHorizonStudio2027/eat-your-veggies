using System;
using System.IO;
using EatYourVeggies.Profiles;
using NUnit.Framework;

public sealed class ProfileSaveServiceTests
{
    private string folder;

    [SetUp]
    public void Setup()
    {
        folder = Path.Combine(Path.GetTempPath(), "eyv-test-" + Guid.NewGuid().ToString("N"));
    }

    [TearDown]
    public void Cleanup()
    {
        if (Directory.Exists(folder)) Directory.Delete(folder, true);
    }

    [Test]
    public void SavesAndLoadsProfile()
    {
        var store = new ProfileSaveService(folder);
        var profile = ChildProfile.Create("Explorer");
        store.Save(profile);
        Assert.AreEqual(profile.Id, store.Load(profile.Id).Id);
    }

    [Test]
    public void BackupRecoversFromCorruptPrimary()
    {
        var store = new ProfileSaveService(folder);
        var profile = ChildProfile.Create("Explorer");
        store.Save(profile);
        profile.OutfitId = "raincoat";
        store.Save(profile);
        File.WriteAllText(Path.Combine(folder, profile.Id + ".json"), "not valid json");
        var recovered = store.Load(profile.Id);
        Assert.AreEqual("explorer", recovered.OutfitId);
    }
}
