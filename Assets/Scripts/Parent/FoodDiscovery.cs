using System;

namespace EatYourVeggies.Parent
{
    public enum DiscoveryKind { Look, Touch, Smell, Taste, Declined, Skipped }

    [Serializable]
    public sealed class FoodDiscovery
    {
        public string VegetableId;
        public DiscoveryKind Kind;
        public string RecordedAtUtc;

        public static FoodDiscovery Record(string vegetableId, DiscoveryKind kind)
        {
            if (string.IsNullOrWhiteSpace(vegetableId))
                throw new ArgumentException("Vegetable ID required.", nameof(vegetableId));
            return new FoodDiscovery
            {
                VegetableId = vegetableId,
                Kind = kind,
                RecordedAtUtc = DateTime.UtcNow.ToString("o")
            };
        }
    }
}
