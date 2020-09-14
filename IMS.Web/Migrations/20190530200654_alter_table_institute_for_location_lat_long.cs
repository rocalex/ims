using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class alter_table_institute_for_location_lat_long : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Latitude",
                table: "Institutes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Longitude",
                table: "Institutes",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Institutes");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Institutes");
        }
    }
}
