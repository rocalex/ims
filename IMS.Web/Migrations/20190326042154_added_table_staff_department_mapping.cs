using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_staff_department_mapping : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StaffDepartmentMappings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    DepartmentId = table.Column<int>(nullable: false),
                    StaffId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StaffDepartmentMappings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StaffDepartmentMappings_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StaffDepartmentMappings_StaffBasicPersonalInformation_StaffId",
                        column: x => x.StaffId,
                        principalTable: "StaffBasicPersonalInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StaffDepartmentMappings_DepartmentId",
                table: "StaffDepartmentMappings",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffDepartmentMappings_StaffId",
                table: "StaffDepartmentMappings",
                column: "StaffId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StaffDepartmentMappings");
        }
    }
}
