using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_for_country_state_city : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdministrationCountries",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdministrationCountries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdministrationCountries_Institutes_InstituteId",
                        column: x => x.InstituteId,
                        principalTable: "Institutes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AdministrationStates",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    CountryId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdministrationStates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdministrationStates_AdministrationCountries_CountryId",
                        column: x => x.CountryId,
                        principalTable: "AdministrationCountries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AdministrationCities",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    StateId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdministrationCities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdministrationCities_AdministrationStates_StateId",
                        column: x => x.StateId,
                        principalTable: "AdministrationStates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdministrationCities_StateId",
                table: "AdministrationCities",
                column: "StateId");

            migrationBuilder.CreateIndex(
                name: "IX_AdministrationCountries_InstituteId",
                table: "AdministrationCountries",
                column: "InstituteId");

            migrationBuilder.CreateIndex(
                name: "IX_AdministrationStates_CountryId",
                table: "AdministrationStates",
                column: "CountryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdministrationCities");

            migrationBuilder.DropTable(
                name: "AdministrationStates");

            migrationBuilder.DropTable(
                name: "AdministrationCountries");
        }
    }
}
