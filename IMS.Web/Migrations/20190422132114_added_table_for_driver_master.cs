using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_for_driver_master : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EventReportDetails_TemplateFeatures_TemplateFeatureId",
                table: "EventReportDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_EventReportDetails_TemplateTypes_TemplateTypeId",
                table: "EventReportDetails");

            migrationBuilder.CreateTable(
                name: "DriverMasters",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Salary = table.Column<double>(nullable: false),
                    DateOfBirth = table.Column<DateTime>(nullable: false),
                    MobileNumber = table.Column<string>(nullable: false),
                    IsDriver = table.Column<bool>(nullable: false),
                    Address = table.Column<string>(nullable: true),
                    LicenseNumber = table.Column<string>(nullable: false),
                    LicenseType = table.Column<string>(nullable: false),
                    DateOfIssue = table.Column<DateTime>(nullable: false),
                    PlaceOfIssue = table.Column<string>(nullable: false),
                    ValidityTill = table.Column<DateTime>(nullable: false),
                    IssuingAuthority = table.Column<string>(nullable: false),
                    LicensePhoto = table.Column<string>(nullable: true),
                    InstituteId = table.Column<int>(nullable: false),
                    UpdatedById = table.Column<string>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DriverMasters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DriverMasters_Institutes_InstituteId",
                        column: x => x.InstituteId,
                        principalTable: "Institutes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DriverMasters_AspNetUsers_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DriverMasters_InstituteId",
                table: "DriverMasters",
                column: "InstituteId");

            migrationBuilder.CreateIndex(
                name: "IX_DriverMasters_UpdatedById",
                table: "DriverMasters",
                column: "UpdatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_EventReportDetails_TemplateFeatures_TemplateFeatureId",
                table: "EventReportDetails",
                column: "TemplateFeatureId",
                principalTable: "TemplateFeatures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_EventReportDetails_TemplateTypes_TemplateTypeId",
                table: "EventReportDetails",
                column: "TemplateTypeId",
                principalTable: "TemplateTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EventReportDetails_TemplateFeatures_TemplateFeatureId",
                table: "EventReportDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_EventReportDetails_TemplateTypes_TemplateTypeId",
                table: "EventReportDetails");

            migrationBuilder.DropTable(
                name: "DriverMasters");

            migrationBuilder.AddForeignKey(
                name: "FK_EventReportDetails_TemplateFeatures_TemplateFeatureId",
                table: "EventReportDetails",
                column: "TemplateFeatureId",
                principalTable: "TemplateFeatures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_EventReportDetails_TemplateTypes_TemplateTypeId",
                table: "EventReportDetails",
                column: "TemplateTypeId",
                principalTable: "TemplateTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
