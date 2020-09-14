using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class alter_table_staffleave : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AcademicYearId",
                table: "StaffLeaves",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_StaffLeaves_AcademicYearId",
                table: "StaffLeaves",
                column: "AcademicYearId");

            migrationBuilder.AddForeignKey(
                name: "FK_StaffLeaves_InstituteAcademicYears_AcademicYearId",
                table: "StaffLeaves",
                column: "AcademicYearId",
                principalTable: "InstituteAcademicYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StaffLeaves_InstituteAcademicYears_AcademicYearId",
                table: "StaffLeaves");

            migrationBuilder.DropIndex(
                name: "IX_StaffLeaves_AcademicYearId",
                table: "StaffLeaves");

            migrationBuilder.DropColumn(
                name: "AcademicYearId",
                table: "StaffLeaves");
        }
    }
}
