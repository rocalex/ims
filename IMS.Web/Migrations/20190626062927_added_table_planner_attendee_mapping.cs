using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_planner_attendee_mapping : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PlannerAttendeeMappings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    PlannerId = table.Column<int>(nullable: false),
                    AttendeeId = table.Column<string>(nullable: false),
                    ActivityAttendeeType = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlannerAttendeeMappings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlannerAttendeeMappings_AspNetUsers_AttendeeId",
                        column: x => x.AttendeeId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PlannerAttendeeMappings_StaffPlanners_PlannerId",
                        column: x => x.PlannerId,
                        principalTable: "StaffPlanners",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PlannerAttendeeMappings_AttendeeId",
                table: "PlannerAttendeeMappings",
                column: "AttendeeId");

            migrationBuilder.CreateIndex(
                name: "IX_PlannerAttendeeMappings_PlannerId",
                table: "PlannerAttendeeMappings",
                column: "PlannerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlannerAttendeeMappings");
        }
    }
}
