using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_new_property_in_language_lookup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "InstituteLanguageMasters",
                newName: "Status");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "InstituteLanguageMasters",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "InstituteLanguageMasters");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "InstituteLanguageMasters",
                newName: "IsActive");
        }
    }
}
