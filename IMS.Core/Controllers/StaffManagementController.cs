using IMS.DomainModel.ApplicationClasses.StaffManagement;
using IMS.DomainModel.ApplicationClasses.StudentAttendanceManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Repository.StaffManagement;
using IMS.Repository.TemplateManagement;
using IMS.Utility.EnumHelper;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class StaffManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IStaffManagementRepository _staffManagementRepository;
        private readonly ITemplateManagementRepository _templateManagementRepository;
        #endregion

        #region Constructor
        public StaffManagementController(IMSDbContext iMSDbContext, UserManager<ApplicationUser> userManager,
            IStaffManagementRepository staffManagementRepository, IInstituteUserMappingHelperService instituteUserMappingHelperService,
            ITemplateManagementRepository templateManagementRepository)
            : base(instituteUserMappingHelperService)
        {
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
            _staffManagementRepository = staffManagementRepository;
            _templateManagementRepository = templateManagementRepository;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddStaffDetailAsync([FromBody]AddStaffManagementAc addStaff)
        {
            var loggedInUser = await _userManager.FindByNameAsync(User.Identity.Name);
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            if (!await _iMSDbContext.Designations.AnyAsync(x => x.Id == addStaff.DesignationId && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StaffManagementResponse() { Message = "Designation not found", HasError = true, ErrorType = StaffManagementResponseType.DesignationId });
            else if (addStaff.NationalityId.HasValue && !await _iMSDbContext.InstituteNationalities.AnyAsync(x => x.Id == addStaff.NationalityId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StaffManagementResponse() { Message = "Nationality not found", HasError = true, ErrorType = StaffManagementResponseType.NationalityId });
            else if (addStaff.MotherTongueId.HasValue && !await _iMSDbContext.MotherTongues.AnyAsync(x => x.Id == addStaff.MotherTongueId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StaffManagementResponse() { Message = "Mother tongue not found", HasError = true, ErrorType = StaffManagementResponseType.MotherTongueId });
            else if (addStaff.ReligionId.HasValue && !await _iMSDbContext.Religions.AnyAsync(x => x.Id == addStaff.ReligionId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StaffManagementResponse() { Message = "Religion not found", HasError = true, ErrorType = StaffManagementResponseType.ReligionId });
            else if (addStaff.CasteId.HasValue && !await _iMSDbContext.Castes.AnyAsync(x => x.Id == addStaff.CasteId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StaffManagementResponse() { Message = "Caste not found", HasError = true, ErrorType = StaffManagementResponseType.CasteId });
            else if (addStaff.BloodGroupId.HasValue && !await _iMSDbContext.BloodGroups.AnyAsync(x => x.Id == addStaff.BloodGroupId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StaffManagementResponse() { Message = "Blood group not found", HasError = true, ErrorType = StaffManagementResponseType.BloodGroupId });
            else if (addStaff.PassportIssuedCountryId.HasValue && !await _iMSDbContext.AdministrationCountries.AnyAsync(x => x.Id == addStaff.PassportIssuedCountryId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StaffManagementResponse() { Message = "Country group not found", HasError = true, ErrorType = StaffManagementResponseType.PassportIssuedCountryId });
            else if (!await _iMSDbContext.AdministrationCities.AnyAsync(x => x.Id == addStaff.PermanentCityId && x.State.Country.InstituteId == loggedInUserInstituteId))
                return Ok(new StaffManagementResponse() { Message = "City not found", HasError = true, ErrorType = StaffManagementResponseType.PermanentCityId });
            else if (!await _iMSDbContext.AdministrationCities.AnyAsync(x => x.Id == addStaff.PresentCityId && x.State.Country.InstituteId == loggedInUserInstituteId))
                return Ok(new StaffManagementResponse() { Message = "City not found", HasError = true, ErrorType = StaffManagementResponseType.PresentCityId });
            else if (CheckIfListOfExperienceHaveInstituteName(addStaff.AddStaffExperienceMappings))
                return Ok(new StaffManagementResponse() { Message = "Experience must name institute name", HasError = true, ErrorType = StaffManagementResponseType.ExperienceList });
            else if (!await _iMSDbContext.MaritalStatuses.AnyAsync(x => x.Id == addStaff.MaritalStatusId && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StaffManagementResponse() { Message = "Marital status not found", HasError = true, ErrorType = StaffManagementResponseType.MaritalStatusId });
            else if (addStaff.TeachingStaffId.HasValue && !await _iMSDbContext.TeachingStaffs.AnyAsync(x => x.Id == addStaff.TeachingStaffId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StaffManagementResponse() { Message = "Teaching staff not found", HasError = true, ErrorType = StaffManagementResponseType.TeachingStaffId });
            else
                return Ok(await _staffManagementRepository.AddStaffDetailAsync(addStaff, loggedInUser));
        }

        [HttpGet("bundle")]
        public async Task<IActionResult> GetInitialDataForAddOrEditStaffAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _staffManagementRepository.GetInitialDataForAddOrEditStaffAsync(loggedInUserInstituteId));
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllStaffByInsituteIdAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var staffs = await _iMSDbContext.StaffBasicPersonalInformation.Include(s => s.Gender).Include(w => w.Religion).Include(i => i.User)
                .Include(s=>s.MaritalStatusMap).Where(x => x.InstituteId == loggedInUserInstituteId).ToListAsync();
            foreach (var staff in staffs)
            {
                staff.Email = staff.User.Email;
            }
            return Ok(staffs);
        }

        [HttpGet("{staffId}")]
        public async Task<IActionResult> GetStaffDetailAsync(int staffId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var staff = await _iMSDbContext.StaffBasicPersonalInformation.Include(c => c.StaffExperiences).Include(x => x.User)
                .Include(x => x.StaffDepartments).Include(q => q.StaffGalleries).Include(s=>s.StaffDocumentMappings)
                .FirstOrDefaultAsync(x => x.Id == staffId && x.InstituteId == loggedInUserInstituteId);
            if (staff != null)
                return Ok(staff);
            else
                return Ok(new { Message = "Staff not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateStaffAsync([FromBody]UpdateStaffManagementAc updateStaff)
        {
            var loggedInUser = await _userManager.FindByNameAsync(User.Identity.Name);
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            if (!await _iMSDbContext.Designations.AnyAsync(x => x.Id == updateStaff.DesignationId && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StaffManagementResponse() { Message = "Designation not found", HasError = true, ErrorType = StaffManagementResponseType.DesignationId });
            else if (updateStaff.NationalityId.HasValue && !await _iMSDbContext.InstituteNationalities.AnyAsync(x => x.Id == updateStaff.NationalityId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StaffManagementResponse() { Message = "Nationality not found", HasError = true, ErrorType = StaffManagementResponseType.NationalityId });
            else if (updateStaff.MotherTongueId.HasValue && !await _iMSDbContext.MotherTongues.AnyAsync(x => x.Id == updateStaff.MotherTongueId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StaffManagementResponse() { Message = "Mother tongue not found", HasError = true, ErrorType = StaffManagementResponseType.MotherTongueId });
            else if (updateStaff.ReligionId.HasValue && !await _iMSDbContext.Religions.AnyAsync(x => x.Id == updateStaff.ReligionId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StaffManagementResponse() { Message = "Religion not found", HasError = true, ErrorType = StaffManagementResponseType.ReligionId });
            else if (updateStaff.CasteId.HasValue && !await _iMSDbContext.Castes.AnyAsync(x => x.Id == updateStaff.CasteId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StaffManagementResponse() { Message = "Caste not found", HasError = true, ErrorType = StaffManagementResponseType.CasteId });
            else if (updateStaff.BloodGroupId.HasValue && !await _iMSDbContext.BloodGroups.AnyAsync(x => x.Id == updateStaff.BloodGroupId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StaffManagementResponse() { Message = "Blood group not found", HasError = true, ErrorType = StaffManagementResponseType.BloodGroupId });
            else if (updateStaff.PassportIssuedCountryId.HasValue && !await _iMSDbContext.AdministrationCountries.AnyAsync(x => x.Id == updateStaff.PassportIssuedCountryId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StaffManagementResponse() { Message = "Country group not found", HasError = true, ErrorType = StaffManagementResponseType.PassportIssuedCountryId });
            else if (!await _iMSDbContext.AdministrationCities.AnyAsync(x => x.Id == updateStaff.PermanentCityId && x.State.Country.InstituteId == loggedInUserInstituteId))
                return Ok(new StaffManagementResponse() { Message = "City not found", HasError = true, ErrorType = StaffManagementResponseType.PermanentCityId });
            else if (!await _iMSDbContext.AdministrationCities.AnyAsync(x => x.Id == updateStaff.PresentCityId && x.State.Country.InstituteId == loggedInUserInstituteId))
                return Ok(new StaffManagementResponse() { Message = "City not found", HasError = true, ErrorType = StaffManagementResponseType.PresentCityId });
            else if (CheckIfListOfExperienceHaveInstituteName(updateStaff.AddStaffExperienceMappings))
                return Ok(new StaffManagementResponse() { Message = "Experience must name institute name", HasError = true, ErrorType = StaffManagementResponseType.ExperienceList });
            else if (!await _iMSDbContext.MaritalStatuses.AnyAsync(x => x.Id == updateStaff.MaritalStatusId && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StaffManagementResponse() { Message = "Marital status not found", HasError = true, ErrorType = StaffManagementResponseType.MaritalStatusId });
            else if (updateStaff.TeachingStaffId.HasValue && !await _iMSDbContext.TeachingStaffs.AnyAsync(x => x.Id == updateStaff.TeachingStaffId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StaffManagementResponse() { Message = "Teaching staff not found", HasError = true, ErrorType = StaffManagementResponseType.TeachingStaffId });
            else
                return Ok(await _staffManagementRepository.UpdateStaffAsync(updateStaff, loggedInUser));
        }

        [HttpPost("image/{staffId}")]
        public async Task<IActionResult> AddOrUpdateStaffImageAsync(int staffId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            await _staffManagementRepository.AddOrUpdateStaffImageAsync(Request.Form.Files, staffId, loggedInUserInstituteId);
            return Ok();
        }

        [HttpDelete("{staffId}")]
        public async Task<IActionResult> ArchiveStaffAsync(int staffId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var staff = await _iMSDbContext.StaffBasicPersonalInformation.FirstOrDefaultAsync(x => x.Id == staffId && x.InstituteId == loggedInUserInstituteId);
            if (staff != null)
            {
                staff.IsArchived = true;
                _iMSDbContext.StaffBasicPersonalInformation.Update(staff);
                await _iMSDbContext.SaveChangesAsync();
                #region Send Mail/Message
                staff = await _iMSDbContext.StaffBasicPersonalInformation.Include(s => s.Gender).Include(s => s.PermanentCity)
                    .Include(s => s.PresentCity).Include(s => s.Institute).Include(s => s.User).FirstAsync(x => x.Id == staff.Id);
                await _templateManagementRepository.TriggerMailOrMessageAsync(staff.InstituteId.Value, TemplateTypeEnum.StaffEdit,
                    TemplateFormatEnum.Email, staff);
                await _templateManagementRepository.TriggerMailOrMessageAsync(staff.InstituteId.Value, TemplateTypeEnum.StaffEdit,
                    TemplateFormatEnum.Sms, staff);
                #endregion
                return Ok(new { HasError = false });
            }
            else
                return Ok(new { HasError = true, Message = "Staff not found" });
        }

        [HttpPost("gallery/{staffId}")]
        public async Task<IActionResult> AddOrUpdateStaffGalleryAsync(int staffId)
        {
            var loggedInUser = await _userManager.FindByNameAsync(User.Identity.Name);
            await _staffManagementRepository.AddOrUpdateStaffGalleryAsync(Request.Form.Files, staffId, loggedInUser);
            return Ok();
        }

        [HttpGet("dashboard")]
        public async Task<IActionResult> GetStaffManagementDashboardDetailsAsync()
        {
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            int instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _staffManagementRepository.GetStaffManagementDashboardDetailsAsync(instituteId, currentUser));
        }

        [HttpGet("initialdata/report")]
        public async Task<IActionResult> GetInitialDataForReportsAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var classes = await _iMSDbContext.InstituteClasses.Where(x => x.InstituteId == instituteId).ToListAsync();
            var religions = await _iMSDbContext.Religions.Where(x => x.InstituteId == instituteId).ToListAsync();
            var classSubjectMapping = await _iMSDbContext.InstituteClassSubjectMappings.Where(x => x.InstituteClass.InstituteId == instituteId).ToListAsync();
            var teachingStaffs = await _iMSDbContext.TeachingStaffs.Where(x => x.InstituteId == instituteId).ToListAsync();
            var academicYears = await _iMSDbContext.InstituteAcademicYears.Where(x => x.InstituteId == instituteId).ToListAsync();
            var subjects = await _iMSDbContext.InstituteSubjects.Where(x => x.InstituteId == instituteId).ToListAsync();
            var currentYear = academicYears.FirstOrDefault(x => x.IsActive);
            var attendances = await _iMSDbContext.StaffAttendances.Where(x => x.Staff.InstituteId == instituteId).ToListAsync();
            if (currentYear != null)
                attendances = attendances.Where(x => x.AcademicYearId == currentYear.Id).ToList();
            attendances.ForEach(x => x.AttendanceTypeDescription = EnumHelperService.GetDescription(x.AttendanceType));
            var notices = await _iMSDbContext.CircularNotices.Where(x => x.InstituteId == instituteId).ToListAsync();
            var homeworks = await _iMSDbContext.Homeworks.Include(s=>s.HomeworkMessageMappings).Where(x => x.Class.InstituteId == instituteId).ToListAsync();
            var allowedDates = await GetAttendanceDaysAsync(instituteId);
            return Ok(new { classes, religions, classSubjectMapping, teachingStaffs, academicYears, subjects, attendances, notices, homeworks, allowedDates });
        }

        [HttpPost("import")]
        public async Task<IActionResult> ImportStaffFromExcelAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var file = Request.Form.Files;
            if (file.Count != 0)
                return Ok(new { Message = await _staffManagementRepository.ImportStaffFromExcelAsync(instituteId, file[0], user.Id) });
            else
                return Ok(new { Message = "No file found" });
        }

        [HttpPost("document/{staffId}")]
        public async Task<IActionResult> AddOrUpdateStaffDocumentAsync(int staffId)
        {
            var isModel = Request.Form.TryGetValue("model-document", out StringValues modelData);
            if (isModel)
            {
                var files = Request.Form.Files;
                List<AddStaffDocumentMappingAc> model = JsonConvert.DeserializeObject<List<AddStaffDocumentMappingAc>>(modelData.ToString());
                var loggedInUser = await _userManager.FindByNameAsync(User.Identity.Name);
                await _staffManagementRepository.AddOrUpdateStaffDocumentsAsync(files, staffId, loggedInUser, model);
            }
            return Ok();
        }

        [HttpPut("documentdata/{staffId}")]
        public async Task<IActionResult> UpdateDocumentDataAsync([FromBody]List<AddStaffDocumentMappingAc> StaffDocuments, int staffId)
        {
            var documents = await _iMSDbContext.StaffDocumentMappings.Where(x => x.StaffId == staffId).ToListAsync();
            _iMSDbContext.StaffDocumentMappings.RemoveRange(documents);
            await _iMSDbContext.SaveChangesAsync();
            List<StaffDocumentMapping> StaffDocumentMappings = new List<StaffDocumentMapping>();
            foreach (var doc in StaffDocuments)
            {
                StaffDocumentMappings.Add(new StaffDocumentMapping()
                {
                    CreatedOn = DateTime.UtcNow,
                    ExpiredDate = doc.ExpiredDate,
                    FileType = EnumHelperService.GetValueFromDescription<FileTypeEnum>(doc.FileType),
                    FileUrl = doc.FileUrl,
                    MetaData = doc.MetaData,
                    Name = doc.Name,
                    StaffId = staffId
                });
            }
            _iMSDbContext.StaffDocumentMappings.AddRange(StaffDocumentMappings);
            await _iMSDbContext.SaveChangesAsync();
            return Ok();
        }
        #endregion

        #region Private Method(s)
        /// <summary>
        /// Method to check if list of experience have any institute name empty or not
        /// </summary>
        /// <param name="addStaffExperiences"></param>
        /// <returns></returns>
        private bool CheckIfListOfExperienceHaveInstituteName(List<AddStaffExperienceMappingAc> addStaffExperiences)
        {
            var names = addStaffExperiences.Select(x => x.InstituteName);
            return names.Any(x => x.Trim() == string.Empty || x.Trim() == null);
        }

        /// <summary>
        /// Method to get list of days allowed
        /// </summary>
        /// <param name="instituteId">institue id</param>
        /// <returns>list of month with allowed days</returns>
        private async Task<List<StudentAttendanceReportAc>> GetAttendanceDaysAsync(int instituteId)
        {
            var monthNames = new List<string>() { "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" };
            List<StudentAttendanceReportAc> studentAttendances = new List<StudentAttendanceReportAc>();
            var academicYear = await _iMSDbContext.InstituteAcademicYears.FirstOrDefaultAsync(x => x.InstituteId == instituteId && x.IsActive);
            List<WeekOff> weekOff = new List<WeekOff>();
            if (academicYear != null)
            {
                weekOff = await _iMSDbContext.WeekOffs.Where(x => x.InstitutionId == instituteId && x.AcademicYearId == academicYear.Id).ToListAsync();
            }
            for (int i = 1; i <= 12; i++)
            {
                var count = 0;
                var dates = GetDates(i);
                foreach (var date in dates)
                {
                    if (!weekOff.Any(x => x.WeekDay.GetDescription() == date.DayOfWeek.GetDescription()))
                        count++;
                }
                studentAttendances.Add(new StudentAttendanceReportAc() { MonthIndex = i, MonthName = monthNames[(i - 1)], NumberOfDays = count });
            }
            return studentAttendances;
        }

        /// <summary>
        /// Method to get month dates by month - SS
        /// </summary>
        /// <param name="month">month</param>
        /// <returns>list of dates</returns>
        private List<DateTime> GetDates(int month)
        {
            var dates = new List<DateTime>();
            for (var date = new DateTime(DateTime.UtcNow.Year, month, 1); date.Month == month; date = date.AddDays(1))
            {
                dates.Add(date.Date);
            }
            return dates;
        }
        #endregion
    }
}
