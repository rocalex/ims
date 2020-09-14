using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_class_subject_mapping : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "InstituteClassSubjectMappings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ClassId = table.Column<int>(nullable: false),
                    SubjectId = table.Column<int>(nullable: false),
                    FacultyId = table.Column<int>(nullable: false),
                    AlternateFacultyId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InstituteClassSubjectMappings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InstituteClassSubjectMappings_StaffBasicPersonalInformation_AlternateFacultyId",
                        column: x => x.AlternateFacultyId,
                        principalTable: "StaffBasicPersonalInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InstituteClassSubjectMappings_InstituteClasses_ClassId",
                        column: x => x.ClassId,
                        principalTable: "InstituteClasses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InstituteClassSubjectMappings_StaffBasicPersonalInformation_FacultyId",
                        column: x => x.FacultyId,
                        principalTable: "StaffBasicPersonalInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InstituteClassSubjectMappings_InstituteSubjects_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "InstituteSubjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_InstituteClassSubjectMappings_AlternateFacultyId",
                table: "InstituteClassSubjectMappings",
                column: "AlternateFacultyId");

            migrationBuilder.CreateIndex(
                name: "IX_InstituteClassSubjectMappings_ClassId",
                table: "InstituteClassSubjectMappings",
                column: "ClassId");

            migrationBuilder.CreateIndex(
                name: "IX_InstituteClassSubjectMappings_FacultyId",
                table: "InstituteClassSubjectMappings",
                column: "FacultyId");

            migrationBuilder.CreateIndex(
                name: "IX_InstituteClassSubjectMappings_SubjectId",
                table: "InstituteClassSubjectMappings",
                column: "SubjectId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InstituteClassSubjectMappings");
        }
    }
}
