using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_for_maritalstatus_section_teachingStaff : Migration
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

            migrationBuilder.CreateTable(
                name: "MaritalStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Code = table.Column<string>(nullable: false),
                    Status = table.Column<bool>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaritalStatuses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MaritalStatuses_Institutes_InstituteId",
                        column: x => x.InstituteId,
                        principalTable: "Institutes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Sections",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Code = table.Column<string>(nullable: false),
                    Status = table.Column<bool>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sections_Institutes_InstituteId",
                        column: x => x.InstituteId,
                        principalTable: "Institutes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TeachingStaffs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Code = table.Column<string>(nullable: false),
                    Status = table.Column<bool>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeachingStaffs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TeachingStaffs_Institutes_InstituteId",
                        column: x => x.InstituteId,
                        principalTable: "Institutes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MaritalStatuses_InstituteId",
                table: "MaritalStatuses",
                column: "InstituteId");

            migrationBuilder.CreateIndex(
                name: "IX_Sections_InstituteId",
                table: "Sections",
                column: "InstituteId");

            migrationBuilder.CreateIndex(
                name: "IX_TeachingStaffs_InstituteId",
                table: "TeachingStaffs",
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

            migrationBuilder.DropTable(
                name: "MaritalStatuses");

            migrationBuilder.DropTable(
                name: "Sections");

            migrationBuilder.DropTable(
                name: "TeachingStaffs");

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
