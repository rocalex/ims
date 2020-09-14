using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_properties_in_mother_tongue_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "MotherTongues",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "MotherTongues",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "MotherTongues",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "MotherTongues");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "MotherTongues");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "MotherTongues");
        }
    }
}
