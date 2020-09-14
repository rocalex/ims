using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_for_vehicle_master : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VehicleMasters",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    VehicleCode = table.Column<string>(nullable: false),
                    VehicleType = table.Column<int>(nullable: false),
                    FuelType = table.Column<int>(nullable: false),
                    VehicleRegistrationNumber = table.Column<string>(nullable: false),
                    EngineNumber = table.Column<string>(nullable: false),
                    ChasisNumber = table.Column<string>(nullable: true),
                    AverageKMPL = table.Column<decimal>(nullable: false),
                    InsuranceNumber = table.Column<string>(nullable: true),
                    InsuranceDate = table.Column<DateTime>(nullable: true),
                    InsuranceExpDate = table.Column<DateTime>(nullable: true),
                    NextMaintenanceDate = table.Column<DateTime>(nullable: false),
                    PermitValidityDate = table.Column<DateTime>(nullable: true),
                    FitnessExpDate = table.Column<DateTime>(nullable: true),
                    ExtraFittings = table.Column<string>(nullable: true),
                    VehiclePhoto = table.Column<string>(nullable: true),
                    RegistrationCopyPhoto = table.Column<string>(nullable: true),
                    InsuranceCopyPhoto = table.Column<string>(nullable: true),
                    InstituteId = table.Column<int>(nullable: false),
                    UpdatedById = table.Column<string>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleMasters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VehicleMasters_Institutes_InstituteId",
                        column: x => x.InstituteId,
                        principalTable: "Institutes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VehicleMasters_AspNetUsers_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VehicleMasters_InstituteId",
                table: "VehicleMasters",
                column: "InstituteId");

            migrationBuilder.CreateIndex(
                name: "IX_VehicleMasters_UpdatedById",
                table: "VehicleMasters",
                column: "UpdatedById");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VehicleMasters");
        }
    }
}
