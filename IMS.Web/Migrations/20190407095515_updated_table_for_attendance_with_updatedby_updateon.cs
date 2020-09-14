using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class updated_table_for_attendance_with_updatedby_updateon : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UpdatedById",
                table: "StudentAttendances",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedOn",
                table: "StudentAttendances",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_StudentAttendances_UpdatedById",
                table: "StudentAttendances",
                column: "UpdatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentAttendances_AspNetUsers_UpdatedById",
                table: "StudentAttendances",
                column: "UpdatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentAttendances_AspNetUsers_UpdatedById",
                table: "StudentAttendances");

            migrationBuilder.DropIndex(
                name: "IX_StudentAttendances_UpdatedById",
                table: "StudentAttendances");

            migrationBuilder.DropColumn(
                name: "UpdatedById",
                table: "StudentAttendances");

            migrationBuilder.DropColumn(
                name: "UpdatedOn",
                table: "StudentAttendances");
        }
    }
}
