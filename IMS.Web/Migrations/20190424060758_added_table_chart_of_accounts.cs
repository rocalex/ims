using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_chart_of_accounts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FinanceChartOfAccounts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Code = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    AliasName = table.Column<string>(nullable: false),
                    ParentGroupId = table.Column<int>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false),
                    IsParent = table.Column<bool>(nullable: false),
                    AccountType = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<string>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FinanceChartOfAccounts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FinanceChartOfAccounts_AspNetUsers_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FinanceChartOfAccounts_Institutes_InstituteId",
                        column: x => x.InstituteId,
                        principalTable: "Institutes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FinanceChartOfAccounts_FinanceChartOfAccounts_ParentGroupId",
                        column: x => x.ParentGroupId,
                        principalTable: "FinanceChartOfAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FinanceChartOfAccounts_CreatedBy",
                table: "FinanceChartOfAccounts",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_FinanceChartOfAccounts_InstituteId",
                table: "FinanceChartOfAccounts",
                column: "InstituteId");

            migrationBuilder.CreateIndex(
                name: "IX_FinanceChartOfAccounts_ParentGroupId",
                table: "FinanceChartOfAccounts",
                column: "ParentGroupId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FinanceChartOfAccounts");
        }
    }
}
