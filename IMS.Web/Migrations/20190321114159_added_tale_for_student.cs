using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_tale_for_student : Migration
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

            migrationBuilder.CreateTable(
                name: "StudentBasicInformation",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    RollNumber = table.Column<string>(nullable: false),
                    AdmissionDate = table.Column<DateTime>(nullable: false),
                    AdmissionNumber = table.Column<string>(nullable: false),
                    AdmissionClassId = table.Column<int>(nullable: false),
                    CurrentClassId = table.Column<int>(nullable: false),
                    Section = table.Column<int>(nullable: false),
                    CurrentAcademicYearId = table.Column<int>(nullable: false),
                    FirstLanguageId = table.Column<int>(nullable: false),
                    SecondLanguageId = table.Column<int>(nullable: false),
                    FirstName = table.Column<string>(nullable: false),
                    MiddleName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: false),
                    DateOfBirth = table.Column<DateTime>(nullable: false),
                    GenderId = table.Column<int>(nullable: false),
                    MaritalStatus = table.Column<int>(nullable: false),
                    IsPhysicallyHandicapped = table.Column<bool>(nullable: false),
                    SchoolApplicationNumber = table.Column<string>(nullable: true),
                    FeeChallanNumber = table.Column<string>(nullable: false),
                    NationalityId = table.Column<int>(nullable: true),
                    SocialSecurityNumber = table.Column<string>(nullable: true),
                    MotherTongueId = table.Column<int>(nullable: true),
                    ReligionId = table.Column<int>(nullable: true),
                    CasteId = table.Column<int>(nullable: true),
                    BloodGroupId = table.Column<int>(nullable: true),
                    ComingBy = table.Column<string>(nullable: true),
                    ComingPlace = table.Column<string>(nullable: true),
                    IdentificationMarks = table.Column<string>(nullable: true),
                    PassportNumber = table.Column<string>(nullable: true),
                    PassportIssuedCountryId = table.Column<int>(nullable: true),
                    PassportIssuedDate = table.Column<DateTime>(nullable: true),
                    PassportExpireDate = table.Column<DateTime>(nullable: true),
                    RelievingDate = table.Column<DateTime>(nullable: true),
                    RelievingClassId = table.Column<int>(nullable: true),
                    TCNumber = table.Column<string>(nullable: true),
                    TCDate = table.Column<DateTime>(nullable: true),
                    RelievingType = table.Column<int>(nullable: false),
                    RelievingReason = table.Column<string>(nullable: true),
                    FamilyRelationType = table.Column<int>(nullable: false),
                    MotherName = table.Column<string>(nullable: false),
                    FamilyRelationName = table.Column<string>(nullable: false),
                    FamilyRelationEmail = table.Column<string>(nullable: true),
                    FamilyRelationMobileNumber = table.Column<string>(nullable: false),
                    FamilyRelationOccupationId = table.Column<int>(nullable: true),
                    FamilyRelationMonthlyIncome = table.Column<string>(nullable: true),
                    PermanentAddress = table.Column<string>(nullable: false),
                    PermanentCityId = table.Column<int>(nullable: false),
                    PermanentZipcode = table.Column<string>(nullable: true),
                    MobileNumber = table.Column<string>(nullable: false),
                    AlternatePhoneNumber = table.Column<string>(nullable: true),
                    IsPresentAddressIsSameAsPermanent = table.Column<bool>(nullable: false),
                    PresentAddress = table.Column<string>(nullable: true),
                    PresentCityId = table.Column<int>(nullable: false),
                    PresentZipcode = table.Column<string>(nullable: true),
                    PersonalImage = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentBasicInformation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudentBasicInformation_InstituteClasses_AdmissionClassId",
                        column: x => x.AdmissionClassId,
                        principalTable: "InstituteClasses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentBasicInformation_BloodGroups_BloodGroupId",
                        column: x => x.BloodGroupId,
                        principalTable: "BloodGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentBasicInformation_Castes_CasteId",
                        column: x => x.CasteId,
                        principalTable: "Castes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentBasicInformation_InstituteAcademicYears_CurrentAcademicYearId",
                        column: x => x.CurrentAcademicYearId,
                        principalTable: "InstituteAcademicYears",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentBasicInformation_InstituteClasses_CurrentClassId",
                        column: x => x.CurrentClassId,
                        principalTable: "InstituteClasses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentBasicInformation_Occupations_FamilyRelationOccupationId",
                        column: x => x.FamilyRelationOccupationId,
                        principalTable: "Occupations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentBasicInformation_InstituteLanguageMasters_FirstLanguageId",
                        column: x => x.FirstLanguageId,
                        principalTable: "InstituteLanguageMasters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentBasicInformation_Genders_GenderId",
                        column: x => x.GenderId,
                        principalTable: "Genders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentBasicInformation_MotherTongues_MotherTongueId",
                        column: x => x.MotherTongueId,
                        principalTable: "MotherTongues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentBasicInformation_InstituteNationalities_NationalityId",
                        column: x => x.NationalityId,
                        principalTable: "InstituteNationalities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentBasicInformation_AdministrationCountries_PassportIssuedCountryId",
                        column: x => x.PassportIssuedCountryId,
                        principalTable: "AdministrationCountries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentBasicInformation_AdministrationCities_PermanentCityId",
                        column: x => x.PermanentCityId,
                        principalTable: "AdministrationCities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentBasicInformation_AdministrationCities_PresentCityId",
                        column: x => x.PresentCityId,
                        principalTable: "AdministrationCities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentBasicInformation_InstituteClasses_RelievingClassId",
                        column: x => x.RelievingClassId,
                        principalTable: "InstituteClasses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentBasicInformation_Religions_ReligionId",
                        column: x => x.ReligionId,
                        principalTable: "Religions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentBasicInformation_InstituteLanguageMasters_SecondLanguageId",
                        column: x => x.SecondLanguageId,
                        principalTable: "InstituteLanguageMasters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentBasicInformation_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StudentAwards",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    AwardName = table.Column<string>(nullable: false),
                    InstituteName = table.Column<string>(nullable: false),
                    StudentId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentAwards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudentAwards_StudentBasicInformation_StudentId",
                        column: x => x.StudentId,
                        principalTable: "StudentBasicInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StudentDisciplines",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    DisciplineDate = table.Column<DateTime>(nullable: false),
                    Descriptiom = table.Column<string>(nullable: false),
                    StudentId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentDisciplines", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudentDisciplines_StudentBasicInformation_StudentId",
                        column: x => x.StudentId,
                        principalTable: "StudentBasicInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StudentPriorEducations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    InstituteName = table.Column<string>(nullable: false),
                    FromDate = table.Column<DateTime>(nullable: false),
                    ToDate = table.Column<DateTime>(nullable: false),
                    StudentId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentPriorEducations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudentPriorEducations_StudentBasicInformation_StudentId",
                        column: x => x.StudentId,
                        principalTable: "StudentBasicInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StudentSports",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    SportId = table.Column<int>(nullable: false),
                    LevelId = table.Column<int>(nullable: false),
                    StudentId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentSports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudentSports_Levels_LevelId",
                        column: x => x.LevelId,
                        principalTable: "Levels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentSports_SportDetails_SportId",
                        column: x => x.SportId,
                        principalTable: "SportDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentSports_StudentBasicInformation_StudentId",
                        column: x => x.StudentId,
                        principalTable: "StudentBasicInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StudentAwards_StudentId",
                table: "StudentAwards",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentBasicInformation_AdmissionClassId",
                table: "StudentBasicInformation",
                column: "AdmissionClassId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentBasicInformation_BloodGroupId",
                table: "StudentBasicInformation",
                column: "BloodGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentBasicInformation_CasteId",
                table: "StudentBasicInformation",
                column: "CasteId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentBasicInformation_CurrentAcademicYearId",
                table: "StudentBasicInformation",
                column: "CurrentAcademicYearId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentBasicInformation_CurrentClassId",
                table: "StudentBasicInformation",
                column: "CurrentClassId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentBasicInformation_FamilyRelationOccupationId",
                table: "StudentBasicInformation",
                column: "FamilyRelationOccupationId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentBasicInformation_FirstLanguageId",
                table: "StudentBasicInformation",
                column: "FirstLanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentBasicInformation_GenderId",
                table: "StudentBasicInformation",
                column: "GenderId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentBasicInformation_MotherTongueId",
                table: "StudentBasicInformation",
                column: "MotherTongueId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentBasicInformation_NationalityId",
                table: "StudentBasicInformation",
                column: "NationalityId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentBasicInformation_PassportIssuedCountryId",
                table: "StudentBasicInformation",
                column: "PassportIssuedCountryId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentBasicInformation_PermanentCityId",
                table: "StudentBasicInformation",
                column: "PermanentCityId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentBasicInformation_PresentCityId",
                table: "StudentBasicInformation",
                column: "PresentCityId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentBasicInformation_RelievingClassId",
                table: "StudentBasicInformation",
                column: "RelievingClassId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentBasicInformation_ReligionId",
                table: "StudentBasicInformation",
                column: "ReligionId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentBasicInformation_SecondLanguageId",
                table: "StudentBasicInformation",
                column: "SecondLanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentBasicInformation_UserId",
                table: "StudentBasicInformation",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentDisciplines_StudentId",
                table: "StudentDisciplines",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentPriorEducations_StudentId",
                table: "StudentPriorEducations",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentSports_LevelId",
                table: "StudentSports",
                column: "LevelId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentSports_SportId",
                table: "StudentSports",
                column: "SportId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentSports_StudentId",
                table: "StudentSports",
                column: "StudentId");

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

            migrationBuilder.DropTable(
                name: "StudentAwards");

            migrationBuilder.DropTable(
                name: "StudentDisciplines");

            migrationBuilder.DropTable(
                name: "StudentPriorEducations");

            migrationBuilder.DropTable(
                name: "StudentSports");

            migrationBuilder.DropTable(
                name: "StudentBasicInformation");

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
        }
    }
}
