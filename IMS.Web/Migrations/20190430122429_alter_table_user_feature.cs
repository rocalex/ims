using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class alter_table_user_feature : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserGroupFeatureEnum",
                table: "UserGroupFeatures");

            migrationBuilder.AddColumn<int>(
                name: "UserGroupFeatureChild",
                table: "UserGroupFeatures",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserGroupFeatureParent",
                table: "UserGroupFeatures",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserGroupFeatureChild",
                table: "UserGroupFeatures");

            migrationBuilder.DropColumn(
                name: "UserGroupFeatureParent",
                table: "UserGroupFeatures");

            migrationBuilder.AddColumn<int>(
                name: "UserGroupFeatureEnum",
                table: "UserGroupFeatures",
                nullable: false,
                defaultValue: 0);
        }
    }
}
