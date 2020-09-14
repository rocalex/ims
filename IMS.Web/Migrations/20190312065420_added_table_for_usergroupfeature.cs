using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_for_usergroupfeature : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserGroupFeatures",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    UserGroupFeatureEnum = table.Column<int>(nullable: false),
                    CanView = table.Column<bool>(nullable: false),
                    CanAdd = table.Column<bool>(nullable: false),
                    CanEdit = table.Column<bool>(nullable: false),
                    CanDelete = table.Column<bool>(nullable: false),
                    UserGroupId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGroupFeatures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserGroupFeatures_UserGroups_UserGroupId",
                        column: x => x.UserGroupId,
                        principalTable: "UserGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserGroupFeatures_UserGroupId",
                table: "UserGroupFeatures",
                column: "UserGroupId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserGroupFeatures");
        }
    }
}
