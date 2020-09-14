using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_for_vehicle_document : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VehicleDocumentMappings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    FileUrl = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    ExpiredDate = table.Column<DateTime>(nullable: true),
                    MetaData = table.Column<string>(nullable: true),
                    FileType = table.Column<int>(nullable: false),
                    VehicleId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleDocumentMappings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VehicleDocumentMappings_VehicleMasters_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "VehicleMasters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VehicleDocumentMappings_VehicleId",
                table: "VehicleDocumentMappings",
                column: "VehicleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VehicleDocumentMappings");
        }
    }
}
