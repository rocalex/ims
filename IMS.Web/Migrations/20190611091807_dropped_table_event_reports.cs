using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class dropped_table_event_reports : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EventReportDetails");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EventReportDetails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Bcc = table.Column<string>(nullable: true),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false),
                    Message = table.Column<string>(nullable: true),
                    SentOn = table.Column<DateTime>(nullable: false),
                    Subject = table.Column<string>(nullable: true),
                    TemplateFeatureId = table.Column<int>(nullable: false),
                    TemplateFormat = table.Column<int>(nullable: false),
                    TemplateTypeId = table.Column<int>(nullable: false),
                    To = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventReportDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EventReportDetails_Institutes_InstituteId",
                        column: x => x.InstituteId,
                        principalTable: "Institutes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EventReportDetails_TemplateFeatures_TemplateFeatureId",
                        column: x => x.TemplateFeatureId,
                        principalTable: "TemplateFeatures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EventReportDetails_TemplateTypes_TemplateTypeId",
                        column: x => x.TemplateTypeId,
                        principalTable: "TemplateTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EventReportDetails_InstituteId",
                table: "EventReportDetails",
                column: "InstituteId");

            migrationBuilder.CreateIndex(
                name: "IX_EventReportDetails_TemplateFeatureId",
                table: "EventReportDetails",
                column: "TemplateFeatureId");

            migrationBuilder.CreateIndex(
                name: "IX_EventReportDetails_TemplateTypeId",
                table: "EventReportDetails",
                column: "TemplateTypeId");
        }
    }
}
