using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class updated_table_for_attendance_with_timetable_forignkey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentAttendances_TimeTables_TimeTableId",
                table: "StudentAttendances");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentAttendances_TimeTableDetails_TimeTableId",
                table: "StudentAttendances",
                column: "TimeTableId",
                principalTable: "TimeTableDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentAttendances_TimeTableDetails_TimeTableId",
                table: "StudentAttendances");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentAttendances_TimeTables_TimeTableId",
                table: "StudentAttendances",
                column: "TimeTableId",
                principalTable: "TimeTables",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
