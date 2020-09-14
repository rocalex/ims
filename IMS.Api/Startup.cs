using IMS.Api.ActionFilter;
using IMS.DomainModel.AppSettings;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.DomainModel.Seeds.SuperAdmin;
using IMS.Repository.ActivityStatusManagement;
using IMS.Repository.AdministrationCurrencyManagement;
using IMS.Repository.AutoSequenceGeneratorManagement;
using IMS.Repository.BloodGroupManagement;
using IMS.Repository.CasteManagement;
using IMS.Repository.CircularNoticeManagement;
using IMS.Repository.ClassSubjectMappingManagement;
using IMS.Repository.DepartmentManagement;
using IMS.Repository.DesignationManagement;
using IMS.Repository.EmailConfigurationManagement;
using IMS.Repository.EventManagement;
using IMS.Repository.FeeManagement;
using IMS.Repository.FeeReceiptManagement;
using IMS.Repository.FeeRefundManagement;
using IMS.Repository.FinanceManagement;
using IMS.Repository.GenderManagement;
using IMS.Repository.InstituteAcademicYearManagement;
using IMS.Repository.InstituteClassManagement;
using IMS.Repository.InstituteCountryStateCityManagement;
using IMS.Repository.InstituteHolidayManagement;
using IMS.Repository.InstituteLanguageMasterManagement;
using IMS.Repository.InstituteManagement;
using IMS.Repository.InstituteNationalityManagement;
using IMS.Repository.InstituteSubjectManagement;
using IMS.Repository.InstituteWeekOffManagement;
using IMS.Repository.LevelManagement;
using IMS.Repository.LookUpManagement;
using IMS.Repository.MaritalStatusManagement;
using IMS.Repository.MeetingAgendaManagement;
using IMS.Repository.MotherTongueManagement;
using IMS.Repository.NotificationManagement;
using IMS.Repository.OccupationManagement;
using IMS.Repository.QualificationManagement;
using IMS.Repository.RelationshipManagement;
using IMS.Repository.ReligionCategoryManagement;
using IMS.Repository.ReligionManagement;
using IMS.Repository.RoleManagement;
using IMS.Repository.SectionManagement;
using IMS.Repository.SportDetailManagement;
using IMS.Repository.StaffActivityManagement;
using IMS.Repository.StaffManagement;
using IMS.Repository.StaffPlannerManagement;
using IMS.Repository.StudentAttendanceManagement;
using IMS.Repository.StudentFeeManagement;
using IMS.Repository.StudentManagement;
using IMS.Repository.StudentPromotionManagement;
using IMS.Repository.StudentRelievingManagement;
using IMS.Repository.TeachingStaffManagement;
using IMS.Repository.TemplateManagement;
using IMS.Repository.TimeTableManagement;
using IMS.Repository.UserGroupManagement;
using IMS.Repository.UserManagement;
using IMS.Repository.Library.BookTypeManagement;
using IMS.Repository.Library.BookManagement;
using IMS.Repository.Library.PublisherManagement;
using IMS.Utility.EmailService;
using IMS.Utility.ImageStorageHelper;
using IMS.Utility.InstituteUserMappingHelper;
using IMS.Utility.SmsService;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IMS.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
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
            services.Configure<AuthorizationKey>(Configuration.GetSection("AuthorizationKey"));
            services.Configure<InitialFinancePaymentTypes>(Configuration.GetSection("InitialFinancePaymentTypes"));

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

            services.AddScoped<MobileApiActionFilter>();
            services.AddScoped<MobileApiAuthorizedUserActionFilter>();
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
            services.AddScoped<IEventManagementRepository, EventManagementRepository>();
            services.AddScoped<IFinanceManagementRepository, FinanceManagementRepository>();
            services.AddScoped<IMeetingAgendaManagementRepository, MeetingAgendaManagementRepository>();
            services.AddScoped<IActivityStatusManagementRepository, ActivityStatusManagementRepository>();
            services.AddScoped<ICircularNoticeManagementRepository, CircularNoticeManagementRepository>();
            services.AddScoped<INotificationManagementRepository, NotificationManagementRepository>();
            services.AddScoped<IBookTypeManagementRepository, BookTypeManagementRepository>();
            services.AddScoped<IBookManagementRepository, BookManagementRepository>();
            services.AddScoped<IPublisherManagementRepository, PublisherManagementRepository>();

            services.AddMvc(config => { config.Filters.Add(typeof(MobileApiActionFilter)); })
                .AddJsonOptions(options => { options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore; });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
