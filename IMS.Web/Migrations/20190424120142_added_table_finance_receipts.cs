using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_finance_receipts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FinanceReceipts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Code = table.Column<string>(nullable: false),
                    ReceiptDate = table.Column<DateTime>(nullable: false),
                    Amount = table.Column<double>(nullable: false),
                    ReceivedFrom = table.Column<int>(nullable: false),
                    ReceivedBy = table.Column<string>(nullable: false),
                    Remarks = table.Column<string>(nullable: true),
                    InstituteId = table.Column<int>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FinanceReceipts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FinanceReceipts_AspNetUsers_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FinanceReceipts_Institutes_InstituteId",
                        column: x => x.InstituteId,
                        principalTable: "Institutes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FinanceReceipts_AspNetUsers_ReceivedBy",
                        column: x => x.ReceivedBy,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FinanceReceipts_FinanceChartOfAccounts_ReceivedFrom",
                        column: x => x.ReceivedFrom,
                        principalTable: "FinanceChartOfAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FinanceReceipts_CreatedBy",
                table: "FinanceReceipts",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_FinanceReceipts_InstituteId",
                table: "FinanceReceipts",
                column: "InstituteId");

            migrationBuilder.CreateIndex(
                name: "IX_FinanceReceipts_ReceivedBy",
                table: "FinanceReceipts",
                column: "ReceivedBy");

            migrationBuilder.CreateIndex(
                name: "IX_FinanceReceipts_ReceivedFrom",
                table: "FinanceReceipts",
                column: "ReceivedFrom");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FinanceReceipts");
        }
    }
}
