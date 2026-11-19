using System;

namespace EatYourVeggies.Profiles
{
    [Serializable]
    public sealed class ChildProfile
    {
        public string Id;
        public string DisplayName;
        public string AvatarColor = "mint";
        public string OutfitId = "explorer";
        public string CompanionId = "sprig";
        public string ActiveQuestId = "broccoli_intro";
        public int QuestCheckpoint;

        public static ChildProfile Create(string displayName)
        {
            return new ChildProfile
            {
                Id = Guid.NewGuid().ToString("N"),
                DisplayName = string.IsNullOrWhiteSpace(displayName) ? "Little Explorer" : displayName.Trim()
            };
        }
    }
}
