using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_for_homework_depended : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HomeworkMailMappings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    HomeworkId = table.Column<int>(nullable: false),
                    Message = table.Column<string>(nullable: false),
                    Subject = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HomeworkMailMappings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HomeworkMailMappings_Homeworks_HomeworkId",
                        column: x => x.HomeworkId,
                        principalTable: "Homeworks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HomeworkMessageMappings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    HomeworkId = table.Column<int>(nullable: false),
                    Message = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HomeworkMessageMappings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HomeworkMessageMappings_Homeworks_HomeworkId",
                        column: x => x.HomeworkId,
                        principalTable: "Homeworks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StudentRecieveHomeworkMailMappings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    StudentId = table.Column<int>(nullable: false),
                    HomeworkMailId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentRecieveHomeworkMailMappings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudentRecieveHomeworkMailMappings_HomeworkMailMappings_HomeworkMailId",
                        column: x => x.HomeworkMailId,
                        principalTable: "HomeworkMailMappings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudentRecieveHomeworkMailMappings_StudentBasicInformation_StudentId",
                        column: x => x.StudentId,
                        principalTable: "StudentBasicInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "StudentRecieveHomeworkMessageMappings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    StudentId = table.Column<int>(nullable: false),
                    HomeworkMessageId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentRecieveHomeworkMessageMappings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudentRecieveHomeworkMessageMappings_HomeworkMessageMappings_HomeworkMessageId",
                        column: x => x.HomeworkMessageId,
                        principalTable: "HomeworkMessageMappings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudentRecieveHomeworkMessageMappings_StudentBasicInformation_StudentId",
                        column: x => x.StudentId,
                        principalTable: "StudentBasicInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HomeworkMailMappings_HomeworkId",
                table: "HomeworkMailMappings",
                column: "HomeworkId");

            migrationBuilder.CreateIndex(
                name: "IX_HomeworkMessageMappings_HomeworkId",
                table: "HomeworkMessageMappings",
                column: "HomeworkId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentRecieveHomeworkMailMappings_HomeworkMailId",
                table: "StudentRecieveHomeworkMailMappings",
                column: "HomeworkMailId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentRecieveHomeworkMailMappings_StudentId",
                table: "StudentRecieveHomeworkMailMappings",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentRecieveHomeworkMessageMappings_HomeworkMessageId",
                table: "StudentRecieveHomeworkMessageMappings",
                column: "HomeworkMessageId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentRecieveHomeworkMessageMappings_StudentId",
                table: "StudentRecieveHomeworkMessageMappings",
                column: "StudentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StudentRecieveHomeworkMailMappings");

            migrationBuilder.DropTable(
                name: "StudentRecieveHomeworkMessageMappings");

            migrationBuilder.DropTable(
                name: "HomeworkMailMappings");

            migrationBuilder.DropTable(
                name: "HomeworkMessageMappings");
        }
    }
}
