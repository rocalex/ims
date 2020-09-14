using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_for_studentfee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StudentFees",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    StudentId = table.Column<int>(nullable: false),
                    ClassId = table.Column<int>(nullable: false),
                    UpdatedById = table.Column<string>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentFees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudentFees_InstituteClasses_ClassId",
                        column: x => x.ClassId,
                        principalTable: "InstituteClasses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentFees_StudentBasicInformation_StudentId",
                        column: x => x.StudentId,
                        principalTable: "StudentBasicInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudentFees_AspNetUsers_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "StudentFeeComponents",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    StudentFeeId = table.Column<int>(nullable: false),
                    IndividualOrDiscountFeeComponentId = table.Column<int>(nullable: false),
                    IndividualFeeComponentId = table.Column<int>(nullable: false),
                    TermOrderId = table.Column<int>(nullable: false),
                    Amount = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentFeeComponents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudentFeeComponents_FeeComponents_IndividualFeeComponentId",
                        column: x => x.IndividualFeeComponentId,
                        principalTable: "FeeComponents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentFeeComponents_StudentFees_StudentFeeId",
                        column: x => x.StudentFeeId,
                        principalTable: "StudentFees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StudentFeeComponents_IndividualFeeComponentId",
                table: "StudentFeeComponents",
                column: "IndividualFeeComponentId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentFeeComponents_StudentFeeId",
                table: "StudentFeeComponents",
                column: "StudentFeeId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentFees_ClassId",
                table: "StudentFees",
                column: "ClassId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentFees_StudentId",
                table: "StudentFees",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentFees_UpdatedById",
                table: "StudentFees",
                column: "UpdatedById");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StudentFeeComponents");

            migrationBuilder.DropTable(
                name: "StudentFees");
        }
    }
}
