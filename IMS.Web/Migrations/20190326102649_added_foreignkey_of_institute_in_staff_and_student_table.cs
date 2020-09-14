using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_foreignkey_of_institute_in_staff_and_student_table : Migration
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

            migrationBuilder.AddColumn<int>(
                name: "InstituteId",
                table: "StudentBasicInformation",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InstituteId",
                table: "StaffBasicPersonalInformation",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_StudentBasicInformation_InstituteId",
                table: "StudentBasicInformation",
                column: "InstituteId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffBasicPersonalInformation_InstituteId",
                table: "StaffBasicPersonalInformation",
                column: "InstituteId");

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
                name: "FK_StaffBasicPersonalInformation_Institutes_InstituteId",
                table: "StaffBasicPersonalInformation",
                column: "InstituteId",
                principalTable: "Institutes",
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
                name: "FK_StudentBasicInformation_Institutes_InstituteId",
                table: "StudentBasicInformation",
                column: "InstituteId",
                principalTable: "Institutes",
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
                name: "FK_StaffBasicPersonalInformation_Institutes_InstituteId",
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
                name: "FK_StudentBasicInformation_Institutes_InstituteId",
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

            migrationBuilder.DropIndex(
                name: "IX_StudentBasicInformation_InstituteId",
                table: "StudentBasicInformation");

            migrationBuilder.DropIndex(
                name: "IX_StaffBasicPersonalInformation_InstituteId",
                table: "StaffBasicPersonalInformation");

            migrationBuilder.DropColumn(
                name: "InstituteId",
                table: "StudentBasicInformation");

            migrationBuilder.DropColumn(
                name: "InstituteId",
                table: "StaffBasicPersonalInformation");

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
