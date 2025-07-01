using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class User : IdentityUser
    {
        [Required]
        public string Name { get; set; }

        [Phone]
        [StringLength(15, ErrorMessage = "Phone number cannot be longer than 15 digits.")]
        public override string PhoneNumber { get; set; }

        public string OnboardingStatus { get; set; } = "pending";
        public string SubscriptionTier { get; set; } = "free";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
