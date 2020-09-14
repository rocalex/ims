using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_finance_payments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FinancePayments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Code = table.Column<string>(nullable: false),
                    PaymentDate = table.Column<DateTime>(nullable: false),
                    PaymentTypeId = table.Column<int>(nullable: false),
                    PaymentReference = table.Column<int>(nullable: false),
                    ReferenceCode = table.Column<string>(nullable: true),
                    ReferenceDate = table.Column<DateTime>(nullable: true),
                    PaymentById = table.Column<string>(nullable: false),
                    PaidToId = table.Column<int>(nullable: false),
                    Amount = table.Column<double>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FinancePayments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FinancePayments_AspNetUsers_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FinancePayments_Institutes_InstituteId",
                        column: x => x.InstituteId,
                        principalTable: "Institutes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FinancePayments_FinanceChartOfAccounts_PaidToId",
                        column: x => x.PaidToId,
                        principalTable: "FinanceChartOfAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FinancePayments_AspNetUsers_PaymentById",
                        column: x => x.PaymentById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FinancePayments_FinancePaymentTypes_PaymentTypeId",
                        column: x => x.PaymentTypeId,
                        principalTable: "FinancePaymentTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FinancePayments_CreatedBy",
                table: "FinancePayments",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_FinancePayments_InstituteId",
                table: "FinancePayments",
                column: "InstituteId");

            migrationBuilder.CreateIndex(
                name: "IX_FinancePayments_PaidToId",
                table: "FinancePayments",
                column: "PaidToId");

            migrationBuilder.CreateIndex(
                name: "IX_FinancePayments_PaymentById",
                table: "FinancePayments",
                column: "PaymentById");

            migrationBuilder.CreateIndex(
                name: "IX_FinancePayments_PaymentTypeId",
                table: "FinancePayments",
                column: "PaymentTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FinancePayments");
        }
    }
}
