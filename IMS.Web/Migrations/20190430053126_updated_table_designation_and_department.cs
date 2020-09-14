using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class updated_table_designation_and_department : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "Designations",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Designations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "Departments",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Departments",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "Designations");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Designations");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "Departments");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Departments");
        }
    }
}
