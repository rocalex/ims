using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class updated_table_for_country_state_city_and_currency : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "AdministrationStates",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "AdministrationStates",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "AdministrationStates",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "AdministrationCurrencies",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "AdministrationCurrencies",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "AdministrationCountries",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "AdministrationCountries",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "AdministrationCountries",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "AdministrationCities",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "AdministrationCities",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "AdministrationCities",
                nullable: false,
                defaultValue: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "AdministrationStates");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "AdministrationStates");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "AdministrationStates");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "AdministrationCurrencies");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "AdministrationCurrencies");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "AdministrationCountries");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "AdministrationCountries");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "AdministrationCountries");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "AdministrationCities");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "AdministrationCities");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "AdministrationCities");
        }
    }
}
