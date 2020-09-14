using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_columns_in_activity_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ActivityStatusId",
                table: "StaffActivities",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "EndTime",
                table: "StaffActivities",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "StaffActivities",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MeetingAgendaId",
                table: "StaffActivities",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "StartTime",
                table: "StaffActivities",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_StaffActivities_ActivityStatusId",
                table: "StaffActivities",
                column: "ActivityStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffActivities_MeetingAgendaId",
                table: "StaffActivities",
                column: "MeetingAgendaId");

            migrationBuilder.AddForeignKey(
                name: "FK_StaffActivities_ActivityStatus_ActivityStatusId",
                table: "StaffActivities",
                column: "ActivityStatusId",
                principalTable: "ActivityStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StaffActivities_MeetingAgendas_MeetingAgendaId",
                table: "StaffActivities",
                column: "MeetingAgendaId",
                principalTable: "MeetingAgendas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StaffActivities_ActivityStatus_ActivityStatusId",
                table: "StaffActivities");

            migrationBuilder.DropForeignKey(
                name: "FK_StaffActivities_MeetingAgendas_MeetingAgendaId",
                table: "StaffActivities");

            migrationBuilder.DropIndex(
                name: "IX_StaffActivities_ActivityStatusId",
                table: "StaffActivities");

            migrationBuilder.DropIndex(
                name: "IX_StaffActivities_MeetingAgendaId",
                table: "StaffActivities");

            migrationBuilder.DropColumn(
                name: "ActivityStatusId",
                table: "StaffActivities");

            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "StaffActivities");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "StaffActivities");

            migrationBuilder.DropColumn(
                name: "MeetingAgendaId",
                table: "StaffActivities");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "StaffActivities");
        }
    }
}
