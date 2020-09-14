using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class updated_table_for_lookups_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InstituteClassSubjectMappings_StaffBasicPersonalInformation_FacultyId",
                table: "InstituteClassSubjectMappings");

            migrationBuilder.DropForeignKey(
                name: "FK_InstituteClassSubjectMappings_InstituteSubjects_SubjectId",
                table: "InstituteClassSubjectMappings");

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

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "SportDetails",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "SportDetails",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "SportDetails",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "Religions",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Religions",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "Religions",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "ReligionCategories",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "ReligionCategories",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "ReligionCategories",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "Relationships",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Relationships",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "Relationships",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "Qualifications",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Qualifications",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "Qualifications",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_InstituteClassSubjectMappings_StaffBasicPersonalInformation_FacultyId",
                table: "InstituteClassSubjectMappings",
                column: "FacultyId",
                principalTable: "StaffBasicPersonalInformation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_InstituteClassSubjectMappings_InstituteSubjects_SubjectId",
                table: "InstituteClassSubjectMappings",
                column: "SubjectId",
                principalTable: "InstituteSubjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

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
                name: "FK_InstituteClassSubjectMappings_StaffBasicPersonalInformation_FacultyId",
                table: "InstituteClassSubjectMappings");

            migrationBuilder.DropForeignKey(
                name: "FK_InstituteClassSubjectMappings_InstituteSubjects_SubjectId",
                table: "InstituteClassSubjectMappings");

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

            migrationBuilder.DropColumn(
                name: "Code",
                table: "SportDetails");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "SportDetails");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "SportDetails");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "Religions");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Religions");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Religions");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "ReligionCategories");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "ReligionCategories");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "ReligionCategories");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "Relationships");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Relationships");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Relationships");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "Qualifications");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Qualifications");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Qualifications");

            migrationBuilder.AddForeignKey(
                name: "FK_InstituteClassSubjectMappings_StaffBasicPersonalInformation_FacultyId",
                table: "InstituteClassSubjectMappings",
                column: "FacultyId",
                principalTable: "StaffBasicPersonalInformation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_InstituteClassSubjectMappings_InstituteSubjects_SubjectId",
                table: "InstituteClassSubjectMappings",
                column: "SubjectId",
                principalTable: "InstituteSubjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

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
