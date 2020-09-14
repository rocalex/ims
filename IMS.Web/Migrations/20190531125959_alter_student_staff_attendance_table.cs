using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class alter_student_staff_attendance_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AcademicYearId",
                table: "StudentAttendances",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AcademicYearId",
                table: "StaffAttendances",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_StudentAttendances_AcademicYearId",
                table: "StudentAttendances",
                column: "AcademicYearId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffAttendances_AcademicYearId",
                table: "StaffAttendances",
                column: "AcademicYearId");

            migrationBuilder.AddForeignKey(
                name: "FK_StaffAttendances_InstituteAcademicYears_AcademicYearId",
                table: "StaffAttendances",
                column: "AcademicYearId",
                principalTable: "InstituteAcademicYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentAttendances_InstituteAcademicYears_AcademicYearId",
                table: "StudentAttendances",
                column: "AcademicYearId",
                principalTable: "InstituteAcademicYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StaffAttendances_InstituteAcademicYears_AcademicYearId",
                table: "StaffAttendances");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentAttendances_InstituteAcademicYears_AcademicYearId",
                table: "StudentAttendances");

            migrationBuilder.DropIndex(
                name: "IX_StudentAttendances_AcademicYearId",
                table: "StudentAttendances");

            migrationBuilder.DropIndex(
                name: "IX_StaffAttendances_AcademicYearId",
                table: "StaffAttendances");

            migrationBuilder.DropColumn(
                name: "AcademicYearId",
                table: "StudentAttendances");

            migrationBuilder.DropColumn(
                name: "AcademicYearId",
                table: "StaffAttendances");
        }
    }
}
