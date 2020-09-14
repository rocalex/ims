using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class alter_property_relationship_studentfee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentFeeComponents_FeeComponents_IndividualFeeComponentId",
                table: "StudentFeeComponents");

            migrationBuilder.DropIndex(
                name: "IX_StudentFeeComponents_IndividualFeeComponentId",
                table: "StudentFeeComponents");

            migrationBuilder.DropColumn(
                name: "IndividualFeeComponentId",
                table: "StudentFeeComponents");

            migrationBuilder.CreateIndex(
                name: "IX_StudentFeeComponents_IndividualOrDiscountFeeComponentId",
                table: "StudentFeeComponents",
                column: "IndividualOrDiscountFeeComponentId");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentFeeComponents_FeeComponents_IndividualOrDiscountFeeComponentId",
                table: "StudentFeeComponents",
                column: "IndividualOrDiscountFeeComponentId",
                principalTable: "FeeComponents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentFeeComponents_FeeComponents_IndividualOrDiscountFeeComponentId",
                table: "StudentFeeComponents");

            migrationBuilder.DropIndex(
                name: "IX_StudentFeeComponents_IndividualOrDiscountFeeComponentId",
                table: "StudentFeeComponents");

            migrationBuilder.AddColumn<int>(
                name: "IndividualFeeComponentId",
                table: "StudentFeeComponents",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_StudentFeeComponents_IndividualFeeComponentId",
                table: "StudentFeeComponents",
                column: "IndividualFeeComponentId");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentFeeComponents_FeeComponents_IndividualFeeComponentId",
                table: "StudentFeeComponents",
                column: "IndividualFeeComponentId",
                principalTable: "FeeComponents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
