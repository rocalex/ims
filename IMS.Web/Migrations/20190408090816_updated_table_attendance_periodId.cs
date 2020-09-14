using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class updated_table_attendance_periodId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentAttendances_TimeTableDetails_TimeTableId",
                table: "StudentAttendances");

            migrationBuilder.DropIndex(
                name: "IX_StudentAttendances_TimeTableId",
                table: "StudentAttendances");

            migrationBuilder.RenameColumn(
                name: "TimeTableId",
                table: "StudentAttendances",
                newName: "PeriodOrderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PeriodOrderId",
                table: "StudentAttendances",
                newName: "TimeTableId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentAttendances_TimeTableId",
                table: "StudentAttendances",
                column: "TimeTableId");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentAttendances_TimeTableDetails_TimeTableId",
                table: "StudentAttendances",
                column: "TimeTableId",
                principalTable: "TimeTableDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
