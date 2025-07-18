using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NeoSave.Domain.Entities;

namespace NeoSave.Infrastructure.Configurations
{
    public class SurveyResponseConfiguration : IEntityTypeConfiguration<SurveyResponse>
    {
        public void Configure(EntityTypeBuilder<SurveyResponse> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.HasSavingsGoal).IsRequired();
            builder.Property(x => x.UserId).IsRequired();
            builder.Property(x => x.SubmittedAt).IsRequired();
        }
    }
}