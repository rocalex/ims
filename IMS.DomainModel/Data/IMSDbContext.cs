using IMS.DomainModel.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace IMS.DomainModel.Data
{
    public class IMSDbContext : IdentityDbContext<ApplicationUser>
    {
        public IMSDbContext(DbContextOptions<IMSDbContext> options)
            : base(options)
        {
        }

        public DbSet<Institute> Institutes { get; set; }
        public DbSet<UserGroup> UserGroups { get; set; }
        public DbSet<InstituteRole> InstituteRoles { get; set; }
        public DbSet<UserGroupMapping> UserGroupMapping { get; set; }
        public DbSet<AdministrationCountry> AdministrationCountries { get; set; }
        public DbSet<AdministrationState> AdministrationStates { get; set; }
        public DbSet<AdministrationCity> AdministrationCities { get; set; }
        public DbSet<InstituteNationality> InstituteNationalities { get; set; }
        public DbSet<UserGroupFeature> UserGroupFeatures { get; set; }
        public DbSet<AdministrationCurrency> AdministrationCurrencies { get; set; }
        public DbSet<InstituteAcademicYear> InstituteAcademicYears { get; set; }
        public DbSet<InstituteLanguageMaster> InstituteLanguageMasters { get; set; }
        public DbSet<Religion> Religions { get; set; }
        public DbSet<WeekOff> WeekOffs { get; set; }
        public DbSet<Caste> Castes { get; set; }
        public DbSet<Relationship> Relationships { get; set; }
        public DbSet<Occupation> Occupations { get; set; }
        public DbSet<ReligionCategory> ReligionCategories { get; set; }
        public DbSet<Holiday> Holidays { get; set; }
        public DbSet<MotherTongue> MotherTongues { get; set; }
        public DbSet<BloodGroup> BloodGroups { get; set; }
        public DbSet<BookType> BookTypes { get; set; }
        public DbSet<Level> Levels { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Designation> Designations { get; set; }
        public DbSet<SportDetail> SportDetails { get; set; }
        public DbSet<Qualification> Qualifications { get; set; }
        public DbSet<AdministrationEmailConfiguration> AdministrationEmailConfigurations { get; set; }
        public DbSet<InstituteClass> InstituteClasses { get; set; }
        public DbSet<InstituteSubject> InstituteSubjects { get; set; }
        public DbSet<LookUp> LookUps { get; set; }
        public DbSet<LookUpMapping> LookUpMappings { get; set; }
        public DbSet<TemplateType> TemplateTypes { get; set; }
        public DbSet<Template> Templates { get; set; }
        public DbSet<Gender> Genders { get; set; }
        public DbSet<StaffBasicPersonalInformation> StaffBasicPersonalInformation { get; set; }
        public DbSet<StaffExperienceMapping> StaffExperiences { get; set; }
		public DbSet<StudentBasicInformation> StudentBasicInformation { get; set; }
		public DbSet<StudentPriorEducation> StudentPriorEducations { get; set; }
		public DbSet<StudentSport> StudentSports { get; set; }
		public DbSet<StudentAward> StudentAwards { get; set; }
		public DbSet<StudentDiscipline> StudentDisciplines { get; set; }
        public DbSet<InstituteClassSubjectMapping> InstituteClassSubjectMappings { get; set; }
        public DbSet<InstituteBccCcEmailMapping> InstituteBccCcEmailMappings { get; set; }
        public DbSet<StaffActivity> StaffActivities { get; set; }
        public DbSet<StaffDepartmentMapping> StaffDepartmentMappings { get; set; }
        public DbSet<StaffPlanner> StaffPlanners { get; set; }
        public DbSet<UserInstituteMapping> UserInstituteMappings { get; set; }
        public DbSet<MaritalStatus> MaritalStatuses { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<TeachingStaff> TeachingStaffs { get; set; }
        public DbSet<AutoSequenceGenerator> AutoSequenceGenerators { get; set; }
        public DbSet<AutoSequenceGeneratorDataType> AutoSequenceGeneratorDataTypes { get; set; }
        public DbSet<TimeTable> TimeTables { get; set; }
        public DbSet<TimeTableDetails> TimeTableDetails { get; set; }
        public DbSet<TimeTableBreakDetails> TimeTableBreakDetails { get; set; }
        public DbSet<StaffGalleryMapping> StaffGalleryMappings { get; set; }
        public DbSet<StudentGalleryMapping> StudentGalleryMappings { get; set; }
        public DbSet<StudentNotificationDetails> StudentNotificationDetails { get; set; }
        public DbSet<StudentRelievingMapping> StudentRelievingMappings { get; set; }
        public DbSet<StudentArticles> StudentArticles { get; set; }
        public DbSet<StudentPromotionMapping> StudentPromotionMappings { get; set; }
        public DbSet<StudentAttendance> StudentAttendances { get; set; }
        public DbSet<FeeComponent> FeeComponents { get; set; }
        public DbSet<CourseFeeTerm> CourseFeeTerms { get; set; }
        public DbSet<CourseFeeTermDetails> CourseFeeTermDetails { get; set; }
        public DbSet<FeeRefund> FeeRefunds { get; set; }
        public DbSet<StudentFee> StudentFees { get; set; }
        public DbSet<StudentFeeComponent> StudentFeeComponents { get; set; }
        public DbSet<FeeReceipt> FeeReceipts { get; set; }
        public DbSet<FeeReceiptComponent> FeeReceiptComponents { get; set; }
        public DbSet<UserApiKey> UserApiKeys { get; set; }
        public DbSet<ExamDefinition> ExamDefinitions { get; set; }
        public DbSet<EventInfo> EventInfos { get; set; }
        public DbSet<ClassExam> ClassExams { get; set; }
        public DbSet<ClassExamSubjectMapping> ClassExamSubjectMappings { get; set; }
        public DbSet<ExamScoreEntry> ExamScoreEntrys { get; set; }
        public DbSet<TemplateFeature> TemplateFeatures { get; set; }
        public DbSet<EventReportDetail> EventReportDetails { get; set; }
        public DbSet<VehicleMaster> VehicleMasters { get; set; }
        public DbSet<DriverMaster> DriverMasters { get; set; }
        public DbSet<TransportationStage> TransportationStages { get; set; }
        public DbSet<Slab> Slabs { get; set; }
        public DbSet<Route> Routes { get; set; }
        public DbSet<RouteStageMapping> RouteStageMappings { get; set; }
        public DbSet<FinanceChartOfAccounts> FinanceChartOfAccounts { get; set; }
        public DbSet<StudentRouteMapping> StudentRouteMappings { get; set; }
        public DbSet<FinanceReceipt> FinanceReceipts { get; set; }
        public DbSet<FinancePaymentType> FinancePaymentTypes { get; set; }
        public DbSet<FinancePayment> FinancePayments { get; set; }
        public DbSet<VehicleMaintenance> VehicleMaintenances { get; set; }
        public DbSet<VehicleAccident> VehicleAccidents { get; set; }
        public DbSet<VehicleBreakDown> VehicleBreakDowns { get; set; }
        public DbSet<VehicleRepair> VehicleRepairs { get; set; }
        public DbSet<VehicleDriverMapping> VehicleDriverMappings { get; set; }
        public DbSet<MeetingAgenda> MeetingAgendas { get; set; }
        public DbSet<ActivityStatus> ActivityStatus { get; set; }
        public DbSet<ActivityAttendeeMapping> ActivityAttendeeMappings { get; set; }
        public DbSet<Homework> Homeworks { get; set; }
        public DbSet<HomeworkSubjectMapping> HomeworkSubjectMappings { get; set; }
        public DbSet<HomeworkMessageMapping> HomeworkMessageMappings { get; set; }
        public DbSet<HomeworkMailMapping> HomeworkMailMappings { get; set; }
        public DbSet<StudentRecieveHomeworkMessageMapping> StudentRecieveHomeworkMessageMappings { get; set; }
        public DbSet<StudentRecieveHomeworkMailMapping> StudentRecieveHomeworkMailMappings { get; set; }
        public DbSet<DisciplinaryStatus> DisciplinaryStatuses { get; set; }
        public DbSet<Disciplinary> Disciplinaries { get; set; }
        public DbSet<CircularNotice> CircularNotices { get; set; }
        public DbSet<CircularNoticeRecipient> CircularNoticeRecipients { get; set; }
        public DbSet<LeaveType> LeaveTypes { get; set; }
        public DbSet<LeaveAssignedTo> LeaveAssignedTos { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<NotificationUserMapping> NotificationUserMappings { get; set; }
        public DbSet<LeaveStatus> LeaveStatuses { get; set; }
        public DbSet<StudentLeave> StudentLeaves { get; set; }
        public DbSet<StaffLeave> StaffLeaves { get; set; }
        public DbSet<StaffAttendance> StaffAttendances { get; set; }
        public DbSet<StudentDocumentMapping> StudentDocumentMappings { get; set; }
        public DbSet<StaffDocumentMapping> StaffDocumentMappings { get; set; }
        public DbSet<VehicleDocumentMapping> VehicleDocumentMappings { get; set; }
        public DbSet<PlannerAttendeeMapping> PlannerAttendeeMappings { get; set; }
        public DbSet<SelectedAcademicYear> SelectedAcademicYears { get; set; }
        public DbSet<ComponentGroup> ComponentGroups { get; set; }
        public DbSet<PayrollComponent> PayrollComponents { get; set; }
        public DbSet<Hostel> Hostels { get; set; }
        public DbSet<HostelStudentAssign> HostelStudentAssign { get; set; }
        public DbSet<HostelBlock> HostelBlocks { get; set; }
        public DbSet<FloorRoom> FloorRooms { get; set; }
        public DbSet<Publisher> Publishers { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<ExamPaper> ExamPapers { get; set; }
        public DbSet<IssueBook> IssueBooks { get; set; }
        public DbSet<ExpenseType> ExpenseTypes { get; set; }
        public DbSet<ItemType> ItemTypes { get; set; }
        public DbSet<TaxType> TaxTypes { get; set; }
        public DbSet<UOM> UOMs { get; set; }
        public DbSet<BedStatus> BedStatuses { get; set; }
        public DbSet<RoomType> RoomTypes { get; set; }
        public DbSet<Bed> Beds { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<LocationAddressModel> LocationAddressModels { get; set; }
        public DbSet<BedAllocation> BedAllocations { get; set; }
        public DbSet<EmployeeCompMapping> EmployeeCompMappings { get; set; }
        public DbSet<Timesheet> Timesheets { get; set; }
        public DbSet<MessManage> MessManages { get; set; }
        public DbSet<MessManageStudentMapping> MessManageStudentMappings { get; set; }
        public DbSet<DailyExpense> DailyExpenses { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
    }
}
