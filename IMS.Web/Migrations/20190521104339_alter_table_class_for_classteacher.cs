using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class alter_table_class_for_classteacher : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ClassTeacherId",
                table: "InstituteClasses",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_InstituteClasses_ClassTeacherId",
                table: "InstituteClasses",
                column: "ClassTeacherId");

            migrationBuilder.AddForeignKey(
                name: "FK_InstituteClasses_StaffBasicPersonalInformation_ClassTeacherId",
                table: "InstituteClasses",
                column: "ClassTeacherId",
                principalTable: "StaffBasicPersonalInformation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InstituteClasses_StaffBasicPersonalInformation_ClassTeacherId",
                table: "InstituteClasses");

            migrationBuilder.DropIndex(
                name: "IX_InstituteClasses_ClassTeacherId",
                table: "InstituteClasses");

            migrationBuilder.DropColumn(
                name: "ClassTeacherId",
                table: "InstituteClasses");
        }
    }
}
