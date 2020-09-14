using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_event_info : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EventInfos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    EventDate = table.Column<DateTime>(nullable: false),
                    Description = table.Column<string>(nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    Priority = table.Column<int>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventInfos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EventInfos_AspNetUsers_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EventInfos_Institutes_InstituteId",
                        column: x => x.InstituteId,
                        principalTable: "Institutes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EventInfos_CreatedBy",
                table: "EventInfos",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_EventInfos_InstituteId",
                table: "EventInfos",
                column: "InstituteId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EventInfos");
        }
    }
}
