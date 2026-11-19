using System;
using System.IO;
using UnityEngine;

namespace EatYourVeggies.Profiles
{
    public sealed class ProfileSaveService
    {
        private readonly string directory;
        public ProfileSaveService(string directory = null)
        {
            this.directory = directory ?? Path.Combine(Application.persistentDataPath, "profiles");
        }

        public void Save(ChildProfile profile)
        {
            if (profile == null || string.IsNullOrWhiteSpace(profile.Id))
                throw new ArgumentException("Valid profile required.", nameof(profile));
            Directory.CreateDirectory(directory);
            string path = GetPath(profile.Id);
            string temporary = path + ".tmp";
            File.WriteAllText(temporary, JsonUtility.ToJson(profile, true));
            if (File.Exists(path)) File.Delete(path);
            File.Move(temporary, path);
        }

        public ChildProfile Load(string profileId)
        {
            string path = GetPath(profileId);
            if (!File.Exists(path)) return null;
            var profile = JsonUtility.FromJson<ChildProfile>(File.ReadAllText(path));
            if (profile == null || profile.Id != profileId)
                throw new InvalidDataException("Invalid profile data.");
            return profile;
        }

        private string GetPath(string id)
        {
            if (string.IsNullOrEmpty(id) || !Guid.TryParseExact(id, "N", out _))
                throw new ArgumentException("Profile ID must be a GUID in N format.", nameof(id));
            return Path.Combine(directory, id + ".json");
        }
    }
}
