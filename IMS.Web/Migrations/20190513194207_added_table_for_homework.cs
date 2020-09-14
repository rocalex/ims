using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_for_homework : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StaffActivities_ActivityStatus_ActivityStatusId",
                table: "StaffActivities");

            migrationBuilder.DropForeignKey(
                name: "FK_StaffActivities_MeetingAgendas_MeetingAgendaId",
                table: "StaffActivities");

            migrationBuilder.CreateTable(
                name: "Homeworks",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    StaffId = table.Column<int>(nullable: false),
                    HomeworkDate = table.Column<DateTime>(nullable: false),
                    ClassId = table.Column<int>(nullable: false),
                    SectionId = table.Column<int>(nullable: false),
                    UpdatedById = table.Column<string>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Homeworks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Homeworks_InstituteClasses_ClassId",
                        column: x => x.ClassId,
                        principalTable: "InstituteClasses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Homeworks_Sections_SectionId",
                        column: x => x.SectionId,
                        principalTable: "Sections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Homeworks_StaffBasicPersonalInformation_StaffId",
                        column: x => x.StaffId,
                        principalTable: "StaffBasicPersonalInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Homeworks_AspNetUsers_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HomeworkSubjectMappings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    HomeworkId = table.Column<int>(nullable: false),
                    SubjectId = table.Column<int>(nullable: false),
                    HomeworkData = table.Column<string>(nullable: false),
                    IsSelected = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HomeworkSubjectMappings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HomeworkSubjectMappings_Homeworks_HomeworkId",
                        column: x => x.HomeworkId,
                        principalTable: "Homeworks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HomeworkSubjectMappings_InstituteSubjects_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "InstituteSubjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Homeworks_ClassId",
                table: "Homeworks",
                column: "ClassId");

            migrationBuilder.CreateIndex(
                name: "IX_Homeworks_SectionId",
                table: "Homeworks",
                column: "SectionId");

            migrationBuilder.CreateIndex(
                name: "IX_Homeworks_StaffId",
                table: "Homeworks",
                column: "StaffId");

            migrationBuilder.CreateIndex(
                name: "IX_Homeworks_UpdatedById",
                table: "Homeworks",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_HomeworkSubjectMappings_HomeworkId",
                table: "HomeworkSubjectMappings",
                column: "HomeworkId");

            migrationBuilder.CreateIndex(
                name: "IX_HomeworkSubjectMappings_SubjectId",
                table: "HomeworkSubjectMappings",
                column: "SubjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_StaffActivities_ActivityStatus_ActivityStatusId",
                table: "StaffActivities",
                column: "ActivityStatusId",
                principalTable: "ActivityStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StaffActivities_MeetingAgendas_MeetingAgendaId",
                table: "StaffActivities",
                column: "MeetingAgendaId",
                principalTable: "MeetingAgendas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StaffActivities_ActivityStatus_ActivityStatusId",
                table: "StaffActivities");

            migrationBuilder.DropForeignKey(
                name: "FK_StaffActivities_MeetingAgendas_MeetingAgendaId",
                table: "StaffActivities");

            migrationBuilder.DropTable(
                name: "HomeworkSubjectMappings");

            migrationBuilder.DropTable(
                name: "Homeworks");

            migrationBuilder.AddForeignKey(
                name: "FK_StaffActivities_ActivityStatus_ActivityStatusId",
                table: "StaffActivities",
                column: "ActivityStatusId",
                principalTable: "ActivityStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StaffActivities_MeetingAgendas_MeetingAgendaId",
                table: "StaffActivities",
                column: "MeetingAgendaId",
                principalTable: "MeetingAgendas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
