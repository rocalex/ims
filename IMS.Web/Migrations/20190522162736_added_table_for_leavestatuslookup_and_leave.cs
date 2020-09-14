using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_for_leavestatuslookup_and_leave : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LeaveStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Code = table.Column<string>(nullable: false),
                    Status = table.Column<bool>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    IsEditable = table.Column<bool>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LeaveStatuses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LeaveStatuses_Institutes_InstituteId",
                        column: x => x.InstituteId,
                        principalTable: "Institutes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StaffLeaves",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    StaffId = table.Column<int>(nullable: false),
                    FromDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    LeaveTypeId = table.Column<int>(nullable: false),
                    Reason = table.Column<string>(nullable: false),
                    StatusId = table.Column<int>(nullable: false),
                    ApprovedById = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StaffLeaves", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StaffLeaves_AspNetUsers_ApprovedById",
                        column: x => x.ApprovedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StaffLeaves_LeaveTypes_LeaveTypeId",
                        column: x => x.LeaveTypeId,
                        principalTable: "LeaveTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StaffLeaves_StaffBasicPersonalInformation_StaffId",
                        column: x => x.StaffId,
                        principalTable: "StaffBasicPersonalInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StaffLeaves_LeaveStatuses_StatusId",
                        column: x => x.StatusId,
                        principalTable: "LeaveStatuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "StudentLeaves",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    StudentId = table.Column<int>(nullable: false),
                    FromDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    LeaveTypeId = table.Column<int>(nullable: false),
                    Reason = table.Column<string>(nullable: false),
                    StatusId = table.Column<int>(nullable: false),
                    ApprovedById = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentLeaves", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudentLeaves_StaffBasicPersonalInformation_ApprovedById",
                        column: x => x.ApprovedById,
                        principalTable: "StaffBasicPersonalInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentLeaves_LeaveTypes_LeaveTypeId",
                        column: x => x.LeaveTypeId,
                        principalTable: "LeaveTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentLeaves_LeaveStatuses_StatusId",
                        column: x => x.StatusId,
                        principalTable: "LeaveStatuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentLeaves_StudentBasicInformation_StudentId",
                        column: x => x.StudentId,
                        principalTable: "StudentBasicInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LeaveStatuses_InstituteId",
                table: "LeaveStatuses",
                column: "InstituteId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffLeaves_ApprovedById",
                table: "StaffLeaves",
                column: "ApprovedById");

            migrationBuilder.CreateIndex(
                name: "IX_StaffLeaves_LeaveTypeId",
                table: "StaffLeaves",
                column: "LeaveTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffLeaves_StaffId",
                table: "StaffLeaves",
                column: "StaffId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffLeaves_StatusId",
                table: "StaffLeaves",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentLeaves_ApprovedById",
                table: "StudentLeaves",
                column: "ApprovedById");

            migrationBuilder.CreateIndex(
                name: "IX_StudentLeaves_LeaveTypeId",
                table: "StudentLeaves",
                column: "LeaveTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentLeaves_StatusId",
                table: "StudentLeaves",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentLeaves_StudentId",
                table: "StudentLeaves",
                column: "StudentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StaffLeaves");

            migrationBuilder.DropTable(
                name: "StudentLeaves");

            migrationBuilder.DropTable(
                name: "LeaveStatuses");
        }
    }
}
