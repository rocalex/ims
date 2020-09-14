using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class update_institute_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StaffBasicPersonalInformation_Designations_DesignationId",
                table: "StaffBasicPersonalInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_StaffBasicPersonalInformation_Genders_GenderId",
                table: "StaffBasicPersonalInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_StaffBasicPersonalInformation_AdministrationCities_PermanentCityId",
                table: "StaffBasicPersonalInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_StaffBasicPersonalInformation_AdministrationCities_PresentCityId",
                table: "StaffBasicPersonalInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentBasicInformation_InstituteClasses_AdmissionClassId",
                table: "StudentBasicInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentBasicInformation_InstituteAcademicYears_CurrentAcademicYearId",
                table: "StudentBasicInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentBasicInformation_InstituteClasses_CurrentClassId",
                table: "StudentBasicInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentBasicInformation_InstituteLanguageMasters_FirstLanguageId",
                table: "StudentBasicInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentBasicInformation_Genders_GenderId",
                table: "StudentBasicInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentBasicInformation_AdministrationCities_PermanentCityId",
                table: "StudentBasicInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentBasicInformation_AdministrationCities_PresentCityId",
                table: "StudentBasicInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentBasicInformation_InstituteLanguageMasters_SecondLanguageId",
                table: "StudentBasicInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentSports_Levels_LevelId",
                table: "StudentSports");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentSports_SportDetails_SportId",
                table: "StudentSports");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Institutes",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Institutes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "Institutes",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Institutes",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "InstituteBccCcEmailMappings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Email = table.Column<string>(nullable: false),
                    IsBcc = table.Column<bool>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InstituteBccCcEmailMappings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InstituteBccCcEmailMappings_Institutes_InstituteId",
                        column: x => x.InstituteId,
                        principalTable: "Institutes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_InstituteBccCcEmailMappings_InstituteId",
                table: "InstituteBccCcEmailMappings",
                column: "InstituteId");

            migrationBuilder.AddForeignKey(
                name: "FK_StaffBasicPersonalInformation_Designations_DesignationId",
                table: "StaffBasicPersonalInformation",
                column: "DesignationId",
                principalTable: "Designations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StaffBasicPersonalInformation_Genders_GenderId",
                table: "StaffBasicPersonalInformation",
                column: "GenderId",
                principalTable: "Genders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StaffBasicPersonalInformation_AdministrationCities_PermanentCityId",
                table: "StaffBasicPersonalInformation",
                column: "PermanentCityId",
                principalTable: "AdministrationCities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StaffBasicPersonalInformation_AdministrationCities_PresentCityId",
                table: "StaffBasicPersonalInformation",
                column: "PresentCityId",
                principalTable: "AdministrationCities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentBasicInformation_InstituteClasses_AdmissionClassId",
                table: "StudentBasicInformation",
                column: "AdmissionClassId",
                principalTable: "InstituteClasses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentBasicInformation_InstituteAcademicYears_CurrentAcademicYearId",
                table: "StudentBasicInformation",
                column: "CurrentAcademicYearId",
                principalTable: "InstituteAcademicYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentBasicInformation_InstituteClasses_CurrentClassId",
                table: "StudentBasicInformation",
                column: "CurrentClassId",
                principalTable: "InstituteClasses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentBasicInformation_InstituteLanguageMasters_FirstLanguageId",
                table: "StudentBasicInformation",
                column: "FirstLanguageId",
                principalTable: "InstituteLanguageMasters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentBasicInformation_Genders_GenderId",
                table: "StudentBasicInformation",
                column: "GenderId",
                principalTable: "Genders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentBasicInformation_AdministrationCities_PermanentCityId",
                table: "StudentBasicInformation",
                column: "PermanentCityId",
                principalTable: "AdministrationCities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentBasicInformation_AdministrationCities_PresentCityId",
                table: "StudentBasicInformation",
                column: "PresentCityId",
                principalTable: "AdministrationCities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentBasicInformation_InstituteLanguageMasters_SecondLanguageId",
                table: "StudentBasicInformation",
                column: "SecondLanguageId",
                principalTable: "InstituteLanguageMasters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentSports_Levels_LevelId",
                table: "StudentSports",
                column: "LevelId",
                principalTable: "Levels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentSports_SportDetails_SportId",
                table: "StudentSports",
                column: "SportId",
                principalTable: "SportDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StaffBasicPersonalInformation_Designations_DesignationId",
                table: "StaffBasicPersonalInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_StaffBasicPersonalInformation_Genders_GenderId",
                table: "StaffBasicPersonalInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_StaffBasicPersonalInformation_AdministrationCities_PermanentCityId",
                table: "StaffBasicPersonalInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_StaffBasicPersonalInformation_AdministrationCities_PresentCityId",
                table: "StaffBasicPersonalInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentBasicInformation_InstituteClasses_AdmissionClassId",
                table: "StudentBasicInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentBasicInformation_InstituteAcademicYears_CurrentAcademicYearId",
                table: "StudentBasicInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentBasicInformation_InstituteClasses_CurrentClassId",
                table: "StudentBasicInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentBasicInformation_InstituteLanguageMasters_FirstLanguageId",
                table: "StudentBasicInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentBasicInformation_Genders_GenderId",
                table: "StudentBasicInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentBasicInformation_AdministrationCities_PermanentCityId",
                table: "StudentBasicInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentBasicInformation_AdministrationCities_PresentCityId",
                table: "StudentBasicInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentBasicInformation_InstituteLanguageMasters_SecondLanguageId",
                table: "StudentBasicInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentSports_Levels_LevelId",
                table: "StudentSports");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentSports_SportDetails_SportId",
                table: "StudentSports");

            migrationBuilder.DropTable(
                name: "InstituteBccCcEmailMappings");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Institutes");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "Institutes");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "Institutes");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Institutes",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddForeignKey(
                name: "FK_StaffBasicPersonalInformation_Designations_DesignationId",
                table: "StaffBasicPersonalInformation",
                column: "DesignationId",
                principalTable: "Designations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StaffBasicPersonalInformation_Genders_GenderId",
                table: "StaffBasicPersonalInformation",
                column: "GenderId",
                principalTable: "Genders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StaffBasicPersonalInformation_AdministrationCities_PermanentCityId",
                table: "StaffBasicPersonalInformation",
                column: "PermanentCityId",
                principalTable: "AdministrationCities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StaffBasicPersonalInformation_AdministrationCities_PresentCityId",
                table: "StaffBasicPersonalInformation",
                column: "PresentCityId",
                principalTable: "AdministrationCities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentBasicInformation_InstituteClasses_AdmissionClassId",
                table: "StudentBasicInformation",
                column: "AdmissionClassId",
                principalTable: "InstituteClasses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentBasicInformation_InstituteAcademicYears_CurrentAcademicYearId",
                table: "StudentBasicInformation",
                column: "CurrentAcademicYearId",
                principalTable: "InstituteAcademicYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentBasicInformation_InstituteClasses_CurrentClassId",
                table: "StudentBasicInformation",
                column: "CurrentClassId",
                principalTable: "InstituteClasses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentBasicInformation_InstituteLanguageMasters_FirstLanguageId",
                table: "StudentBasicInformation",
                column: "FirstLanguageId",
                principalTable: "InstituteLanguageMasters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentBasicInformation_Genders_GenderId",
                table: "StudentBasicInformation",
                column: "GenderId",
                principalTable: "Genders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentBasicInformation_AdministrationCities_PermanentCityId",
                table: "StudentBasicInformation",
                column: "PermanentCityId",
                principalTable: "AdministrationCities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentBasicInformation_AdministrationCities_PresentCityId",
                table: "StudentBasicInformation",
                column: "PresentCityId",
                principalTable: "AdministrationCities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentBasicInformation_InstituteLanguageMasters_SecondLanguageId",
                table: "StudentBasicInformation",
                column: "SecondLanguageId",
                principalTable: "InstituteLanguageMasters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentSports_Levels_LevelId",
                table: "StudentSports",
                column: "LevelId",
                principalTable: "Levels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentSports_SportDetails_SportId",
                table: "StudentSports",
                column: "SportId",
                principalTable: "SportDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
