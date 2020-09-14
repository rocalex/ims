using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class added_notice_related_tables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CircularNotices",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    NoticeDate = table.Column<DateTime>(nullable: false),
                    NoticeTo = table.Column<int>(nullable: false),
                    NoticeType = table.Column<int>(nullable: false),
                    Message = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    CreatedById = table.Column<string>(nullable: false),
                    UpdatedById = table.Column<string>(nullable: true),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CircularNotices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CircularNotices_AspNetUsers_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CircularNotices_Institutes_InstituteId",
                        column: x => x.InstituteId,
                        principalTable: "Institutes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CircularNotices_AspNetUsers_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CircularNoticeRecipients",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    CircularNoticeId = table.Column<int>(nullable: false),
                    RecipientId = table.Column<string>(nullable: false),
                    RecipientType = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CircularNoticeRecipients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CircularNoticeRecipients_CircularNotices_CircularNoticeId",
                        column: x => x.CircularNoticeId,
                        principalTable: "CircularNotices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CircularNoticeRecipients_AspNetUsers_RecipientId",
                        column: x => x.RecipientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CircularNoticeRecipients_CircularNoticeId",
                table: "CircularNoticeRecipients",
                column: "CircularNoticeId");

            migrationBuilder.CreateIndex(
                name: "IX_CircularNoticeRecipients_RecipientId",
                table: "CircularNoticeRecipients",
                column: "RecipientId");

            migrationBuilder.CreateIndex(
                name: "IX_CircularNotices_CreatedById",
                table: "CircularNotices",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_CircularNotices_InstituteId",
                table: "CircularNotices",
                column: "InstituteId");

            migrationBuilder.CreateIndex(
                name: "IX_CircularNotices_UpdatedById",
                table: "CircularNotices",
                column: "UpdatedById");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CircularNoticeRecipients");

            migrationBuilder.DropTable(
                name: "CircularNotices");
        }
    }
}
