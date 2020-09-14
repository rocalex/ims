using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_for_disciplinary : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Disciplinaries",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    StudentId = table.Column<int>(nullable: false),
                    StatusId = table.Column<int>(nullable: false),
                    Subject = table.Column<string>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    Description = table.Column<string>(nullable: false),
                    Attachment = table.Column<string>(nullable: true),
                    Remarks = table.Column<string>(nullable: true),
                    UploadMemo = table.Column<string>(nullable: true),
                    UpdatedById = table.Column<string>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Disciplinaries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Disciplinaries_DisciplinaryStatuses_StatusId",
                        column: x => x.StatusId,
                        principalTable: "DisciplinaryStatuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Disciplinaries_StudentBasicInformation_StudentId",
                        column: x => x.StudentId,
                        principalTable: "StudentBasicInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Disciplinaries_AspNetUsers_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Disciplinaries_StatusId",
                table: "Disciplinaries",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Disciplinaries_StudentId",
                table: "Disciplinaries",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_Disciplinaries_UpdatedById",
                table: "Disciplinaries",
                column: "UpdatedById");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Disciplinaries");
        }
    }
}
