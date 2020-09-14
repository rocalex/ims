using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class moved_column_term_from_course_fee_to_course_fee_details_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Term",
                table: "CourseFeeTerms");

            migrationBuilder.AddColumn<int>(
                name: "Term",
                table: "CourseFeeTermDetails",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Term",
                table: "CourseFeeTermDetails");

            migrationBuilder.AddColumn<int>(
                name: "Term",
                table: "CourseFeeTerms",
                nullable: false,
                defaultValue: 0);
        }
    }
}
