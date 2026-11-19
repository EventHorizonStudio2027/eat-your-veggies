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
            // Keep a recoverable previous version until the new file is in place.
            string backup = path + ".bak";
            if (File.Exists(path))
            {
                if (File.Exists(backup)) File.Delete(backup);
                File.Move(path, backup);
            }
            try { File.Move(temporary, path); }
            catch
            {
                if (!File.Exists(path) && File.Exists(backup)) File.Move(backup, path);
                throw;
            }
        }

        public ChildProfile Load(string profileId)
        {
            string path = GetPath(profileId);
            string backup = path + ".bak";
            if (!File.Exists(path) && !File.Exists(backup)) return null;
            try { return ReadProfile(path, profileId); }
            catch (Exception ex) when (ex is IOException || ex is ArgumentException || ex is InvalidDataException)
            {
                if (!File.Exists(backup)) throw;
                return ReadProfile(backup, profileId);
            }
        }

        private static ChildProfile ReadProfile(string path, string expectedId)
        {
            var profile = JsonUtility.FromJson<ChildProfile>(File.ReadAllText(path));
            if (profile == null || profile.Id != expectedId)
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
