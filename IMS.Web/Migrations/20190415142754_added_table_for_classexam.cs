using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_for_classexam : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ClassExams",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ClassId = table.Column<int>(nullable: false),
                    SectionId = table.Column<int>(nullable: false),
                    ExamId = table.Column<int>(nullable: false),
                    TotalAttendanceDays = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassExams", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClassExams_InstituteClasses_ClassId",
                        column: x => x.ClassId,
                        principalTable: "InstituteClasses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClassExams_ExamDefinitions_ExamId",
                        column: x => x.ExamId,
                        principalTable: "ExamDefinitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ClassExams_Sections_SectionId",
                        column: x => x.SectionId,
                        principalTable: "Sections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ClassExamSubjectMappings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    SubjectId = table.Column<int>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: true),
                    StartTime = table.Column<string>(nullable: true),
                    EndTime = table.Column<string>(nullable: true),
                    MaxScore = table.Column<double>(nullable: false),
                    MinScore = table.Column<double>(nullable: false),
                    Content = table.Column<string>(nullable: true),
                    Remark = table.Column<string>(nullable: true),
                    ClassExamId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassExamSubjectMappings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClassExamSubjectMappings_ClassExams_ClassExamId",
                        column: x => x.ClassExamId,
                        principalTable: "ClassExams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClassExamSubjectMappings_InstituteSubjects_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "InstituteSubjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClassExams_ClassId",
                table: "ClassExams",
                column: "ClassId");

            migrationBuilder.CreateIndex(
                name: "IX_ClassExams_ExamId",
                table: "ClassExams",
                column: "ExamId");

            migrationBuilder.CreateIndex(
                name: "IX_ClassExams_SectionId",
                table: "ClassExams",
                column: "SectionId");

            migrationBuilder.CreateIndex(
                name: "IX_ClassExamSubjectMappings_ClassExamId",
                table: "ClassExamSubjectMappings",
                column: "ClassExamId");

            migrationBuilder.CreateIndex(
                name: "IX_ClassExamSubjectMappings_SubjectId",
                table: "ClassExamSubjectMappings",
                column: "SubjectId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClassExamSubjectMappings");

            migrationBuilder.DropTable(
                name: "ClassExams");
        }
    }
}
