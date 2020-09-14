using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IMS.Web.Migrations
{
    public partial class initial_db_setup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BedStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BedStatuses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BookTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Code = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Status = table.Column<bool>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookTypes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BookTypes_Institutes_InstituteId",
                        column: x => x.InstituteId,
                        principalTable: "Institutes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ComponentGroups",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Code = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Status = table.Column<bool>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ComponentGroups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ComponentGroups_Institutes_InstituteId",
                        column: x => x.InstituteId,
                        principalTable: "Institutes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ExamPapers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    MappingId = table.Column<int>(nullable: false),
                    AcademicYearId = table.Column<int>(nullable: false),
                    Pages = table.Column<int>(nullable: false),
                    PublisherName = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExamPapers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExamPapers_InstituteAcademicYears_AcademicYearId",
                        column: x => x.AcademicYearId,
                        principalTable: "InstituteAcademicYears",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExamPapers_InstituteClassSubjectMappings_MappingId",
                        column: x => x.MappingId,
                        principalTable: "InstituteClassSubjectMappings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ExpenseTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Code = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Type = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Active = table.Column<bool>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExpenseTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Hostels",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false),
                    Code = table.Column<string>(nullable: false),
                    HostelType = table.Column<int>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ContactPerson = table.Column<string>(nullable: true),
                    ContactMobile = table.Column<string>(nullable: true),
                    CountryId = table.Column<int>(nullable: false),
                    StateId = table.Column<int>(nullable: false),
                    CityId = table.Column<int>(nullable: false),
                    ZipCode = table.Column<string>(nullable: true),
                    Address1 = table.Column<string>(nullable: false),
                    Address2 = table.Column<string>(nullable: true),
                    HostelCautionDeposit = table.Column<int>(nullable: false),
                    Status = table.Column<bool>(nullable: false),
                    PlaceName = table.Column<string>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hostels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Hostels_AdministrationCities_CityId",
                        column: x => x.CityId,
                        principalTable: "AdministrationCities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ItemTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false),
                    Code = table.Column<string>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Status = table.Column<bool>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LocationAddressModels",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CountryId = table.Column<int>(nullable: false),
                    StateId = table.Column<int>(nullable: false),
                    CityId = table.Column<int>(nullable: true),
                    Address1 = table.Column<string>(nullable: true),
                    Address2 = table.Column<string>(nullable: true),
                    ZipCode = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LocationAddressModels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LocationAddressModels_AdministrationCities_CityId",
                        column: x => x.CityId,
                        principalTable: "AdministrationCities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Publishers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false),
                    Email = table.Column<string>(nullable: false),
                    Contract = table.Column<string>(nullable: false),
                    Address = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Publishers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RoomTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Code = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoomTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TaxTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false),
                    Code = table.Column<string>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Type = table.Column<int>(nullable: false),
                    Value = table.Column<int>(nullable: false),
                    Status = table.Column<bool>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaxTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Timesheets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    StaffId = table.Column<int>(nullable: false),
                    PresenceDate = table.Column<DateTime>(nullable: false),
                    PresenceType = table.Column<int>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Timesheets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Timesheets_StaffBasicPersonalInformation_StaffId",
                        column: x => x.StaffId,
                        principalTable: "StaffBasicPersonalInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UOMs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false),
                    Code = table.Column<string>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Status = table.Column<bool>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UOMs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PayrollComponents",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false),
                    ShortName = table.Column<string>(nullable: false),
                    SequenceNo = table.Column<string>(nullable: false),
                    GroupId = table.Column<int>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Status = table.Column<bool>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    IsPayslip = table.Column<bool>(nullable: false),
                    IsBasic = table.Column<bool>(nullable: false),
                    Others = table.Column<bool>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PayrollComponents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PayrollComponents_ComponentGroups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "ComponentGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HostelBlocks",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false),
                    HostelId = table.Column<int>(nullable: false),
                    FloorAmount = table.Column<int>(nullable: false),
                    Status = table.Column<bool>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HostelBlocks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HostelBlocks_Hostels_HostelId",
                        column: x => x.HostelId,
                        principalTable: "Hostels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HostelStudentAssign",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    HostelId = table.Column<int>(nullable: false),
                    StudentId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HostelStudentAssign", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HostelStudentAssign_Hostels_HostelId",
                        column: x => x.HostelId,
                        principalTable: "Hostels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HostelStudentAssign_StudentBasicInformation_StudentId",
                        column: x => x.StudentId,
                        principalTable: "StudentBasicInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MessManages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    HostelId = table.Column<int>(nullable: false),
                    FromDate = table.Column<DateTime>(nullable: false),
                    ToDate = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MessManages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MessManages_Hostels_HostelId",
                        column: x => x.HostelId,
                        principalTable: "Hostels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Locations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Code = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Alias = table.Column<string>(nullable: true),
                    Status = table.Column<bool>(nullable: false),
                    IsParent = table.Column<bool>(nullable: false),
                    BillingAddressId = table.Column<int>(nullable: true),
                    ShippingAddressId = table.Column<int>(nullable: true),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Locations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Locations_LocationAddressModels_BillingAddressId",
                        column: x => x.BillingAddressId,
                        principalTable: "LocationAddressModels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Locations_LocationAddressModels_ShippingAddressId",
                        column: x => x.ShippingAddressId,
                        principalTable: "LocationAddressModels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Books",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Code = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    ISBN = table.Column<string>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    BookTypeId = table.Column<int>(nullable: false),
                    AuthorName = table.Column<string>(nullable: false),
                    Quantity = table.Column<int>(nullable: false),
                    Remaining = table.Column<int>(nullable: false),
                    PurchaseDate = table.Column<DateTime>(nullable: false),
                    Edition = table.Column<string>(nullable: true),
                    Price = table.Column<int>(nullable: false),
                    Pages = table.Column<int>(nullable: false),
                    BillNo = table.Column<string>(nullable: false),
                    ImageUrl = table.Column<string>(nullable: true),
                    PublisherId = table.Column<int>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Books", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Books_BookTypes_BookTypeId",
                        column: x => x.BookTypeId,
                        principalTable: "BookTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Books_Publishers_PublisherId",
                        column: x => x.PublisherId,
                        principalTable: "Publishers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeCompMappings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ComponentId = table.Column<int>(nullable: false),
                    ComponentTypeId = table.Column<int>(nullable: false),
                    Formula = table.Column<string>(nullable: true),
                    Operator = table.Column<string>(nullable: true),
                    Amount = table.Column<int>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    StaffId = table.Column<int>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeCompMappings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeCompMappings_PayrollComponents_ComponentId",
                        column: x => x.ComponentId,
                        principalTable: "PayrollComponents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EmployeeCompMappings_StaffBasicPersonalInformation_StaffId",
                        column: x => x.StaffId,
                        principalTable: "StaffBasicPersonalInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FloorRooms",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FloorNo = table.Column<int>(nullable: false),
                    BlockId = table.Column<int>(nullable: false),
                    RoomNo = table.Column<string>(nullable: false),
                    RoomType = table.Column<int>(nullable: false),
                    BedAmount = table.Column<int>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Status = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FloorRooms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FloorRooms_HostelBlocks_BlockId",
                        column: x => x.BlockId,
                        principalTable: "HostelBlocks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FloorRooms_RoomTypes_RoomType",
                        column: x => x.RoomType,
                        principalTable: "RoomTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DailyExpenses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    MessManageId = table.Column<int>(nullable: false),
                    ExpenseTypeId = table.Column<int>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    BillNo = table.Column<string>(nullable: true),
                    Particulars = table.Column<string>(nullable: true),
                    Amount = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    ProofUrl = table.Column<string>(nullable: true),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DailyExpenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DailyExpenses_ExpenseTypes_ExpenseTypeId",
                        column: x => x.ExpenseTypeId,
                        principalTable: "ExpenseTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DailyExpenses_MessManages_MessManageId",
                        column: x => x.MessManageId,
                        principalTable: "MessManages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MessManageStudentMappings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    MessManageId = table.Column<int>(nullable: false),
                    StudentId = table.Column<int>(nullable: false),
                    CardNumber = table.Column<string>(nullable: false),
                    Duration = table.Column<string>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MessManageStudentMappings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MessManageStudentMappings_MessManages_MessManageId",
                        column: x => x.MessManageId,
                        principalTable: "MessManages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MessManageStudentMappings_StudentBasicInformation_StudentId",
                        column: x => x.StudentId,
                        principalTable: "StudentBasicInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "IssueBooks",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserType = table.Column<int>(nullable: false),
                    StudentId = table.Column<int>(nullable: true),
                    StaffId = table.Column<int>(nullable: true),
                    BookId = table.Column<int>(nullable: false),
                    IssueDate = table.Column<DateTime>(nullable: false),
                    ReturnDate = table.Column<DateTime>(nullable: false),
                    Fine = table.Column<int>(nullable: false),
                    RefNo = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IssueBooks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_IssueBooks_Books_BookId",
                        column: x => x.BookId,
                        principalTable: "Books",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_IssueBooks_StaffBasicPersonalInformation_StaffId",
                        column: x => x.StaffId,
                        principalTable: "StaffBasicPersonalInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_IssueBooks_StudentBasicInformation_StudentId",
                        column: x => x.StudentId,
                        principalTable: "StudentBasicInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Beds",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    RoomId = table.Column<int>(nullable: false),
                    BedNo = table.Column<string>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Beds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Beds_FloorRooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "FloorRooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BedAllocations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    BedId = table.Column<int>(nullable: false),
                    StudentId = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    InstituteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BedAllocations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BedAllocations_Beds_BedId",
                        column: x => x.BedId,
                        principalTable: "Beds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BedAllocations_StudentBasicInformation_StudentId",
                        column: x => x.StudentId,
                        principalTable: "StudentBasicInformation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BedAllocations_BedId",
                table: "BedAllocations",
                column: "BedId");

            migrationBuilder.CreateIndex(
                name: "IX_BedAllocations_StudentId",
                table: "BedAllocations",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_Beds_RoomId",
                table: "Beds",
                column: "RoomId");

            migrationBuilder.CreateIndex(
                name: "IX_Books_BookTypeId",
                table: "Books",
                column: "BookTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Books_PublisherId",
                table: "Books",
                column: "PublisherId");

            migrationBuilder.CreateIndex(
                name: "IX_BookTypes_InstituteId",
                table: "BookTypes",
                column: "InstituteId");

            migrationBuilder.CreateIndex(
                name: "IX_ComponentGroups_InstituteId",
                table: "ComponentGroups",
                column: "InstituteId");

            migrationBuilder.CreateIndex(
                name: "IX_DailyExpenses_ExpenseTypeId",
                table: "DailyExpenses",
                column: "ExpenseTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_DailyExpenses_MessManageId",
                table: "DailyExpenses",
                column: "MessManageId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeCompMappings_ComponentId",
                table: "EmployeeCompMappings",
                column: "ComponentId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeCompMappings_StaffId",
                table: "EmployeeCompMappings",
                column: "StaffId");

            migrationBuilder.CreateIndex(
                name: "IX_ExamPapers_AcademicYearId",
                table: "ExamPapers",
                column: "AcademicYearId");

            migrationBuilder.CreateIndex(
                name: "IX_ExamPapers_MappingId",
                table: "ExamPapers",
                column: "MappingId");

            migrationBuilder.CreateIndex(
                name: "IX_FloorRooms_BlockId",
                table: "FloorRooms",
                column: "BlockId");

            migrationBuilder.CreateIndex(
                name: "IX_FloorRooms_RoomType",
                table: "FloorRooms",
                column: "RoomType");

            migrationBuilder.CreateIndex(
                name: "IX_HostelBlocks_HostelId",
                table: "HostelBlocks",
                column: "HostelId");

            migrationBuilder.CreateIndex(
                name: "IX_Hostels_CityId",
                table: "Hostels",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_HostelStudentAssign_HostelId",
                table: "HostelStudentAssign",
                column: "HostelId");

            migrationBuilder.CreateIndex(
                name: "IX_HostelStudentAssign_StudentId",
                table: "HostelStudentAssign",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_IssueBooks_BookId",
                table: "IssueBooks",
                column: "BookId");

            migrationBuilder.CreateIndex(
                name: "IX_IssueBooks_StaffId",
                table: "IssueBooks",
                column: "StaffId");

            migrationBuilder.CreateIndex(
                name: "IX_IssueBooks_StudentId",
                table: "IssueBooks",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_LocationAddressModels_CityId",
                table: "LocationAddressModels",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_Locations_BillingAddressId",
                table: "Locations",
                column: "BillingAddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Locations_ShippingAddressId",
                table: "Locations",
                column: "ShippingAddressId");

            migrationBuilder.CreateIndex(
                name: "IX_MessManages_HostelId",
                table: "MessManages",
                column: "HostelId");

            migrationBuilder.CreateIndex(
                name: "IX_MessManageStudentMappings_MessManageId",
                table: "MessManageStudentMappings",
                column: "MessManageId");

            migrationBuilder.CreateIndex(
                name: "IX_MessManageStudentMappings_StudentId",
                table: "MessManageStudentMappings",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_PayrollComponents_GroupId",
                table: "PayrollComponents",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Timesheets_StaffId",
                table: "Timesheets",
                column: "StaffId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BedAllocations");

            migrationBuilder.DropTable(
                name: "BedStatuses");

            migrationBuilder.DropTable(
                name: "DailyExpenses");

            migrationBuilder.DropTable(
                name: "EmployeeCompMappings");

            migrationBuilder.DropTable(
                name: "ExamPapers");

            migrationBuilder.DropTable(
                name: "HostelStudentAssign");

            migrationBuilder.DropTable(
                name: "IssueBooks");

            migrationBuilder.DropTable(
                name: "ItemTypes");

            migrationBuilder.DropTable(
                name: "Locations");

            migrationBuilder.DropTable(
                name: "MessManageStudentMappings");

            migrationBuilder.DropTable(
                name: "TaxTypes");

            migrationBuilder.DropTable(
                name: "Timesheets");

            migrationBuilder.DropTable(
                name: "UOMs");

            migrationBuilder.DropTable(
                name: "Beds");

            migrationBuilder.DropTable(
                name: "ExpenseTypes");

            migrationBuilder.DropTable(
                name: "PayrollComponents");

            migrationBuilder.DropTable(
                name: "Books");

            migrationBuilder.DropTable(
                name: "LocationAddressModels");

            migrationBuilder.DropTable(
                name: "MessManages");

            migrationBuilder.DropTable(
                name: "FloorRooms");

            migrationBuilder.DropTable(
                name: "ComponentGroups");

            migrationBuilder.DropTable(
                name: "BookTypes");

            migrationBuilder.DropTable(
                name: "Publishers");

            migrationBuilder.DropTable(
                name: "HostelBlocks");

            migrationBuilder.DropTable(
                name: "RoomTypes");

            migrationBuilder.DropTable(
                name: "Hostels");
        }
    }
}
