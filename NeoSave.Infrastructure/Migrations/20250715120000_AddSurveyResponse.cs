using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace NeoSave.Infrastructure.Migrations
{
    public partial class AddSurveyResponse : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SurveyResponses",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    HasSavingsGoal = table.Column<string>(nullable: false),
                    SavingsTarget = table.Column<string>(nullable: true),
                    SpecificGoal = table.Column<string>(nullable: true),
                    TracksExpenses = table.Column<string>(nullable: true),
                    Challenges = table.Column<string>(nullable: true),
                    SubmittedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyResponses", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "SurveyResponses");
        }
    }
}