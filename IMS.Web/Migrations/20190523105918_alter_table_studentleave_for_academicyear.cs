using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class alter_table_studentleave_for_academicyear : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AcademicYearId",
                table: "StudentLeaves",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_StudentLeaves_AcademicYearId",
                table: "StudentLeaves",
                column: "AcademicYearId");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentLeaves_InstituteAcademicYears_AcademicYearId",
                table: "StudentLeaves",
                column: "AcademicYearId",
                principalTable: "InstituteAcademicYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentLeaves_InstituteAcademicYears_AcademicYearId",
                table: "StudentLeaves");

            migrationBuilder.DropIndex(
                name: "IX_StudentLeaves_AcademicYearId",
                table: "StudentLeaves");

            migrationBuilder.DropColumn(
                name: "AcademicYearId",
                table: "StudentLeaves");
        }
    }
}
