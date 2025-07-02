using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using api.Enums;

namespace api.Models
{
    public class User : IdentityUser
    {
        [Required]
        public string Name { get; set; }

        [Phone]
        public override string? PhoneNumber { get; set; }

        [Required]
        public OnboardingStatus OnboardingStatus { get; set; } = OnboardingStatus.Pending;

        [Required]
        public SubscriptionTier Tier { get; set; } = SubscriptionTier.Free;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
