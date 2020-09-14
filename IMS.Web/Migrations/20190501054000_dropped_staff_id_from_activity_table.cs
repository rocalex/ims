using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class dropped_staff_id_from_activity_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StaffActivities_StaffBasicPersonalInformation_StaffId",
                table: "StaffActivities");

            migrationBuilder.DropIndex(
                name: "IX_StaffActivities_StaffId",
                table: "StaffActivities");

            migrationBuilder.DropColumn(
                name: "StaffId",
                table: "StaffActivities");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StaffId",
                table: "StaffActivities",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_StaffActivities_StaffId",
                table: "StaffActivities",
                column: "StaffId");

            migrationBuilder.AddForeignKey(
                name: "FK_StaffActivities_StaffBasicPersonalInformation_StaffId",
                table: "StaffActivities",
                column: "StaffId",
                principalTable: "StaffBasicPersonalInformation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
