using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_for_route : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Routes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Code = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false),
                    UpdatedById = table.Column<string>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Routes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Routes_Institutes_InstituteId",
                        column: x => x.InstituteId,
                        principalTable: "Institutes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Routes_AspNetUsers_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RouteStageMappings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    RouteId = table.Column<int>(nullable: false),
                    FromPlaceId = table.Column<int>(nullable: false),
                    ToPlaceId = table.Column<int>(nullable: false),
                    Distance = table.Column<double>(nullable: false),
                    OrderId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RouteStageMappings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RouteStageMappings_TransportationStages_FromPlaceId",
                        column: x => x.FromPlaceId,
                        principalTable: "TransportationStages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RouteStageMappings_Routes_RouteId",
                        column: x => x.RouteId,
                        principalTable: "Routes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RouteStageMappings_TransportationStages_ToPlaceId",
                        column: x => x.ToPlaceId,
                        principalTable: "TransportationStages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Routes_InstituteId",
                table: "Routes",
                column: "InstituteId");

            migrationBuilder.CreateIndex(
                name: "IX_Routes_UpdatedById",
                table: "Routes",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_RouteStageMappings_FromPlaceId",
                table: "RouteStageMappings",
                column: "FromPlaceId");

            migrationBuilder.CreateIndex(
                name: "IX_RouteStageMappings_RouteId",
                table: "RouteStageMappings",
                column: "RouteId");

            migrationBuilder.CreateIndex(
                name: "IX_RouteStageMappings_ToPlaceId",
                table: "RouteStageMappings",
                column: "ToPlaceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RouteStageMappings");

            migrationBuilder.DropTable(
                name: "Routes");
        }
    }
}
