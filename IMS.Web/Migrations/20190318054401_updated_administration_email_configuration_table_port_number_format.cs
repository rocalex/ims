using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class updated_administration_email_configuration_table_port_number_format : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "PortNumber",
                table: "AdministrationEmailConfigurations",
                nullable: false,
                oldClrType: typeof(string));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "PortNumber",
                table: "AdministrationEmailConfigurations",
                nullable: false,
                oldClrType: typeof(int));
        }
    }
}
