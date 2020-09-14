using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_student_articles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StudentArticles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    FileName = table.Column<string>(nullable: true),
                    SubmittedBy = table.Column<int>(nullable: false),
                    IsApproved = table.Column<bool>(nullable: false),
                    ArticleFilePath = table.Column<string>(nullable: true),
                    SubmissionDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentArticles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudentArticles_StudentBasicInformation_SubmittedBy",
                        column: x => x.SubmittedBy,
                        principalTable: "StudentBasicInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StudentArticles_SubmittedBy",
                table: "StudentArticles",
                column: "SubmittedBy");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StudentArticles");
        }
    }
}
