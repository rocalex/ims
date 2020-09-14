using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_subject_column_in_student_notification_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "SentBy",
                table: "StudentNotificationDetails",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Subject",
                table: "StudentNotificationDetails",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_StudentNotificationDetails_SentBy",
                table: "StudentNotificationDetails",
                column: "SentBy");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentNotificationDetails_AspNetUsers_SentBy",
                table: "StudentNotificationDetails",
                column: "SentBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentNotificationDetails_AspNetUsers_SentBy",
                table: "StudentNotificationDetails");

            migrationBuilder.DropIndex(
                name: "IX_StudentNotificationDetails_SentBy",
                table: "StudentNotificationDetails");

            migrationBuilder.DropColumn(
                name: "Subject",
                table: "StudentNotificationDetails");

            migrationBuilder.AlterColumn<string>(
                name: "SentBy",
                table: "StudentNotificationDetails",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
