﻿// <auto-generated />
using System;
using IMS.DomainModel.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace IMS.Web.Migrations
{
    [DbContext(typeof(IMSDbContext))]
    [Migration("20190315052917_added_table_for_sportdetail")]
    partial class added_table_for_sportdetail
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.1-rtm-30846")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("IMS.DomainModel.Models.AdministrationCity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<int>("StateId");

                    b.HasKey("Id");

                    b.HasIndex("StateId");

                    b.ToTable("AdministrationCities");
                });

            modelBuilder.Entity("IMS.DomainModel.Models.AdministrationCountry", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<int>("InstituteId");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("InstituteId");

                    b.ToTable("AdministrationCountries");
                });

            modelBuilder.Entity("IMS.DomainModel.Models.AdministrationCurrency", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<string>("CurrencyName")
                        .IsRequired();

                    b.Property<int>("InstituteId");

                    b.Property<string>("Symbol")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("InstituteId");

                    b.ToTable("AdministrationCurrencies");
                });

            modelBuilder.Entity("IMS.DomainModel.Models.AdministrationState", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CountryId");

                    b.Property<DateTime>("CreatedOn");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("CountryId");

                    b.ToTable("AdministrationStates");
                });

            modelBuilder.Entity("IMS.DomainModel.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("CreatedBy");

                    b.Property<DateTime>("CreatedOn");

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool?>("ForgotPasswordInitiated");

                    b.Property<int?>("InstituteId");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UpdatedBy");

                    b.Property<DateTime>("UpdatedOn");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("InstituteId");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("IMS.DomainModel.Models.BloodGroup", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<int>("InstituteId");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("InstituteId");

                    b.ToTable("BloodGroups");
                });

            modelBuilder.Entity("IMS.DomainModel.Models.Caste", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<int>("InstituteId");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("InstituteId");

                    b.ToTable("Castes");
                });

            modelBuilder.Entity("IMS.DomainModel.Models.Holiday", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AcademicYearId");

                    b.Property<int?>("CompanyWbs");

                    b.Property<string>("CreatedBy")
                        .IsRequired();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<string>("Description");

                    b.Property<DateTime>("HolidayDate");

                    b.Property<DateTime?>("HolidayToDate");

                    b.Property<int>("InstitutionId");

                    b.Property<int>("OccuranceType");

                    b.Property<string>("UpdatedBy");

                    b.Property<DateTime?>("UpdatedOn");

                    b.HasKey("Id");

                    b.HasIndex("AcademicYearId");

                    b.HasIndex("CreatedBy");

                    b.ToTable("Holidays");
                });

            modelBuilder.Entity("IMS.DomainModel.Models.Institute", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Institutes");
                });

            modelBuilder.Entity("IMS.DomainModel.Models.InstituteAcademicYear", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AcademicYearCode")
                        .IsRequired();

                    b.Property<string>("ChallanStartingNumber")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.Property<int?>("CompanyWbs");

                    b.Property<string>("CreatedBy")
                        .IsRequired();

                    b.Property<string>("CreatedByUserId");

                    b.Property<DateTime>("CreatedOn");

                    b.Property<DateTime>("FromDate");

                    b.Property<int>("InstituteId");

                    b.Property<bool>("IsActive");

                    b.Property<DateTime>("ToDate");

                    b.Property<string>("UpdatedBy");

                    b.Property<DateTime?>("UpdatedOn");

                    b.HasKey("Id");

                    b.HasIndex("CreatedByUserId");

                    b.HasIndex("InstituteId");

                    b.ToTable("InstituteAcademicYears");
                });

            modelBuilder.Entity("IMS.DomainModel.Models.InstituteLanguageMaster", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Code")
                        .IsRequired();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<int>("InstituteId");

                    b.Property<bool>("IsActive");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("InstituteId");

                    b.ToTable("InstituteLanguageMasters");
                });

            modelBuilder.Entity("IMS.DomainModel.Models.InstituteNationality", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<int>("InstituteId");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("InstituteId");

                    b.ToTable("InstituteNationalities");
                });

            modelBuilder.Entity("IMS.DomainModel.Models.InstituteRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<int>("InstituteId");

                    b.Property<string>("RoleName")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("InstituteId");

                    b.ToTable("InstituteRoles");
                });

            modelBuilder.Entity("IMS.DomainModel.Models.Level", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<int>("InstituteId");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("InstituteId");

                    b.ToTable("Levels");
                });

            modelBuilder.Entity("IMS.DomainModel.Models.MotherTongue", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CreatedBy");

                    b.Property<DateTime>("CreatedOn");

                    b.Property<int>("InstituteId");

                    b.Property<string>("Language")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("CreatedBy");

                    b.HasIndex("InstituteId");

                    b.ToTable("MotherTongues");
                });

            modelBuilder.Entity("IMS.DomainModel.Models.Occupation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<int>("InstituteId");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("InstituteId");

                    b.ToTable("Occupations");
                });

            modelBuilder.Entity("IMS.DomainModel.Models.Relationship", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<int>("InstituteId");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("InstituteId");

                    b.ToTable("Relationships");
                });

            modelBuilder.Entity("IMS.DomainModel.Models.Religion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<int>("InstituteId");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("InstituteId");

                    b.ToTable("Religions");
                });

            modelBuilder.Entity("IMS.DomainModel.Models.ReligionCategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<int>("InstituteId");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("InstituteId");

                    b.ToTable("ReligionCategories");
                });

            modelBuilder.Entity("IMS.DomainModel.Models.SportDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<int>("InstituteId");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("InstituteId");

                    b.ToTable("SportDetails");
                });

            modelBuilder.Entity("IMS.DomainModel.Models.UserGroup", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasMaxLength(25);

                    b.Property<int?>("CompanyWbs");

                    b.Property<string>("CreatedByUserId");

                    b.Property<DateTime>("CreatedOn");

                    b.Property<string>("Description")
                        .HasMaxLength(200);

                    b.Property<int>("InstituteId");

                    b.Property<DateTime?>("LastUpdatedDate");

                    b.Property<string>("LastUpdatedUserId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.HasIndex("CreatedByUserId");

                    b.HasIndex("InstituteId");

                    b.ToTable("UserGroups");
                });

            modelBuilder.Entity("IMS.DomainModel.Models.UserGroupFeature", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("CanAdd");

                    b.Property<bool>("CanDelete");

                    b.Property<bool>("CanEdit");

                    b.Property<bool>("CanView");

                    b.Property<DateTime>("CreatedOn");

                    b.Property<int>("UserGroupFeatureEnum");

                    b.Property<int>("UserGroupId");

                    b.HasKey("Id");

                    b.HasIndex("UserGroupId");

                    b.ToTable("UserGroupFeatures");
                });

            modelBuilder.Entity("IMS.DomainModel.Models.UserGroupMapping", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<int>("UserGroupId");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserGroupId");

                    b.HasIndex("UserId");

                    b.ToTable("UserGroupMapping");
                });

            modelBuilder.Entity("IMS.DomainModel.Models.WeekOff", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AcademicYearId");

                    b.Property<int?>("CompanyWbs");

                    b.Property<string>("CreatedBy")
                        .IsRequired();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<int>("InstitutionId");

                    b.Property<string>("UpdatedBy");

                    b.Property<DateTime?>("UpdatedOn");

                    b.Property<int>("WeekDay");

                    b.Property<int>("WeekNumber");

                    b.HasKey("Id");

                    b.HasIndex("AcademicYearId");

                    b.HasIndex("CreatedBy");

                    b.ToTable("WeekOffs");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("IMS.DomainModel.Models.AdministrationCity", b =>
                {
                    b.HasOne("IMS.DomainModel.Models.AdministrationState", "State")
                        .WithMany("Cities")
                        .HasForeignKey("StateId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IMS.DomainModel.Models.AdministrationCountry", b =>
                {
                    b.HasOne("IMS.DomainModel.Models.Institute", "Institute")
                        .WithMany("AdministrationCountries")
                        .HasForeignKey("InstituteId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IMS.DomainModel.Models.AdministrationCurrency", b =>
                {
                    b.HasOne("IMS.DomainModel.Models.Institute", "Institute")
                        .WithMany("AdministrationCurrencies")
                        .HasForeignKey("InstituteId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IMS.DomainModel.Models.AdministrationState", b =>
                {
                    b.HasOne("IMS.DomainModel.Models.AdministrationCountry", "Country")
                        .WithMany("States")
                        .HasForeignKey("CountryId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IMS.DomainModel.Models.ApplicationUser", b =>
                {
                    b.HasOne("IMS.DomainModel.Models.Institute", "Institute")
                        .WithMany("Users")
                        .HasForeignKey("InstituteId");
                });

            modelBuilder.Entity("IMS.DomainModel.Models.BloodGroup", b =>
                {
                    b.HasOne("IMS.DomainModel.Models.Institute", "Institute")
                        .WithMany("BloodGroups")
                        .HasForeignKey("InstituteId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IMS.DomainModel.Models.Caste", b =>
                {
                    b.HasOne("IMS.DomainModel.Models.Institute", "Institute")
                        .WithMany("Castes")
                        .HasForeignKey("InstituteId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IMS.DomainModel.Models.Holiday", b =>
                {
                    b.HasOne("IMS.DomainModel.Models.Institute", "AcademicYear")
                        .WithMany()
                        .HasForeignKey("AcademicYearId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("IMS.DomainModel.Models.ApplicationUser", "CreatedByUser")
                        .WithMany()
                        .HasForeignKey("CreatedBy")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IMS.DomainModel.Models.InstituteAcademicYear", b =>
                {
                    b.HasOne("IMS.DomainModel.Models.ApplicationUser", "CreatedByUser")
                        .WithMany()
                        .HasForeignKey("CreatedByUserId");

                    b.HasOne("IMS.DomainModel.Models.Institute", "Institute")
                        .WithMany()
                        .HasForeignKey("InstituteId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IMS.DomainModel.Models.InstituteLanguageMaster", b =>
                {
                    b.HasOne("IMS.DomainModel.Models.Institute", "Institute")
                        .WithMany("InstituteLanguageMasters")
                        .HasForeignKey("InstituteId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IMS.DomainModel.Models.InstituteNationality", b =>
                {
                    b.HasOne("IMS.DomainModel.Models.Institute", "Institute")
                        .WithMany("InstituteNationalities")
                        .HasForeignKey("InstituteId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IMS.DomainModel.Models.InstituteRole", b =>
                {
                    b.HasOne("IMS.DomainModel.Models.Institute", "Institute")
                        .WithMany("InstituteRoles")
                        .HasForeignKey("InstituteId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IMS.DomainModel.Models.Level", b =>
                {
                    b.HasOne("IMS.DomainModel.Models.Institute", "Institute")
                        .WithMany("Levels")
                        .HasForeignKey("InstituteId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IMS.DomainModel.Models.MotherTongue", b =>
                {
                    b.HasOne("IMS.DomainModel.Models.ApplicationUser", "CreatedByUser")
                        .WithMany()
                        .HasForeignKey("CreatedBy");

                    b.HasOne("IMS.DomainModel.Models.Institute", "Institute")
                        .WithMany()
                        .HasForeignKey("InstituteId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IMS.DomainModel.Models.Occupation", b =>
                {
                    b.HasOne("IMS.DomainModel.Models.Institute", "Institute")
                        .WithMany("Occupations")
                        .HasForeignKey("InstituteId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IMS.DomainModel.Models.Relationship", b =>
                {
                    b.HasOne("IMS.DomainModel.Models.Institute", "Institute")
                        .WithMany("Relationships")
                        .HasForeignKey("InstituteId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IMS.DomainModel.Models.Religion", b =>
                {
                    b.HasOne("IMS.DomainModel.Models.Institute", "Institute")
                        .WithMany("Religions")
                        .HasForeignKey("InstituteId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IMS.DomainModel.Models.ReligionCategory", b =>
                {
                    b.HasOne("IMS.DomainModel.Models.Institute", "Institute")
                        .WithMany("ReligionCategories")
                        .HasForeignKey("InstituteId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IMS.DomainModel.Models.SportDetail", b =>
                {
                    b.HasOne("IMS.DomainModel.Models.Institute", "Institute")
                        .WithMany("SportDetails")
                        .HasForeignKey("InstituteId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IMS.DomainModel.Models.UserGroup", b =>
                {
                    b.HasOne("IMS.DomainModel.Models.ApplicationUser", "CreatedByUser")
                        .WithMany()
                        .HasForeignKey("CreatedByUserId");

                    b.HasOne("IMS.DomainModel.Models.Institute", "Institute")
                        .WithMany()
                        .HasForeignKey("InstituteId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IMS.DomainModel.Models.UserGroupFeature", b =>
                {
                    b.HasOne("IMS.DomainModel.Models.UserGroup", "UserGroup")
                        .WithMany("UserGroupFeatures")
                        .HasForeignKey("UserGroupId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IMS.DomainModel.Models.UserGroupMapping", b =>
                {
                    b.HasOne("IMS.DomainModel.Models.UserGroup", "UserGroup")
                        .WithMany()
                        .HasForeignKey("UserGroupId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("IMS.DomainModel.Models.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IMS.DomainModel.Models.WeekOff", b =>
                {
                    b.HasOne("IMS.DomainModel.Models.Institute", "AcademicYear")
                        .WithMany()
                        .HasForeignKey("AcademicYearId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("IMS.DomainModel.Models.ApplicationUser", "CreatedByUser")
                        .WithMany()
                        .HasForeignKey("CreatedBy")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("IMS.DomainModel.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("IMS.DomainModel.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("IMS.DomainModel.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("IMS.DomainModel.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
