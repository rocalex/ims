using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_course_fee_terms_related_tables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CourseFeeTerms",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ClassId = table.Column<int>(nullable: false),
                    Term = table.Column<int>(nullable: false),
                    AcademicYearId = table.Column<int>(nullable: false),
                    DueDate = table.Column<DateTime>(nullable: false),
                    LateFee = table.Column<double>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: false),
                    ReligionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseFeeTerms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseFeeTerms_InstituteAcademicYears_AcademicYearId",
                        column: x => x.AcademicYearId,
                        principalTable: "InstituteAcademicYears",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CourseFeeTerms_InstituteClasses_ClassId",
                        column: x => x.ClassId,
                        principalTable: "InstituteClasses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CourseFeeTerms_AspNetUsers_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CourseFeeTerms_Religions_ReligionId",
                        column: x => x.ReligionId,
                        principalTable: "Religions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CourseFeeTermDetails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    CourseFeeTermId = table.Column<int>(nullable: false),
                    FeeComponentId = table.Column<int>(nullable: false),
                    Amount = table.Column<double>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseFeeTermDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseFeeTermDetails_CourseFeeTerms_CourseFeeTermId",
                        column: x => x.CourseFeeTermId,
                        principalTable: "CourseFeeTerms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseFeeTermDetails_AspNetUsers_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CourseFeeTermDetails_FeeComponents_FeeComponentId",
                        column: x => x.FeeComponentId,
                        principalTable: "FeeComponents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CourseFeeTermDetails_CourseFeeTermId",
                table: "CourseFeeTermDetails",
                column: "CourseFeeTermId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseFeeTermDetails_CreatedBy",
                table: "CourseFeeTermDetails",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_CourseFeeTermDetails_FeeComponentId",
                table: "CourseFeeTermDetails",
                column: "FeeComponentId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseFeeTerms_AcademicYearId",
                table: "CourseFeeTerms",
                column: "AcademicYearId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseFeeTerms_ClassId",
                table: "CourseFeeTerms",
                column: "ClassId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseFeeTerms_CreatedBy",
                table: "CourseFeeTerms",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_CourseFeeTerms_ReligionId",
                table: "CourseFeeTerms",
                column: "ReligionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CourseFeeTermDetails");

            migrationBuilder.DropTable(
                name: "CourseFeeTerms");
        }
    }
}
