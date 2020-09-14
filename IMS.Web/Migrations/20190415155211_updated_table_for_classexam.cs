using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class updated_table_for_classexam : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UpdatedById",
                table: "ClassExams",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedOn",
                table: "ClassExams",
                nullable: false,
                defaultValue: DateTime.UtcNow);

            migrationBuilder.CreateIndex(
                name: "IX_ClassExams_UpdatedById",
                table: "ClassExams",
                column: "UpdatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_ClassExams_AspNetUsers_UpdatedById",
                table: "ClassExams",
                column: "UpdatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClassExams_AspNetUsers_UpdatedById",
                table: "ClassExams");

            migrationBuilder.DropIndex(
                name: "IX_ClassExams_UpdatedById",
                table: "ClassExams");

            migrationBuilder.DropColumn(
                name: "UpdatedById",
                table: "ClassExams");

            migrationBuilder.DropColumn(
                name: "UpdatedOn",
                table: "ClassExams");
        }
    }
}
