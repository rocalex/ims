using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_time_table_break_details : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstBreakAfterPeriod",
                table: "TimeTables");

            migrationBuilder.DropColumn(
                name: "FirstBreakDuration",
                table: "TimeTables");

            migrationBuilder.DropColumn(
                name: "SecondBreakAfterPeriod",
                table: "TimeTables");

            migrationBuilder.RenameColumn(
                name: "SecondBreakDuration",
                table: "TimeTables",
                newName: "BreaksCount");

            migrationBuilder.CreateTable(
                name: "TimeTableBreakDetails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    TimeTableId = table.Column<int>(nullable: false),
                    BreakDuration = table.Column<int>(nullable: false),
                    BreakAfterPeriod = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeTableBreakDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TimeTableBreakDetails_TimeTables_TimeTableId",
                        column: x => x.TimeTableId,
                        principalTable: "TimeTables",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TimeTableBreakDetails");

            migrationBuilder.RenameColumn(
                name: "BreaksCount",
                table: "TimeTables",
                newName: "SecondBreakDuration");

            migrationBuilder.AddColumn<int>(
                name: "FirstBreakAfterPeriod",
                table: "TimeTables",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FirstBreakDuration",
                table: "TimeTables",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SecondBreakAfterPeriod",
                table: "TimeTables",
                nullable: false,
                defaultValue: 0);
        }
    }
}
