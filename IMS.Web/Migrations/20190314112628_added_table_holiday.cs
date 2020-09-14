using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_holiday : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "WeekOffs",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.CreateTable(
                name: "Holidays",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    InstitutionId = table.Column<int>(nullable: false),
                    AcademicYearId = table.Column<int>(nullable: false),
                    CompanyWbs = table.Column<int>(nullable: true),
                    OccuranceType = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    HolidayDate = table.Column<DateTime>(nullable: false),
                    HolidayToDate = table.Column<DateTime>(nullable: true),
                    CreatedBy = table.Column<string>(nullable: false),
                    UpdatedOn = table.Column<DateTime>(nullable: true),
                    UpdatedBy = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Holidays", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Holidays_Institutes_AcademicYearId",
                        column: x => x.AcademicYearId,
                        principalTable: "Institutes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Holidays_AspNetUsers_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WeekOffs_CreatedBy",
                table: "WeekOffs",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Holidays_AcademicYearId",
                table: "Holidays",
                column: "AcademicYearId");

            migrationBuilder.CreateIndex(
                name: "IX_Holidays_CreatedBy",
                table: "Holidays",
                column: "CreatedBy");

            migrationBuilder.AddForeignKey(
                name: "FK_WeekOffs_AspNetUsers_CreatedBy",
                table: "WeekOffs",
                column: "CreatedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WeekOffs_AspNetUsers_CreatedBy",
                table: "WeekOffs");

            migrationBuilder.DropTable(
                name: "Holidays");

            migrationBuilder.DropIndex(
                name: "IX_WeekOffs_CreatedBy",
                table: "WeekOffs");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "WeekOffs",
                nullable: false,
                oldClrType: typeof(string));
        }
    }
}
