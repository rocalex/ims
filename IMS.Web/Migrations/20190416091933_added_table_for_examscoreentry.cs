using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_for_examscoreentry : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ExamScoreEntrys",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    StudentId = table.Column<int>(nullable: false),
                    ExamId = table.Column<int>(nullable: false),
                    SubjectId = table.Column<int>(nullable: false),
                    Mark = table.Column<double>(nullable: false, defaultValue: 0.0),
                    UpdatedById = table.Column<string>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExamScoreEntrys", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExamScoreEntrys_ClassExams_ExamId",
                        column: x => x.ExamId,
                        principalTable: "ClassExams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExamScoreEntrys_StudentBasicInformation_StudentId",
                        column: x => x.StudentId,
                        principalTable: "StudentBasicInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ExamScoreEntrys_InstituteSubjects_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "InstituteSubjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ExamScoreEntrys_AspNetUsers_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ExamScoreEntrys_ExamId",
                table: "ExamScoreEntrys",
                column: "ExamId");

            migrationBuilder.CreateIndex(
                name: "IX_ExamScoreEntrys_StudentId",
                table: "ExamScoreEntrys",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_ExamScoreEntrys_SubjectId",
                table: "ExamScoreEntrys",
                column: "SubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ExamScoreEntrys_UpdatedById",
                table: "ExamScoreEntrys",
                column: "UpdatedById");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExamScoreEntrys");
        }
    }
}
