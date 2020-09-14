using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class alter_table_template : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Templates_TemplateFeatures_TemplateFeatureId",
                table: "Templates");

            migrationBuilder.DropForeignKey(
                name: "FK_Templates_TemplateTypes_TemplateTypeId",
                table: "Templates");

            migrationBuilder.DropIndex(
                name: "IX_Templates_TemplateFeatureId",
                table: "Templates");

            migrationBuilder.DropColumn(
                name: "TemplateFeatureId",
                table: "Templates");

            migrationBuilder.RenameColumn(
                name: "TemplateTypeId",
                table: "Templates",
                newName: "InstituteId");

            migrationBuilder.RenameIndex(
                name: "IX_Templates_TemplateTypeId",
                table: "Templates",
                newName: "IX_Templates_InstituteId");

            migrationBuilder.AlterColumn<string>(
                name: "Format",
                table: "Templates",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TemplateFeatureType",
                table: "Templates",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TemplateType",
                table: "Templates",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Templates_Institutes_InstituteId",
                table: "Templates",
                column: "InstituteId",
                principalTable: "Institutes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Templates_Institutes_InstituteId",
                table: "Templates");

            migrationBuilder.DropColumn(
                name: "TemplateFeatureType",
                table: "Templates");

            migrationBuilder.DropColumn(
                name: "TemplateType",
                table: "Templates");

            migrationBuilder.RenameColumn(
                name: "InstituteId",
                table: "Templates",
                newName: "TemplateTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_Templates_InstituteId",
                table: "Templates",
                newName: "IX_Templates_TemplateTypeId");

            migrationBuilder.AlterColumn<string>(
                name: "Format",
                table: "Templates",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<int>(
                name: "TemplateFeatureId",
                table: "Templates",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Templates_TemplateFeatureId",
                table: "Templates",
                column: "TemplateFeatureId");

            migrationBuilder.AddForeignKey(
                name: "FK_Templates_TemplateFeatures_TemplateFeatureId",
                table: "Templates",
                column: "TemplateFeatureId",
                principalTable: "TemplateFeatures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Templates_TemplateTypes_TemplateTypeId",
                table: "Templates",
                column: "TemplateTypeId",
                principalTable: "TemplateTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
