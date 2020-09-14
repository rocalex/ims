using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class updated_student_staff_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BiometricId",
                table: "StudentBasicInformation",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "StudentBasicInformation",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<int>(
                name: "BiometricId",
                table: "StaffBasicPersonalInformation",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BiometricId",
                table: "StudentBasicInformation");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "StudentBasicInformation");

            migrationBuilder.DropColumn(
                name: "BiometricId",
                table: "StaffBasicPersonalInformation");
        }
    }
}
