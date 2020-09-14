using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_for_student_promotion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StudentPromotionMappings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    StudentId = table.Column<int>(nullable: false),
                    CurrentClassId = table.Column<int>(nullable: false),
                    CurrentSectionId = table.Column<int>(nullable: false),
                    PromotedToClassId = table.Column<int>(nullable: false),
                    PromotedToSectionId = table.Column<int>(nullable: false),
                    Remark = table.Column<string>(nullable: true),
                    UpdatedById = table.Column<string>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentPromotionMappings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudentPromotionMappings_InstituteClasses_CurrentClassId",
                        column: x => x.CurrentClassId,
                        principalTable: "InstituteClasses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentPromotionMappings_Sections_CurrentSectionId",
                        column: x => x.CurrentSectionId,
                        principalTable: "Sections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentPromotionMappings_InstituteClasses_PromotedToClassId",
                        column: x => x.PromotedToClassId,
                        principalTable: "InstituteClasses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentPromotionMappings_Sections_PromotedToSectionId",
                        column: x => x.PromotedToSectionId,
                        principalTable: "Sections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentPromotionMappings_StudentBasicInformation_StudentId",
                        column: x => x.StudentId,
                        principalTable: "StudentBasicInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudentPromotionMappings_AspNetUsers_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StudentPromotionMappings_CurrentClassId",
                table: "StudentPromotionMappings",
                column: "CurrentClassId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentPromotionMappings_CurrentSectionId",
                table: "StudentPromotionMappings",
                column: "CurrentSectionId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentPromotionMappings_PromotedToClassId",
                table: "StudentPromotionMappings",
                column: "PromotedToClassId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentPromotionMappings_PromotedToSectionId",
                table: "StudentPromotionMappings",
                column: "PromotedToSectionId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentPromotionMappings_StudentId",
                table: "StudentPromotionMappings",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentPromotionMappings_UpdatedById",
                table: "StudentPromotionMappings",
                column: "UpdatedById");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StudentPromotionMappings");
        }
    }
}
