using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_week_off : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WeekOffs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    InstitutionId = table.Column<int>(nullable: false),
                    AcademicYearId = table.Column<int>(nullable: false),
                    WeekNumber = table.Column<int>(nullable: false),
                    WeekDay = table.Column<int>(nullable: false),
                    CompanyWbs = table.Column<int>(nullable: true),
                    CreatedBy = table.Column<string>(nullable: false),
                    UpdatedOn = table.Column<DateTime>(nullable: true),
                    UpdatedBy = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeekOffs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WeekOffs_Institutes_AcademicYearId",
                        column: x => x.AcademicYearId,
                        principalTable: "Institutes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WeekOffs_AcademicYearId",
                table: "WeekOffs",
                column: "AcademicYearId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WeekOffs");
        }
    }
}
