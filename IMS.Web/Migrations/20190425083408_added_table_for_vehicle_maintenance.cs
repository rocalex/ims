using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_for_vehicle_maintenance : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FinanceReceipts_AspNetUsers_ReceivedBy",
                table: "FinanceReceipts");

            migrationBuilder.DropForeignKey(
                name: "FK_FinanceReceipts_FinanceChartOfAccounts_ReceivedFrom",
                table: "FinanceReceipts");

            migrationBuilder.CreateTable(
                name: "VehicleAccidents",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Code = table.Column<string>(nullable: false),
                    AccidentDate = table.Column<DateTime>(nullable: false),
                    VehicleId = table.Column<int>(nullable: false),
                    EstimateCost = table.Column<double>(nullable: false),
                    DriverId = table.Column<int>(nullable: false),
                    Address = table.Column<string>(nullable: true),
                    UpdatedById = table.Column<string>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleAccidents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VehicleAccidents_DriverMasters_DriverId",
                        column: x => x.DriverId,
                        principalTable: "DriverMasters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_VehicleAccidents_AspNetUsers_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_VehicleAccidents_VehicleMasters_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "VehicleMasters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VehicleBreakDowns",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Code = table.Column<string>(nullable: false),
                    BreakDownDate = table.Column<DateTime>(nullable: false),
                    VehicleId = table.Column<int>(nullable: false),
                    BreakDownDuration = table.Column<DateTime>(nullable: false),
                    DriverId = table.Column<int>(nullable: false),
                    Address = table.Column<string>(nullable: true),
                    UpdatedById = table.Column<string>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleBreakDowns", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VehicleBreakDowns_DriverMasters_DriverId",
                        column: x => x.DriverId,
                        principalTable: "DriverMasters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_VehicleBreakDowns_AspNetUsers_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_VehicleBreakDowns_VehicleMasters_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "VehicleMasters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VehicleMaintenances",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Code = table.Column<string>(nullable: false),
                    MaintenanceDate = table.Column<DateTime>(nullable: false),
                    VehicleId = table.Column<int>(nullable: false),
                    NextMaintenanceDate = table.Column<DateTime>(nullable: false),
                    MaintenanceDoneBy = table.Column<string>(nullable: true),
                    EstimateCost = table.Column<double>(nullable: false),
                    ActionTaken = table.Column<string>(nullable: false),
                    Remark = table.Column<string>(nullable: true),
                    UpdatedById = table.Column<string>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleMaintenances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VehicleMaintenances_AspNetUsers_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_VehicleMaintenances_VehicleMasters_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "VehicleMasters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VehicleRepairs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Code = table.Column<string>(nullable: false),
                    RepairDate = table.Column<DateTime>(nullable: false),
                    VehicleId = table.Column<int>(nullable: false),
                    RepairCost = table.Column<double>(nullable: false),
                    Remarks = table.Column<string>(nullable: true),
                    UpdatedById = table.Column<string>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleRepairs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VehicleRepairs_AspNetUsers_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_VehicleRepairs_VehicleMasters_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "VehicleMasters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VehicleAccidents_DriverId",
                table: "VehicleAccidents",
                column: "DriverId");

            migrationBuilder.CreateIndex(
                name: "IX_VehicleAccidents_UpdatedById",
                table: "VehicleAccidents",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_VehicleAccidents_VehicleId",
                table: "VehicleAccidents",
                column: "VehicleId");

            migrationBuilder.CreateIndex(
                name: "IX_VehicleBreakDowns_DriverId",
                table: "VehicleBreakDowns",
                column: "DriverId");

            migrationBuilder.CreateIndex(
                name: "IX_VehicleBreakDowns_UpdatedById",
                table: "VehicleBreakDowns",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_VehicleBreakDowns_VehicleId",
                table: "VehicleBreakDowns",
                column: "VehicleId");

            migrationBuilder.CreateIndex(
                name: "IX_VehicleMaintenances_UpdatedById",
                table: "VehicleMaintenances",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_VehicleMaintenances_VehicleId",
                table: "VehicleMaintenances",
                column: "VehicleId");

            migrationBuilder.CreateIndex(
                name: "IX_VehicleRepairs_UpdatedById",
                table: "VehicleRepairs",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_VehicleRepairs_VehicleId",
                table: "VehicleRepairs",
                column: "VehicleId");

            migrationBuilder.AddForeignKey(
                name: "FK_FinanceReceipts_AspNetUsers_ReceivedBy",
                table: "FinanceReceipts",
                column: "ReceivedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FinanceReceipts_FinanceChartOfAccounts_ReceivedFrom",
                table: "FinanceReceipts",
                column: "ReceivedFrom",
                principalTable: "FinanceChartOfAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FinanceReceipts_AspNetUsers_ReceivedBy",
                table: "FinanceReceipts");

            migrationBuilder.DropForeignKey(
                name: "FK_FinanceReceipts_FinanceChartOfAccounts_ReceivedFrom",
                table: "FinanceReceipts");

            migrationBuilder.DropTable(
                name: "VehicleAccidents");

            migrationBuilder.DropTable(
                name: "VehicleBreakDowns");

            migrationBuilder.DropTable(
                name: "VehicleMaintenances");

            migrationBuilder.DropTable(
                name: "VehicleRepairs");

            migrationBuilder.AddForeignKey(
                name: "FK_FinanceReceipts_AspNetUsers_ReceivedBy",
                table: "FinanceReceipts",
                column: "ReceivedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FinanceReceipts_FinanceChartOfAccounts_ReceivedFrom",
                table: "FinanceReceipts",
                column: "ReceivedFrom",
                principalTable: "FinanceChartOfAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
