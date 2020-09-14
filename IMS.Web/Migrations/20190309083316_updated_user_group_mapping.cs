using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class updated_user_group_mapping : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserRolesMapping");

            migrationBuilder.AddColumn<int>(
                name: "InstituteId",
                table: "UserGroups",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "UserGroupMapping",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    UserGroupId = table.Column<int>(nullable: false),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGroupMapping", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserGroupMapping_UserGroups_UserGroupId",
                        column: x => x.UserGroupId,
                        principalTable: "UserGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserGroupMapping_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserGroups_InstituteId",
                table: "UserGroups",
                column: "InstituteId");

            migrationBuilder.CreateIndex(
                name: "IX_UserGroupMapping_UserGroupId",
                table: "UserGroupMapping",
                column: "UserGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_UserGroupMapping_UserId",
                table: "UserGroupMapping",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserGroups_Institutes_InstituteId",
                table: "UserGroups",
                column: "InstituteId",
                principalTable: "Institutes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserGroups_Institutes_InstituteId",
                table: "UserGroups");

            migrationBuilder.DropTable(
                name: "UserGroupMapping");

            migrationBuilder.DropIndex(
                name: "IX_UserGroups_InstituteId",
                table: "UserGroups");

            migrationBuilder.DropColumn(
                name: "InstituteId",
                table: "UserGroups");

            migrationBuilder.CreateTable(
                name: "UserRolesMapping",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    InstituteRoleId = table.Column<int>(nullable: false),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRolesMapping", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserRolesMapping_InstituteRoles_InstituteRoleId",
                        column: x => x.InstituteRoleId,
                        principalTable: "InstituteRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRolesMapping_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserRolesMapping_InstituteRoleId",
                table: "UserRolesMapping",
                column: "InstituteRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRolesMapping_UserId",
                table: "UserRolesMapping",
                column: "UserId");
        }
    }
}
