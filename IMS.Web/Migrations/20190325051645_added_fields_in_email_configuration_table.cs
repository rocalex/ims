using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_fields_in_email_configuration_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "EnableSsl",
                table: "AdministrationEmailConfigurations",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "AdministrationEmailConfigurations",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EnableSsl",
                table: "AdministrationEmailConfigurations");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "AdministrationEmailConfigurations");
        }
    }
}
