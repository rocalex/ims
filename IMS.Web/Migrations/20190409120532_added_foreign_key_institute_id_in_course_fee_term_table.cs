using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_foreign_key_institute_id_in_course_fee_term_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "InstituteId",
                table: "CourseFeeTerms",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_CourseFeeTerms_InstituteId",
                table: "CourseFeeTerms",
                column: "InstituteId");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseFeeTerms_Institutes_InstituteId",
                table: "CourseFeeTerms",
                column: "InstituteId",
                principalTable: "Institutes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InstituteId",
                table: "CourseFeeTerms");
        }
    }
}
