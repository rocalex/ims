using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_for_student_relieving : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StudentRelievingMappings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    StudentId = table.Column<int>(nullable: false),
                    StudentRelieving = table.Column<int>(nullable: false),
                    Reason = table.Column<string>(nullable: true),
                    RelievingDate = table.Column<DateTime>(nullable: false),
                    UpdatedById = table.Column<string>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentRelievingMappings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudentRelievingMappings_StudentBasicInformation_StudentId",
                        column: x => x.StudentId,
                        principalTable: "StudentBasicInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudentRelievingMappings_AspNetUsers_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StudentRelievingMappings_StudentId",
                table: "StudentRelievingMappings",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentRelievingMappings_UpdatedById",
                table: "StudentRelievingMappings",
                column: "UpdatedById");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
        }
    }
}
