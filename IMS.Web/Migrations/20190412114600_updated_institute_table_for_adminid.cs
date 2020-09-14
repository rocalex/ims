using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class updated_institute_table_for_adminid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AdminId",
                table: "Institutes",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Institutes_AdminId",
                table: "Institutes",
                column: "AdminId");

            migrationBuilder.AddForeignKey(
                name: "FK_Institutes_AspNetUsers_AdminId",
                table: "Institutes",
                column: "AdminId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Institutes_AspNetUsers_AdminId",
                table: "Institutes");

            migrationBuilder.DropIndex(
                name: "IX_Institutes_AdminId",
                table: "Institutes");

            migrationBuilder.DropColumn(
                name: "AdminId",
                table: "Institutes");
        }
    }
}
