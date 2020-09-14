using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_for_student_staff_gallery_mapping : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StaffGalleryMappings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ImageUrl = table.Column<string>(nullable: false),
                    StaffId = table.Column<int>(nullable: false),
                    UpdateOn = table.Column<DateTime>(nullable: false),
                    UpdatedById = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StaffGalleryMappings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StaffGalleryMappings_StaffBasicPersonalInformation_StaffId",
                        column: x => x.StaffId,
                        principalTable: "StaffBasicPersonalInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StaffGalleryMappings_AspNetUsers_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "StudentGalleryMappings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ImageUrl = table.Column<string>(nullable: false),
                    StudentId = table.Column<int>(nullable: false),
                    UpdateOn = table.Column<DateTime>(nullable: false),
                    UpdatedById = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentGalleryMappings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudentGalleryMappings_StudentBasicInformation_StudentId",
                        column: x => x.StudentId,
                        principalTable: "StudentBasicInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudentGalleryMappings_AspNetUsers_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
        }
    }
}
