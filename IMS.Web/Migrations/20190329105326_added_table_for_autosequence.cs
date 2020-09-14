using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_for_autosequence : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AutoSequenceGenerators",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    AutoSequenceGeneratorType = table.Column<int>(nullable: false),
                    Seperator = table.Column<int>(nullable: false),
                    CustomText = table.Column<string>(nullable: true),
                    InstituteId = table.Column<int>(nullable: false),
                    CreatedById = table.Column<string>(nullable: true),
                    UpdateById = table.Column<string>(nullable: true),
                    UpdateDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AutoSequenceGenerators", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AutoSequenceGenerators_AspNetUsers_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AutoSequenceGenerators_Institutes_InstituteId",
                        column: x => x.InstituteId,
                        principalTable: "Institutes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AutoSequenceGenerators_AspNetUsers_UpdateById",
                        column: x => x.UpdateById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AutoSequenceGeneratorDataTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    IsSelected = table.Column<bool>(nullable: false),
                    OrderId = table.Column<int>(nullable: false),
                    AutoSequenceGeneratorId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AutoSequenceGeneratorDataTypes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AutoSequenceGeneratorDataTypes_AutoSequenceGenerators_AutoSequenceGeneratorId",
                        column: x => x.AutoSequenceGeneratorId,
                        principalTable: "AutoSequenceGenerators",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AutoSequenceGeneratorDataTypes_AutoSequenceGeneratorId",
                table: "AutoSequenceGeneratorDataTypes",
                column: "AutoSequenceGeneratorId");

            migrationBuilder.CreateIndex(
                name: "IX_AutoSequenceGenerators_CreatedById",
                table: "AutoSequenceGenerators",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_AutoSequenceGenerators_InstituteId",
                table: "AutoSequenceGenerators",
                column: "InstituteId");

            migrationBuilder.CreateIndex(
                name: "IX_AutoSequenceGenerators_UpdateById",
                table: "AutoSequenceGenerators",
                column: "UpdateById");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AutoSequenceGeneratorDataTypes");

            migrationBuilder.DropTable(
                name: "AutoSequenceGenerators");
        }
    }
}
