using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_time_table_related_tables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TimeTables",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ClassId = table.Column<int>(nullable: false),
                    SectionId = table.Column<int>(nullable: false),
                    AcademicYearId = table.Column<int>(nullable: false),
                    PeriodCount = table.Column<int>(nullable: false),
                    PeriodDuration = table.Column<int>(nullable: false),
                    PeriodStartTime = table.Column<string>(nullable: false),
                    FirstBreakDuration = table.Column<int>(nullable: false),
                    FirstBreakAfterPeriod = table.Column<int>(nullable: false),
                    SecondBreakDuration = table.Column<int>(nullable: false),
                    SecondBreakAfterPeriod = table.Column<int>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeTables", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TimeTables_InstituteAcademicYears_AcademicYearId",
                        column: x => x.AcademicYearId,
                        principalTable: "InstituteAcademicYears",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TimeTables_InstituteClasses_ClassId",
                        column: x => x.ClassId,
                        principalTable: "InstituteClasses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TimeTables_Institutes_InstituteId",
                        column: x => x.InstituteId,
                        principalTable: "Institutes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TimeTables_Sections_SectionId",
                        column: x => x.SectionId,
                        principalTable: "Sections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TimeTableDetails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    TimeTableId = table.Column<int>(nullable: false),
                    SubjectId = table.Column<int>(nullable: false),
                    WeekDaysEnum = table.Column<int>(nullable: false),
                    PeriodNumber = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeTableDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TimeTableDetails_InstituteSubjects_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "InstituteSubjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TimeTableDetails_TimeTables_TimeTableId",
                        column: x => x.TimeTableId,
                        principalTable: "TimeTables",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TimeTableDetails");

            migrationBuilder.DropTable(
                name: "TimeTables");
        }
    }
}
