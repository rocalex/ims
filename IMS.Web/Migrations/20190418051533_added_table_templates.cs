using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_templates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Templates",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    TemplateFormat = table.Column<int>(nullable: false),
                    TemplateFeatureId = table.Column<int>(nullable: false),
                    TemplateTypeId = table.Column<int>(nullable: false),
                    To = table.Column<string>(nullable: true),
                    EmailBcc = table.Column<string>(nullable: true),
                    EmailSubject = table.Column<string>(nullable: true),
                    Format = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Templates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Templates_TemplateFeatures_TemplateFeatureId",
                        column: x => x.TemplateFeatureId,
                        principalTable: "TemplateFeatures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Templates_TemplateTypes_TemplateTypeId",
                        column: x => x.TemplateTypeId,
                        principalTable: "TemplateTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Templates_TemplateFeatureId",
                table: "Templates",
                column: "TemplateFeatureId");

            migrationBuilder.CreateIndex(
                name: "IX_Templates_TemplateTypeId",
                table: "Templates",
                column: "TemplateTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Templates");
        }
    }
}
