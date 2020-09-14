using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_for_feereceipt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FeeReceipts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ReceiptNumber = table.Column<string>(nullable: false),
                    ReceiptDate = table.Column<DateTime>(nullable: false),
                    StudentId = table.Column<int>(nullable: false),
                    ReceiptType = table.Column<int>(nullable: false),
                    ChallanNumber = table.Column<string>(nullable: false),
                    ChequeNumber = table.Column<string>(nullable: true),
                    ChequeDate = table.Column<DateTime>(nullable: true),
                    BankName = table.Column<string>(nullable: true),
                    Amount = table.Column<double>(nullable: false),
                    LateFee = table.Column<double>(nullable: false),
                    PreviousAmountPaid = table.Column<double>(nullable: false),
                    Total = table.Column<double>(nullable: false),
                    ClassId = table.Column<int>(nullable: false),
                    IsNewAdmission = table.Column<bool>(nullable: false),
                    UpdatedById = table.Column<string>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeeReceipts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FeeReceipts_InstituteClasses_ClassId",
                        column: x => x.ClassId,
                        principalTable: "InstituteClasses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FeeReceipts_StudentBasicInformation_StudentId",
                        column: x => x.StudentId,
                        principalTable: "StudentBasicInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FeeReceipts_AspNetUsers_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FeeReceiptComponents",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Amount = table.Column<double>(nullable: false),
                    OrderId = table.Column<int>(nullable: false),
                    FeeReciptId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeeReceiptComponents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FeeReceiptComponents_FeeReceipts_FeeReciptId",
                        column: x => x.FeeReciptId,
                        principalTable: "FeeReceipts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FeeReceiptComponents_FeeReciptId",
                table: "FeeReceiptComponents",
                column: "FeeReciptId");

            migrationBuilder.CreateIndex(
                name: "IX_FeeReceipts_ClassId",
                table: "FeeReceipts",
                column: "ClassId");

            migrationBuilder.CreateIndex(
                name: "IX_FeeReceipts_StudentId",
                table: "FeeReceipts",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_FeeReceipts_UpdatedById",
                table: "FeeReceipts",
                column: "UpdatedById");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FeeReceiptComponents");

            migrationBuilder.DropTable(
                name: "FeeReceipts");
        }
    }
}
