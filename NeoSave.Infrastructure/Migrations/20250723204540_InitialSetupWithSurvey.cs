using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NeoSave.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialSetupWithSurvey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SurveyResponses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    HasSavingsGoal = table.Column<string>(type: "text", nullable: false),
                    SavingsTarget = table.Column<string>(type: "text", nullable: false),
                    SpecificGoal = table.Column<string>(type: "text", nullable: false),
                    TracksExpenses = table.Column<string>(type: "text", nullable: false),
                    Challenges = table.Column<string>(type: "text", nullable: false),
                    SubmittedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyResponses", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SurveyResponses");
        }
    }
}
