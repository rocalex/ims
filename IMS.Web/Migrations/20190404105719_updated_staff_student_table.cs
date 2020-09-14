using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class updated_staff_student_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaritalStatus",
                table: "StudentBasicInformation");

            migrationBuilder.DropColumn(
                name: "Section",
                table: "StudentBasicInformation");

            migrationBuilder.DropColumn(
                name: "MaritalStatus",
                table: "StaffBasicPersonalInformation");

            migrationBuilder.AddColumn<int>(
                name: "MaritalStatusId",
                table: "StudentBasicInformation",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SectionId",
                table: "StudentBasicInformation",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MaritalStatusId",
                table: "StaffBasicPersonalInformation",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TeachingStaffId",
                table: "StaffBasicPersonalInformation",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_StudentBasicInformation_MaritalStatusId",
                table: "StudentBasicInformation",
                column: "MaritalStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentBasicInformation_SectionId",
                table: "StudentBasicInformation",
                column: "SectionId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffBasicPersonalInformation_MaritalStatusId",
                table: "StaffBasicPersonalInformation",
                column: "MaritalStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffBasicPersonalInformation_TeachingStaffId",
                table: "StaffBasicPersonalInformation",
                column: "TeachingStaffId");

            migrationBuilder.AddForeignKey(
                name: "FK_StaffBasicPersonalInformation_MaritalStatuses_MaritalStatusId",
                table: "StaffBasicPersonalInformation",
                column: "MaritalStatusId",
                principalTable: "MaritalStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StaffBasicPersonalInformation_TeachingStaffs_TeachingStaffId",
                table: "StaffBasicPersonalInformation",
                column: "TeachingStaffId",
                principalTable: "TeachingStaffs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentBasicInformation_MaritalStatuses_MaritalStatusId",
                table: "StudentBasicInformation",
                column: "MaritalStatusId",
                principalTable: "MaritalStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentBasicInformation_Sections_SectionId",
                table: "StudentBasicInformation",
                column: "SectionId",
                principalTable: "Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StaffBasicPersonalInformation_MaritalStatuses_MaritalStatusId",
                table: "StaffBasicPersonalInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_StaffBasicPersonalInformation_TeachingStaffs_TeachingStaffId",
                table: "StaffBasicPersonalInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentBasicInformation_MaritalStatuses_MaritalStatusId",
                table: "StudentBasicInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentBasicInformation_Sections_SectionId",
                table: "StudentBasicInformation");

            migrationBuilder.DropIndex(
                name: "IX_StudentBasicInformation_MaritalStatusId",
                table: "StudentBasicInformation");

            migrationBuilder.DropIndex(
                name: "IX_StudentBasicInformation_SectionId",
                table: "StudentBasicInformation");

            migrationBuilder.DropIndex(
                name: "IX_StaffBasicPersonalInformation_MaritalStatusId",
                table: "StaffBasicPersonalInformation");

            migrationBuilder.DropIndex(
                name: "IX_StaffBasicPersonalInformation_TeachingStaffId",
                table: "StaffBasicPersonalInformation");

            migrationBuilder.DropColumn(
                name: "MaritalStatusId",
                table: "StudentBasicInformation");

            migrationBuilder.DropColumn(
                name: "SectionId",
                table: "StudentBasicInformation");

            migrationBuilder.DropColumn(
                name: "MaritalStatusId",
                table: "StaffBasicPersonalInformation");

            migrationBuilder.DropColumn(
                name: "TeachingStaffId",
                table: "StaffBasicPersonalInformation");

            migrationBuilder.AddColumn<int>(
                name: "MaritalStatus",
                table: "StudentBasicInformation",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Section",
                table: "StudentBasicInformation",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MaritalStatus",
                table: "StaffBasicPersonalInformation",
                nullable: false,
                defaultValue: 0);
        }
    }
}
