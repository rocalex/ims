using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class alter_table_driver_for_userid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "DriverMasters",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_DriverMasters_UserId",
                table: "DriverMasters",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_DriverMasters_AspNetUsers_UserId",
                table: "DriverMasters",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DriverMasters_AspNetUsers_UserId",
                table: "DriverMasters");

            migrationBuilder.DropIndex(
                name: "IX_DriverMasters_UserId",
                table: "DriverMasters");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "DriverMasters");
        }
    }
}
