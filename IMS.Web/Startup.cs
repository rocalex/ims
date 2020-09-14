using IMS.DomainModel.AppSettings;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.DomainModel.Seeds.SuperAdmin;
using IMS.Repository.InstituteManagement;
using IMS.Repository.UserGroupManagement;
using IMS.Repository.RoleManagement;
using IMS.Utility.EmailService;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using IMS.Repository.UserManagement;
using IMS.Repository.InstituteCountryStateCityManagement;
using IMS.Repository.InstituteNationalityManagement;
using IMS.Repository.AdministrationCurrencyManagement;
using IMS.Repository.InstituteAcademicYearManagement;
using IMS.Repository.InstituteLanguageMasterManagement;
using IMS.Repository.ReligionManagement;
using IMS.Repository.InstituteWeekOffManagement;
using IMS.Repository.CasteManagement;
using IMS.Repository.RelationshipManagement;
using IMS.Repository.OccupationManagement;
using IMS.Repository.ReligionCategoryManagement;
using IMS.Repository.InstituteHolidayManagement;
using IMS.Repository.MotherTongueManagement;
using IMS.Repository.BloodGroupManagement;
using IMS.Repository.LevelManagement;
using IMS.Repository.DepartmentManagement;
using IMS.Repository.DesignationManagement;
using IMS.Repository.SportDetailManagement;
using IMS.Repository.QualificationManagement;
using IMS.Repository.EmailConfigurationManagement;
using IMS.Repository.InstituteClassManagement;
using IMS.Repository.InstituteSubjectManagement;
using IMS.Repository.LookUpManagement;
using IMS.Repository.TemplateManagement;
using IMS.Repository.StaffManagement;
using IMS.Repository.GenderManagement;
using IMS.Repository.StudentManagement;
using IMS.Repository.ClassSubjectMappingManagement;
using IMS.Repository.StaffActivityManagement;
using IMS.Repository.StaffPlannerManagement;
using IMS.Utility.InstituteUserMappingHelper;
using IMS.Repository.MaritalStatusManagement;
using IMS.Repository.SectionManagement;
using IMS.Repository.TeachingStaffManagement;
using IMS.Repository.Library.BookTypeManagement;
using System.Linq;
using IMS.Repository.AutoSequenceGeneratorManagement;
using IMS.Utility.ImageStorageHelper;
using IMS.Repository.TimeTableManagement;
using IMS.Repository.StudentRelievingManagement;
using IMS.Utility.SmsService;
using IMS.Repository.StudentPromotionManagement;
using IMS.Repository.StudentAttendanceManagement;
using IMS.Repository.FeeManagement;
using IMS.Repository.FeeRefundManagement;
using IMS.Repository.StudentFeeManagement;
using IMS.Repository.FeeReceiptManagement;
using Serilog;
using Microsoft.Extensions.Logging;
using IMS.Utility.ExceptionHandler;
using IMS.Core.ActionFilter;
using IMS.Repository.MarkManagement;
using IMS.Repository.EventManagement;
using IMS.Repository.VehicleMasterManagement;
using IMS.Repository.DriverMasterManagement;
using IMS.Repository.TransportationStageManagement;
using IMS.Repository.SlabManagement;
using IMS.Repository.RouteManagement;
using IMS.Repository.FinanceManagement;
using IMS.Repository.StudentRouteMapping;
using IMS.Repository.VehicleMaintenanceManagement;
using IMS.Repository.VehicleRepairManagement;
using IMS.Repository.VehicleDriverMapping;
using IMS.Repository.VehicleAccidentManagement;
using IMS.Repository.VehicleBreakDownManagement;
using IMS.Repository.MeetingAgendaManagement;
using IMS.Repository.ActivityStatusManagement;
using IMS.Repository.RolePermission;
using IMS.Repository.HomeworkManagement;
using IMS.Repository.DisciplinaryStatusManagement;
using IMS.Repository.DisciplinaryManagement;
using IMS.Repository.CircularNoticeManagement;
using IMS.Repository.LeaveTypeManagement;
using IMS.Repository.NotificationManagement;
using IMS.Repository.LeaveStatusManagement;
using IMS.Repository.LeaveManagement;
using IMS.Repository.StaffAttendanceManagement;
using IMS.Repository.Payroll.ComponentGroupManagement;
using IMS.Repository.Payroll.ComponentManagement;
using IMS.Repository.Hostel.HostelManagement;
using IMS.Repository.Hostel.BlockManagement;
using IMS.Repository.Hostel.FloorRoomManagement;
using IMS.Repository.Library.PublisherManagement;
using IMS.Repository.Library.BookManagement;
using IMS.Repository.Library.ExamPaperManagement;
using IMS.Repository.Library.IssueBookManagement;
using IMS.Repository.Hostel.ExpenseTypeManagement;
using IMS.Repository.Inventory.Lookup.ItemTypeManagement;
using IMS.Repository.Inventory.Lookup.TaxTypeManagement;
using IMS.Repository.Inventory.Lookup.UOMManagement;
using IMS.Repository.Hostel.Lookup.RoomTypeManagement;
using IMS.Repository.Hostel.Lookup.BedStatusManagement;
using IMS.Repository.Hostel.BedManagement;
using IMS.Repository.Inventory.Inventory;
using IMS.Repository.Hostel.BedAllocationManagement;
using IMS.Repository.Hostel.MessManagement;
using IMS.Repository.Payroll.EmployeeCompMappingManagement;
using IMS.Repository.Payroll.TimesheetManagement;
using IMS.Repository.Hostel.DailyExpenseManagement;

namespace IMS.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(configuration).CreateLogger();
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<SystemRoles>(Configuration.GetSection("SystemRoles"));
            services.Configure<SuperAdmin>(Configuration.GetSection("SuperAdmin"));
            services.Configure<EmailConfiguration>(Configuration.GetSection("EmailConfiguration"));
            services.Configure<StringConstants>(Configuration.GetSection("StringConstants"));
            services.Configure<DomainModel.AppSettings.InstituteLanguageMaster>(Configuration.GetSection("InstituteLanguageMaster"));
            services.Configure<LookUpManagementData>(Configuration.GetSection("LookUpManagementData"));
            services.Configure<TemplateManagementTypes>(Configuration.GetSection("TemplateManagementTypes"));
            services.Configure<SmsConfiguration>(Configuration.GetSection("SmsConfiguration"));
            services.Configure<InitialFinancePaymentTypes>(Configuration.GetSection("InitialFinancePaymentTypes"));
            services.Configure<ActivityStatusAppSettings>(Configuration.GetSection("ActivityStatusAppSettings"));
            
            services.Configure<RolesPermission>(Configuration.GetSection("RolesPermission"));

            services.AddDbContext<IMSDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"), b => b.MigrationsAssembly("IMS.Web")));

            services.AddIdentity<ApplicationUser, IdentityRole>(opt =>
            {
                opt.Password.RequireDigit = false;
                opt.Password.RequireLowercase = false;
                opt.Password.RequireNonAlphanumeric = false;
                opt.Password.RequireUppercase = false;
            })
                .AddEntityFrameworkStores<IMSDbContext>().AddDefaultTokenProviders();

            services.AddScoped<ISuperAdminSeed, SuperAdminSeed>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IInstituteManagementRepository, InstituteManagementRepository>();
            services.AddScoped<IUserGroupManagementRepository, UserGroupManagementRepository>();
            services.AddScoped<IRoleManagementRepository, RoleManagementRepository>();
            services.AddScoped<IUserManagementRepository, UserManagementRepository>();
            services.AddScoped<IInstituteCountryStateCityManagementRepository, InstituteCountryStateCityManagementRepository>();
            services.AddScoped<IInstituteNationalityManagementRepository, InstituteNationalityManagementRepository>();
            services.AddScoped<IAdministrationCurrencyManagementRepository, AdministrationCurrencyManagementRepository>();
            services.AddScoped<IInstituteAcademicYearManagementRepository, InstituteAcademicYearManagementRepository>();
            services.AddScoped<IInstituteLanguageMasterManagementRepository, InstituteLanguageMasterManagementRepository>();
            services.AddScoped<IReligionManagementRepository, ReligionManagementRepository>();
            services.AddScoped<IInstituteWeekOffManagementRepository, InstituteWeekOffManagementRepository>();
            services.AddScoped<ICasteManagementRepository, CasteManagementRepository>();
            services.AddScoped<IRelationshipManagementRepository, RelationshipManagementRepository>();
            services.AddScoped<IOccupationManagementRepository, OccupationManagementRepository>();
            services.AddScoped<IReligionCategoryManagementRepository, ReligionCategoryManagementRepository>();
            services.AddScoped<IInstituteHolidayManagementRepository, InstituteHolidayManagementRepository>();
            services.AddScoped<IMotherTongueManagementRepository, MotherTongueManagementRepository>();
            services.AddScoped<IBloodGroupManagementRepository, BloodGroupManagementRepository>();
            services.AddScoped<ILevelManagementRepository, LevelManagementRepository>();
            services.AddScoped<IDepartmentManagementRepository, DepartmentManagementRepository>();
            services.AddScoped<IDesignationManagementRepository, DesignationManagementRepository>();
            services.AddScoped<ISportDetailManagementRepository, SportDetailManagementRepository>();
            services.AddScoped<IQualificationManagementRepository, QualificationManagementRepository>();
            services.AddScoped<IEmailConfigurationManagementRepository, EmailConfigurationManagementRepository>();
            services.AddScoped<IInstituteClassManagementRepository, InstituteClassManagementRepository>();
            services.AddScoped<IInstituteSubjectManagementRepository, InstituteSubjectManagementRepository>();
            services.AddScoped<ILookUpManagementRepository, LookUpManagementRepository>();
            services.AddScoped<ITemplateManagementRepository, TemplateManagementRepository>();
            services.AddScoped<IStaffManagementRepository, StaffManagementRepository>();
            services.AddScoped<IGenderManagementRepository, GenderManagementRepository>();
			services.AddScoped<IStudentManagementRepository, StudentManagementRepository>();
            services.AddScoped<IClassSubjectMappingManagementRepository, ClassSubjectMappingManagementRepository>();
            services.AddScoped<IStaffActivityManagementRepository, StaffActivityManagementRepository>();
            services.AddScoped<IStaffPlannerManagementRepository, StaffPlannerManagementRepository>();
            services.AddScoped<IInstituteUserMappingHelperService, InstituteUserMappingHelperService>();
            services.AddScoped<IMaritalStatusManagementRepository, MaritalStatusManagementRepository>();
            services.AddScoped<ISectionManagementRepository, SectionManagementRepository>();
            services.AddScoped<ITeachingStaffManagementRepository, TeachingStaffManagementRepository>();
            services.AddScoped<IAutoSequenceGeneratorManagementRepository, AutoSequenceGeneratorManagementRepository>();
            services.AddScoped<IImageStorageHelperService, ImageStorageHelperService>();
            services.AddScoped<ITimeTableManagementRepository, TimeTableManagementRepository>();
            services.AddScoped<IStudentRelievingManagementRepository, StudentRelievingManagementRepository>();
            services.AddScoped<ISmsService, SmsService>();
            services.AddScoped<IStudentPromotionManagementRepository, StudentPromotionManagementRepository>();
            services.AddScoped<IStudentAttendanceManagementRepository, StudentAttendanceManagementRepository>();
            services.AddScoped<IFeeManagementRepository, FeeManagementRepository>();
            services.AddScoped<IFeeRefundManagementRepository, FeeRefundManagementRepository>();
            services.AddScoped<IStudentFeeManagementRepository, StudentFeeManagementRepository>();
            services.AddScoped<IFeeReceiptManagementRepository, FeeReceiptManagementRepository>();
            services.AddScoped<IMarkManagementRepository, MarkManagementRepository>();
            services.AddScoped<IEventManagementRepository, EventManagementRepository>();
            services.AddScoped<IVehicleMasterManagementRepository, VehicleMasterManagementRepository>();
            services.AddScoped<IDriverMasterManagementRepository, DriverMasterManagementRepository>();
            services.AddScoped<ITransportationStageManagementRepository, TransportationStageManagementRepository>();
            services.AddScoped<ISlabManagementRepository, SlabManagementRepository>();
            services.AddScoped<IRouteManagementRepository, RouteManagementRepository>();
            services.AddScoped<IFinanceManagementRepository, FinanceManagementRepository>();
            services.AddScoped<IStudentRouteMappingRepository, StudentRouteMappingRepository>();
            services.AddScoped<IVehicleMaintenanceManagementRepository, VehicleMaintenanceManagementRepository>();
            services.AddScoped<IVehicleRepairManagementRepository, VehicleRepairManagementRepository>();
            services.AddScoped<IVehicleDriverMappingRepository, VehicleDriverMappingRepository>();
            services.AddScoped<IVehicleAccidentManagementRepository, VehicleAccidentManagementRepository>();
            services.AddScoped<IVehicleBreakDownManagementRepository, VehicleBreakDownManagementRepository>();
            services.AddScoped<IMeetingAgendaManagementRepository, MeetingAgendaManagementRepository>();
            services.AddScoped<IActivityStatusManagementRepository, ActivityStatusManagementRepository>();
            services.AddScoped<IRolePermissionSeed, RolePermissionSeed>();
            services.AddScoped<UserGroupPermissionAttribute>();
            services.AddScoped<IHomeworkManagementRepository, HomeworkManagementRepository>();
            services.AddScoped<IDisciplinaryStatusManagementRepository, DisciplinaryStatusManagementRepository>();
            services.AddScoped<IDisciplinaryManagementRepository, DisciplinaryManagementRepository>();
            services.AddScoped<ICircularNoticeManagementRepository, CircularNoticeManagementRepository>();
            services.AddScoped<ILeaveTypeManagementRepository, LeaveTypeManagementRepository>();
            services.AddScoped<INotificationManagementRepository, NotificationManagementRepository>();
            services.AddScoped<ILeaveStatusManagementRepository, LeaveStatusManagementRepository>();
            services.AddScoped<ILeaveManagementRepository, LeaveManagementRepository>();
            services.AddScoped<IStaffAttendanceManagementRepository, StaffAttendanceManagementRepository>();
            services.AddScoped<IBookTypeManagementRepository, BookTypeManagementRepository>();
            services.AddScoped<IComponentGroupManagementRepository, ComponentGroupManagementRepository>();
            services.AddScoped<IComponentManagementRepository, ComponentManagementRepository>();
            services.AddScoped<IHostelManagementRepository, HostelManagementRepository>();
            services.AddScoped<IBlockManagementRepository, BlockManagementRepository>();
            services.AddScoped<IFloorRoomManagementRepository, FloorRoomManagementRepository>();
            services.AddScoped<IBookTypeManagementRepository, BookTypeManagementRepository>();
            services.AddScoped<IBookManagementRepository, BookManagementRepository>();
            services.AddScoped<IPublisherManagementRepository, PublisherManagementRepository>();
            services.AddScoped<IExamManagementRepository, ExamManagementRepository>();
            services.AddScoped<IIssueBookManagementRepository, IssueBookManagementRepository>();
            services.AddScoped<IExpenseTypeManagementRepository, ExpenseTypeManagementRepository>();
            services.AddScoped<IItemTypeManagementRepository, ItemTypeManagementRepository>();
            services.AddScoped<ITaxTypeManagementRepository, TaxTypeManagementRepository>();
            services.AddScoped<IUOMManagementRepository, UOMManagementRepository>();
            services.AddScoped<IBedStatusManagement, BedStatusManagement>();
            services.AddScoped<IRoomTypeManagement, RoomTypeManagement>();
            services.AddScoped<IBedManagementRepository, BedManagementRepository>();
            services.AddScoped<IAddressManagementRepository, AddressManagementRepository>();
            services.AddScoped<ILocationManagementRepository, LocationManagementRepository>();
            services.AddScoped<IBedAllocationManagementRepository, BedAllocationManagementRepository>();
            services.AddScoped<IEmployeeCompMappingRepository, EmployeeCompMappingRepository>();
            services.AddScoped<ITimesheetManagementRepository, TimesheetManagementRepository>();
            services.AddScoped<IMessManagementRepository, MessManagementRepository>();
            services.AddScoped<IDailyExpenseManagementRepository, DailyExpenseManagementRepository>();

            services.AddMvc(config => { config.Filters.Add(typeof(GlobalExceptionHandler));
                config.Filters.Add(typeof(AutoLogAttribute)); /*config.Filters.Add(typeof(UserGroupPermissionAttribute));*/ })
                .AddJsonOptions(options => { options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore; });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            loggerFactory.AddSerilog();

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseMiddleware<RequestResponseLoggingMiddleware>();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
                routes.MapRoute(
                    name: "spa-fallback",
                    template: "{*url}",
                    defaults: new { controller = "Home", action = "Index" });
            });

			using (var scope = app.ApplicationServices.CreateScope())
			{
				var db = scope.ServiceProvider.GetService<IMSDbContext>();
				db.Database.Migrate();

				var superAdminSeed = scope.ServiceProvider.GetService<ISuperAdminSeed>();
				superAdminSeed.AddOrUpdatesRolesAsync().GetAwaiter().GetResult();
				superAdminSeed.AddOrUpdateSuperAdminAsync().GetAwaiter().GetResult();

                var rolePermissionSeed = scope.ServiceProvider.GetService<IRolePermissionSeed>();
                rolePermissionSeed.AddUserGroupDefaultAsync().GetAwaiter().GetResult();

                var userGroupManagementRepository = scope.ServiceProvider.GetService<IUserGroupManagementRepository>();
                userGroupManagementRepository.MigrateUserGroupFeatureAsync().GetAwaiter().GetResult();

                var disciplinaryStatusManagementRepository = scope.ServiceProvider.GetService<IDisciplinaryStatusManagementRepository>();
                disciplinaryStatusManagementRepository.MigratedPreviousDataAsync().GetAwaiter().GetResult();

                var leaveStatusManagementRepository = scope.ServiceProvider.GetService<ILeaveStatusManagementRepository>();
                leaveStatusManagementRepository.MigratedPreviousDataAsync().GetAwaiter().GetResult();

                var driverMasterManagementRepository = scope.ServiceProvider.GetService<IDriverMasterManagementRepository>();
                driverMasterManagementRepository.MigratedPreviousDataAsync().GetAwaiter().GetResult();

                var staffAttendance = scope.ServiceProvider.GetService<IStaffAttendanceManagementRepository>();
                staffAttendance.MigratedPreviousDataAsync().GetAwaiter().GetResult();

                var studentAttendance = scope.ServiceProvider.GetService<IStudentAttendanceManagementRepository>();
                studentAttendance.MigratedPreviousDataAsync().GetAwaiter().GetResult();
            }
        }
    }
}
