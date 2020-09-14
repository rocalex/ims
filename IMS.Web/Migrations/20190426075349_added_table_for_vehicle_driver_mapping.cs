using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_for_vehicle_driver_mapping : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FinancePayments_FinanceChartOfAccounts_PaidToId",
                table: "FinancePayments");

            migrationBuilder.DropForeignKey(
                name: "FK_FinancePayments_AspNetUsers_PaymentById",
                table: "FinancePayments");

            migrationBuilder.DropForeignKey(
                name: "FK_FinancePayments_FinancePaymentTypes_PaymentTypeId",
                table: "FinancePayments");

            migrationBuilder.CreateTable(
                name: "VehicleDriverMappings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    VehicleId = table.Column<int>(nullable: false),
                    DriverId = table.Column<int>(nullable: false),
                    IsPrimary = table.Column<bool>(nullable: false),
                    UpdatedById = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleDriverMappings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VehicleDriverMappings_DriverMasters_DriverId",
                        column: x => x.DriverId,
                        principalTable: "DriverMasters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_VehicleDriverMappings_AspNetUsers_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_VehicleDriverMappings_VehicleMasters_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "VehicleMasters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VehicleDriverMappings_DriverId",
                table: "VehicleDriverMappings",
                column: "DriverId");

            migrationBuilder.CreateIndex(
                name: "IX_VehicleDriverMappings_UpdatedById",
                table: "VehicleDriverMappings",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_VehicleDriverMappings_VehicleId",
                table: "VehicleDriverMappings",
                column: "VehicleId");

            migrationBuilder.AddForeignKey(
                name: "FK_FinancePayments_FinanceChartOfAccounts_PaidToId",
                table: "FinancePayments",
                column: "PaidToId",
                principalTable: "FinanceChartOfAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FinancePayments_AspNetUsers_PaymentById",
                table: "FinancePayments",
                column: "PaymentById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FinancePayments_FinancePaymentTypes_PaymentTypeId",
                table: "FinancePayments",
                column: "PaymentTypeId",
                principalTable: "FinancePaymentTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FinancePayments_FinanceChartOfAccounts_PaidToId",
                table: "FinancePayments");

            migrationBuilder.DropForeignKey(
                name: "FK_FinancePayments_AspNetUsers_PaymentById",
                table: "FinancePayments");

            migrationBuilder.DropForeignKey(
                name: "FK_FinancePayments_FinancePaymentTypes_PaymentTypeId",
                table: "FinancePayments");

            migrationBuilder.DropTable(
                name: "VehicleDriverMappings");

            migrationBuilder.AddForeignKey(
                name: "FK_FinancePayments_FinanceChartOfAccounts_PaidToId",
                table: "FinancePayments",
                column: "PaidToId",
                principalTable: "FinanceChartOfAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FinancePayments_AspNetUsers_PaymentById",
                table: "FinancePayments",
                column: "PaymentById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FinancePayments_FinancePaymentTypes_PaymentTypeId",
                table: "FinancePayments",
                column: "PaymentTypeId",
                principalTable: "FinancePaymentTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
