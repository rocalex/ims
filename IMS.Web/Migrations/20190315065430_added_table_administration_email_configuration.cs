using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_table_administration_email_configuration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdministrationEmailConfigurations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    HostName = table.Column<string>(nullable: false),
                    PortNumber = table.Column<string>(nullable: false),
                    MailUserName = table.Column<string>(nullable: false),
                    MailPassword = table.Column<string>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true),
                    UpdatedBy = table.Column<string>(nullable: true),
                    UpdatedAt = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdministrationEmailConfigurations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdministrationEmailConfigurations_AspNetUsers_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AdministrationEmailConfigurations_Institutes_InstituteId",
                        column: x => x.InstituteId,
                        principalTable: "Institutes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AdministrationEmailConfigurations_AspNetUsers_UpdatedBy",
                        column: x => x.UpdatedBy,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdministrationEmailConfigurations_CreatedBy",
                table: "AdministrationEmailConfigurations",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_AdministrationEmailConfigurations_InstituteId",
                table: "AdministrationEmailConfigurations",
                column: "InstituteId");

            migrationBuilder.CreateIndex(
                name: "IX_AdministrationEmailConfigurations_UpdatedBy",
                table: "AdministrationEmailConfigurations",
                column: "UpdatedBy");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdministrationEmailConfigurations");
        }
    }
}
