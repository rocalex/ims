using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_for_staff_basic_contact_experience_photo_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Genders",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Genders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Genders_Institutes_InstituteId",
                        column: x => x.InstituteId,
                        principalTable: "Institutes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StaffBasicPersonalInformation",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    FirstName = table.Column<string>(nullable: false),
                    MiddleName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: false),
                    DateOfBirth = table.Column<DateTime>(nullable: false),
                    GenderId = table.Column<int>(nullable: false),
                    MaritalStatus = table.Column<int>(nullable: false),
                    Qualification = table.Column<string>(nullable: true),
                    DateOfJoining = table.Column<DateTime>(nullable: false),
                    IsTeachingStaff = table.Column<bool>(nullable: false),
                    EmployeeId = table.Column<string>(nullable: false),
                    DesignationId = table.Column<int>(nullable: false),
                    NationalityId = table.Column<int>(nullable: true),
                    SocialSecurityNumber = table.Column<string>(nullable: true),
                    MotherTongueId = table.Column<int>(nullable: true),
                    ReligionId = table.Column<int>(nullable: true),
                    CasteId = table.Column<int>(nullable: true),
                    BloodGroupId = table.Column<int>(nullable: true),
                    IdentificationMarks = table.Column<string>(nullable: true),
                    PassportNumber = table.Column<string>(nullable: true),
                    PassportIssuedCountryId = table.Column<int>(nullable: true),
                    PassportIssuedDate = table.Column<DateTime>(nullable: true),
                    PassportExpireDate = table.Column<DateTime>(nullable: true),
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
                    FamilyImage = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StaffBasicPersonalInformation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StaffBasicPersonalInformation_BloodGroups_BloodGroupId",
                        column: x => x.BloodGroupId,
                        principalTable: "BloodGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StaffBasicPersonalInformation_Castes_CasteId",
                        column: x => x.CasteId,
                        principalTable: "Castes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StaffBasicPersonalInformation_Designations_DesignationId",
                        column: x => x.DesignationId,
                        principalTable: "Designations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StaffBasicPersonalInformation_Genders_GenderId",
                        column: x => x.GenderId,
                        principalTable: "Genders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StaffBasicPersonalInformation_MotherTongues_MotherTongueId",
                        column: x => x.MotherTongueId,
                        principalTable: "MotherTongues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StaffBasicPersonalInformation_InstituteNationalities_NationalityId",
                        column: x => x.NationalityId,
                        principalTable: "InstituteNationalities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StaffBasicPersonalInformation_AdministrationCountries_PassportIssuedCountryId",
                        column: x => x.PassportIssuedCountryId,
                        principalTable: "AdministrationCountries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StaffBasicPersonalInformation_AdministrationCities_PermanentCityId",
                        column: x => x.PermanentCityId,
                        principalTable: "AdministrationCities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StaffBasicPersonalInformation_AdministrationCities_PresentCityId",
                        column: x => x.PresentCityId,
                        principalTable: "AdministrationCities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StaffBasicPersonalInformation_Religions_ReligionId",
                        column: x => x.ReligionId,
                        principalTable: "Religions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StaffBasicPersonalInformation_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StaffExperiences",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    InstituteName = table.Column<string>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    StaffId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StaffExperiences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StaffExperiences_StaffBasicPersonalInformation_StaffId",
                        column: x => x.StaffId,
                        principalTable: "StaffBasicPersonalInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Genders_InstituteId",
                table: "Genders",
                column: "InstituteId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffBasicPersonalInformation_BloodGroupId",
                table: "StaffBasicPersonalInformation",
                column: "BloodGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffBasicPersonalInformation_CasteId",
                table: "StaffBasicPersonalInformation",
                column: "CasteId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffBasicPersonalInformation_DesignationId",
                table: "StaffBasicPersonalInformation",
                column: "DesignationId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffBasicPersonalInformation_GenderId",
                table: "StaffBasicPersonalInformation",
                column: "GenderId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffBasicPersonalInformation_MotherTongueId",
                table: "StaffBasicPersonalInformation",
                column: "MotherTongueId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffBasicPersonalInformation_NationalityId",
                table: "StaffBasicPersonalInformation",
                column: "NationalityId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffBasicPersonalInformation_PassportIssuedCountryId",
                table: "StaffBasicPersonalInformation",
                column: "PassportIssuedCountryId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffBasicPersonalInformation_PermanentCityId",
                table: "StaffBasicPersonalInformation",
                column: "PermanentCityId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffBasicPersonalInformation_PresentCityId",
                table: "StaffBasicPersonalInformation",
                column: "PresentCityId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffBasicPersonalInformation_ReligionId",
                table: "StaffBasicPersonalInformation",
                column: "ReligionId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffBasicPersonalInformation_UserId",
                table: "StaffBasicPersonalInformation",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffExperiences_StaffId",
                table: "StaffExperiences",
                column: "StaffId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StaffExperiences");

            migrationBuilder.DropTable(
                name: "StaffBasicPersonalInformation");

            migrationBuilder.DropTable(
                name: "Genders");
        }
    }
}
