using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_for_fee_refund : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FeeRefunds",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    RefundNumber = table.Column<string>(nullable: false),
                    ChallanNumber = table.Column<string>(nullable: false),
                    StudentId = table.Column<int>(nullable: false),
                    RefundDate = table.Column<DateTime>(nullable: false),
                    IssuedById = table.Column<string>(nullable: false),
                    Amount = table.Column<double>(nullable: false),
                    ChequeNumber = table.Column<string>(nullable: false),
                    ChequeDate = table.Column<DateTime>(nullable: false),
                    BankName = table.Column<string>(nullable: false),
                    Remark = table.Column<string>(nullable: true),
                    UpdatedById = table.Column<string>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeeRefunds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FeeRefunds_AspNetUsers_IssuedById",
                        column: x => x.IssuedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FeeRefunds_StudentBasicInformation_StudentId",
                        column: x => x.StudentId,
                        principalTable: "StudentBasicInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FeeRefunds_AspNetUsers_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FeeRefunds_IssuedById",
                table: "FeeRefunds",
                column: "IssuedById");

            migrationBuilder.CreateIndex(
                name: "IX_FeeRefunds_StudentId",
                table: "FeeRefunds",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_FeeRefunds_UpdatedById",
                table: "FeeRefunds",
                column: "UpdatedById");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FeeRefunds");
        }
    }
}
