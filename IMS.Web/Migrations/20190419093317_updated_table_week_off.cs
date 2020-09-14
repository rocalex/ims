using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class updated_table_week_off : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WeekOffs_Institutes_AcademicYearId",
                table: "WeekOffs");

            migrationBuilder.AddForeignKey(
                name: "FK_WeekOffs_InstituteAcademicYears_AcademicYearId",
                table: "WeekOffs",
                column: "AcademicYearId",
                principalTable: "InstituteAcademicYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WeekOffs_InstituteAcademicYears_AcademicYearId",
                table: "WeekOffs");

            migrationBuilder.AddForeignKey(
                name: "FK_WeekOffs_Institutes_AcademicYearId",
                table: "WeekOffs",
                column: "AcademicYearId",
                principalTable: "Institutes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
