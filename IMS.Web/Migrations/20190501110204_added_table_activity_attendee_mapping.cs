using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_activity_attendee_mapping : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ActivityAttendeeMappings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ActivityId = table.Column<int>(nullable: false),
                    AttendeeId = table.Column<string>(nullable: false),
                    ActivityAttendeeType = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityAttendeeMappings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityAttendeeMappings_StaffActivities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "StaffActivities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ActivityAttendeeMappings_AspNetUsers_AttendeeId",
                        column: x => x.AttendeeId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                }); 

            migrationBuilder.CreateIndex(
                name: "IX_ActivityAttendeeMappings_ActivityId",
                table: "ActivityAttendeeMappings",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityAttendeeMappings_AttendeeId",
                table: "ActivityAttendeeMappings",
                column: "AttendeeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActivityAttendeeMappings");
        }
    }
}
