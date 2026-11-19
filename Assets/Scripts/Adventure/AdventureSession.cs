using System;
using System.Collections.Generic;

namespace EatYourVeggies.Adventure
{
    [Serializable]
    public sealed class AdventureStep
    {
        public string Id;
        public string Narration;
        public bool OptionalFoodDiscovery;
    }

    public sealed class AdventureSession
    {
        private readonly IReadOnlyList<AdventureStep> steps;
        public int StepIndex { get; private set; }
        public bool IsComplete => StepIndex >= steps.Count;
        public AdventureStep Current => IsComplete ? null : steps[StepIndex];

        public AdventureSession(IReadOnlyList<AdventureStep> steps)
        {
            if (steps == null || steps.Count == 0)
                throw new ArgumentException("An adventure requires at least one step.", nameof(steps));
            var ids = new HashSet<string>();
            foreach (var step in steps)
            {
                if (step == null || string.IsNullOrWhiteSpace(step.Id) || !ids.Add(step.Id))
                    throw new ArgumentException("Steps require unique nonempty IDs.", nameof(steps));
            }
            this.steps = steps;
        }

        // All steps, including food discovery, can be advanced without tasting.
        public bool Continue()
        {
            if (IsComplete) return false;
            StepIndex++;
            return true;
        }

        public void RestoreCheckpoint(int index)
        {
            if (index < 0 || index > steps.Count)
                throw new ArgumentOutOfRangeException(nameof(index));
            StepIndex = index;
        }
    }
}
