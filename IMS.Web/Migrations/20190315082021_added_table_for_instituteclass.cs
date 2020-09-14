using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_for_instituteclass : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "InstituteClasses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    GroupCode = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    DurationUnit = table.Column<int>(nullable: false),
                    Duration = table.Column<double>(nullable: false),
                    IsGroup = table.Column<bool>(nullable: false),
                    ClassOrder = table.Column<int>(nullable: false),
                    NumberOfFeeTerms = table.Column<int>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InstituteClasses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InstituteClasses_Institutes_InstituteId",
                        column: x => x.InstituteId,
                        principalTable: "Institutes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_InstituteClasses_InstituteId",
                table: "InstituteClasses",
                column: "InstituteId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InstituteClasses");
        }
    }
}
