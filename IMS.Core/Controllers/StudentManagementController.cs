using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS.DomainModel.ApplicationClasses.StudentAttendanceManagement;
using IMS.DomainModel.ApplicationClasses.StudentManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Repository.StudentManagement;
using IMS.Utility.EnumHelper;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class StudentManagementController : BaseController
    {
        #region Private Variable(s)

        private const string BaseUrl = "api/[controller]";
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IStudentManagementRepository _studentManagementRepository;

        #endregion

        #region Constructor

        public StudentManagementController(IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager,
            IStudentManagementRepository studentManagementRepository,
            IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
            _studentManagementRepository = studentManagementRepository;
        }

        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddStudentDetailAsync([FromBody]AddStudentManagementAc addStudent)
        {
            var loggedInUser = await _userManager.FindByNameAsync(User.Identity.Name);
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            if (!await _iMSDbContext.InstituteClasses.AnyAsync(x => x.Id == addStudent.AdmissionClassId && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Class not found", HasError = true, ErrorType = StudentManagementResponseType.AdmissionClassId });
            else if (!await _iMSDbContext.InstituteClasses.AnyAsync(x => x.Id == addStudent.AdmissionClassId && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Class not found", HasError = true, ErrorType = StudentManagementResponseType.CurrentClassId });
            else if (!await _iMSDbContext.InstituteAcademicYears.AnyAsync(x => x.Id == addStudent.CurrentAcademicYearId && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Academic year not found", HasError = true, ErrorType = StudentManagementResponseType.CurrentAcademicYearId });
            else if (!await _iMSDbContext.InstituteLanguageMasters.AnyAsync(x => x.Id == addStudent.FirstLanguageId && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Language not found", HasError = true, ErrorType = StudentManagementResponseType.FirstLanguageId });
            else if (!await _iMSDbContext.InstituteLanguageMasters.AnyAsync(x => x.Id == addStudent.SecondLanguageId && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Language not found", HasError = true, ErrorType = StudentManagementResponseType.SecondLanguageId });
            else if (!await _iMSDbContext.Genders.AnyAsync(x => x.Id == addStudent.GenderId && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Gender not found", HasError = true, ErrorType = StudentManagementResponseType.GenderId });
            else if (addStudent.NationalityId.HasValue && !await _iMSDbContext.InstituteNationalities.AnyAsync(x => x.Id == addStudent.NationalityId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Nationality not found", HasError = true, ErrorType = StudentManagementResponseType.NationalityId });
            else if (addStudent.MotherTongueId.HasValue && !await _iMSDbContext.MotherTongues.AnyAsync(x => x.Id == addStudent.MotherTongueId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Mother tongue not found", HasError = true, ErrorType = StudentManagementResponseType.MotherTongueId });
            else if (addStudent.ReligionId.HasValue && !await _iMSDbContext.Religions.AnyAsync(x => x.Id == addStudent.ReligionId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Religion not found", HasError = true, ErrorType = StudentManagementResponseType.ReligionId });
            else if (addStudent.CasteId.HasValue && !await _iMSDbContext.Castes.AnyAsync(x => x.Id == addStudent.CasteId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Caste not found", HasError = true, ErrorType = StudentManagementResponseType.CasteId });
            else if (addStudent.BloodGroupId.HasValue && !await _iMSDbContext.BloodGroups.AnyAsync(x => x.Id == addStudent.BloodGroupId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Blood group not found", HasError = true, ErrorType = StudentManagementResponseType.BloodGroupId });
            else if (addStudent.PassportIssuedCountryId.HasValue && !await _iMSDbContext.AdministrationCountries.AnyAsync(x => x.Id == addStudent.PassportIssuedCountryId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Country group not found", HasError = true, ErrorType = StudentManagementResponseType.PassportIssuedCountryId });
            else if (addStudent.RelievingClassId.HasValue && !await _iMSDbContext.InstituteClasses.AnyAsync(x => x.Id == addStudent.RelievingClassId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Class not found", HasError = true, ErrorType = StudentManagementResponseType.RelievingClassId });
            else if (addStudent.FamilyRelationOccupationId.HasValue && !await _iMSDbContext.Occupations.AnyAsync(x => x.Id == addStudent.FamilyRelationOccupationId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Occupation not found", HasError = true, ErrorType = StudentManagementResponseType.FamilyRelationOccupationId });
            else if (!await _iMSDbContext.AdministrationCities.AnyAsync(x => x.Id == addStudent.PermanentCityId && x.State.Country.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "City not found", HasError = true, ErrorType = StudentManagementResponseType.PermanentCityId });
            else if (!await _iMSDbContext.AdministrationCities.AnyAsync(x => x.Id == addStudent.PresentCityId && x.State.Country.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "City not found", HasError = true, ErrorType = StudentManagementResponseType.PresentCityId });
            else if (CheckIfListOfStudentPriorEducations(addStudent.StudentPriorEducations))
                return Ok(new StudentManagementResponse() { Message = "Prior educations must have institute name", HasError = true, ErrorType = StudentManagementResponseType.StudentPriorEducations });
            else if (CheckIfListOfStudentDisciplines(addStudent.StudentDisciplines))
                return Ok(new StudentManagementResponse() { Message = "Student disciplines must have description and subject", HasError = true, ErrorType = StudentManagementResponseType.StudentDisciplines });
            else if (!await CheckIfListOfStudentStudentSportIdAsync(addStudent.StudentSports, loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Sport not found", HasError = true, ErrorType = StudentManagementResponseType.StudentSportId });
            else if (!await CheckIfListOfStudentStudentLevelIdAsync(addStudent.StudentSports, loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Level not found", HasError = true, ErrorType = StudentManagementResponseType.StudentLevelId });
            else if (CheckIfListOfStudentAwardAwardName(addStudent.StudentAwards))
                return Ok(new StudentManagementResponse() { Message = "Student awards must have name", HasError = true, ErrorType = StudentManagementResponseType.StudentAwardName });
            else if (CheckIfListOfStudentAwardInstituteName(addStudent.StudentAwards))
                return Ok(new StudentManagementResponse() { Message = "Student awards must have institute name", HasError = true, ErrorType = StudentManagementResponseType.StudentAwardInstituteName });
            else if (!await _iMSDbContext.MaritalStatuses.AnyAsync(x => x.Id == addStudent.MaritalStatusId && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Marital status not found", HasError = true, ErrorType = StudentManagementResponseType.MaritalStatusId });
            else if (!await _iMSDbContext.Sections.AnyAsync(x => x.Id == addStudent.SectionId && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Section not found", HasError = true, ErrorType = StudentManagementResponseType.SectionId });
            else
                return Ok(await _studentManagementRepository.AddStudentAsync(addStudent, loggedInUser));
        }

        [HttpGet("bundle")]
        public async Task<IActionResult> GetInitialDataForAddOrEditStudentBundleAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _studentManagementRepository.GetInitialDataForAddOrEditStudentBundleAsync(loggedInUserInstituteId));
        }

        [HttpGet("classlist")]
        public async Task<IActionResult> GetClassListAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var results = new List<dynamic>();
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var academicYear = await _iMSDbContext.SelectedAcademicYears.FirstOrDefaultAsync(x => x.UserId == user.Id
            && x.AcademicYear.InstituteId == instituteId);

            var classes = await _iMSDbContext.InstituteClasses.Where(x => x.InstituteId == instituteId).ToListAsync();
            foreach (InstituteClass instituteClass in classes)
            {
                var students = await _iMSDbContext.StudentBasicInformation.Where(x => x.CurrentClassId == instituteClass.Id && x.InstituteId == instituteId && x.CurrentAcademicYearId == academicYear.Id).ToListAsync();
                results.Add(new
                {
                    Id = instituteClass.Id,
                    ClassName = instituteClass.Name,
                    NoOfStudents = students.Count
                });
            }

            return Ok(results);
        }

        [HttpGet("class/{classId}")]
        public async Task<IActionResult> GetAllActiveStudentByInsituteIdAsync(int classId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            List<StudentBasicInformation> studentBasicInformation = new List<StudentBasicInformation>();
            var students = await _iMSDbContext.StudentBasicInformation.Include(s=>s.CurrentClass).Include(s=>s.SectionMap)
                .Where(x => x.InstituteId == loggedInUserInstituteId && x.CurrentClassId == classId).ToListAsync();
            var relievedStudents = await _iMSDbContext.StudentRelievingMappings.Where(x => x.Student.InstituteId == loggedInUserInstituteId).Select(x => x.StudentId).ToListAsync();
            students.ForEach(x =>
            {
                studentBasicInformation.Add(x);
            });
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var academicYear = await _iMSDbContext.SelectedAcademicYears.FirstOrDefaultAsync(x => x.UserId == user.Id
            && x.AcademicYear.InstituteId == loggedInUserInstituteId);
            if (academicYear != null)
                studentBasicInformation = studentBasicInformation.Where(x => x.CurrentAcademicYearId == academicYear.AcademicYearId).ToList();
            return Ok(studentBasicInformation);
        }

        [HttpGet("{studentId}")]
        public async Task<IActionResult> GetStudentDetailAsync(int studentId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var Student = await _iMSDbContext.StudentBasicInformation.Include(c => c.StudentSports).Include(x => x.User)
                .Include(c => c.StudentAwards).Include(w => w.StudentDisciplines).Include(q => q.StudentPriorEducations).Include(q => q.StudentGalleries)
                .Include(s => s.StudentDocumentMappings)
                .FirstOrDefaultAsync(x => x.Id == studentId && x.InstituteId == loggedInUserInstituteId);
            if (Student != null)
                return Ok(Student);
            else
                return Ok(new { Message = "Student not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateStudentAsync([FromBody]UpdateStudentManagementAc updateStudent)
        {
            var loggedInUser = await _userManager.FindByNameAsync(User.Identity.Name);
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            if (!await _iMSDbContext.StudentBasicInformation.AnyAsync(x => x.Id == updateStudent.Id && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Student not found", HasError = true });
            if (!await _iMSDbContext.InstituteClasses.AnyAsync(x => x.Id == updateStudent.AdmissionClassId && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Class not found", HasError = true, ErrorType = StudentManagementResponseType.AdmissionClassId });
            else if (!await _iMSDbContext.InstituteClasses.AnyAsync(x => x.Id == updateStudent.AdmissionClassId && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Class not found", HasError = true, ErrorType = StudentManagementResponseType.CurrentClassId });
            else if (!await _iMSDbContext.InstituteAcademicYears.AnyAsync(x => x.Id == updateStudent.CurrentAcademicYearId && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Academic year not found", HasError = true, ErrorType = StudentManagementResponseType.CurrentAcademicYearId });
            else if (!await _iMSDbContext.InstituteLanguageMasters.AnyAsync(x => x.Id == updateStudent.FirstLanguageId && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Language not found", HasError = true, ErrorType = StudentManagementResponseType.FirstLanguageId });
            else if (!await _iMSDbContext.InstituteLanguageMasters.AnyAsync(x => x.Id == updateStudent.SecondLanguageId && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Language not found", HasError = true, ErrorType = StudentManagementResponseType.SecondLanguageId });
            else if (!await _iMSDbContext.Genders.AnyAsync(x => x.Id == updateStudent.GenderId && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Gender not found", HasError = true, ErrorType = StudentManagementResponseType.GenderId });
            else if (updateStudent.NationalityId.HasValue && !await _iMSDbContext.InstituteNationalities.AnyAsync(x => x.Id == updateStudent.NationalityId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Nationality not found", HasError = true, ErrorType = StudentManagementResponseType.NationalityId });
            else if (updateStudent.MotherTongueId.HasValue && !await _iMSDbContext.MotherTongues.AnyAsync(x => x.Id == updateStudent.MotherTongueId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Mother tongue not found", HasError = true, ErrorType = StudentManagementResponseType.MotherTongueId });
            else if (updateStudent.ReligionId.HasValue && !await _iMSDbContext.Religions.AnyAsync(x => x.Id == updateStudent.ReligionId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Religion not found", HasError = true, ErrorType = StudentManagementResponseType.ReligionId });
            else if (updateStudent.CasteId.HasValue && !await _iMSDbContext.Castes.AnyAsync(x => x.Id == updateStudent.CasteId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Caste not found", HasError = true, ErrorType = StudentManagementResponseType.CasteId });
            else if (updateStudent.BloodGroupId.HasValue && !await _iMSDbContext.BloodGroups.AnyAsync(x => x.Id == updateStudent.BloodGroupId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Blood group not found", HasError = true, ErrorType = StudentManagementResponseType.BloodGroupId });
            else if (updateStudent.PassportIssuedCountryId.HasValue && !await _iMSDbContext.AdministrationCountries.AnyAsync(x => x.Id == updateStudent.PassportIssuedCountryId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Country group not found", HasError = true, ErrorType = StudentManagementResponseType.PassportIssuedCountryId });
            else if (updateStudent.RelievingClassId.HasValue && !await _iMSDbContext.InstituteClasses.AnyAsync(x => x.Id == updateStudent.RelievingClassId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Class not found", HasError = true, ErrorType = StudentManagementResponseType.RelievingClassId });
            else if (updateStudent.FamilyRelationOccupationId.HasValue && !await _iMSDbContext.Occupations.AnyAsync(x => x.Id == updateStudent.FamilyRelationOccupationId.Value && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Occupation not found", HasError = true, ErrorType = StudentManagementResponseType.FamilyRelationOccupationId });
            else if (!await _iMSDbContext.AdministrationCities.AnyAsync(x => x.Id == updateStudent.PermanentCityId && x.State.Country.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "City not found", HasError = true, ErrorType = StudentManagementResponseType.PermanentCityId });
            else if (!await _iMSDbContext.AdministrationCities.AnyAsync(x => x.Id == updateStudent.PresentCityId && x.State.Country.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "City not found", HasError = true, ErrorType = StudentManagementResponseType.PresentCityId });
            else if (CheckIfListOfStudentPriorEducations(updateStudent.StudentPriorEducations))
                return Ok(new StudentManagementResponse() { Message = "Prior educations must have institute name", HasError = true, ErrorType = StudentManagementResponseType.StudentPriorEducations });
            else if (CheckIfListOfStudentDisciplines(updateStudent.StudentDisciplines))
                return Ok(new StudentManagementResponse() { Message = "Student disciplines must have description and subject", HasError = true, ErrorType = StudentManagementResponseType.StudentDisciplines });
            else if (!await CheckIfListOfStudentStudentSportIdAsync(updateStudent.StudentSports, loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Sport not found", HasError = true, ErrorType = StudentManagementResponseType.StudentSportId });
            else if (!await CheckIfListOfStudentStudentLevelIdAsync(updateStudent.StudentSports, loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Level not found", HasError = true, ErrorType = StudentManagementResponseType.StudentLevelId });
            else if (CheckIfListOfStudentAwardAwardName(updateStudent.StudentAwards))
                return Ok(new StudentManagementResponse() { Message = "Student awards must have name", HasError = true, ErrorType = StudentManagementResponseType.StudentAwardName });
            else if (CheckIfListOfStudentAwardInstituteName(updateStudent.StudentAwards))
                return Ok(new StudentManagementResponse() { Message = "Student awards must have institute name", HasError = true, ErrorType = StudentManagementResponseType.StudentAwardInstituteName });
            else if (!await _iMSDbContext.MaritalStatuses.AnyAsync(x => x.Id == updateStudent.MaritalStatusId && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Marital status not found", HasError = true, ErrorType = StudentManagementResponseType.MaritalStatusId });
            else if (!await _iMSDbContext.Sections.AnyAsync(x => x.Id == updateStudent.SectionId && x.InstituteId == loggedInUserInstituteId))
                return Ok(new StudentManagementResponse() { Message = "Section not found", HasError = true, ErrorType = StudentManagementResponseType.SectionId });
            else
                return Ok(await _studentManagementRepository.UpdateStudentAsync(updateStudent, loggedInUser));
        }

        [HttpPost("image/{studentId}")]
        public async Task<IActionResult> AddOrUpdateStaffImageAsync(int studentId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            await _studentManagementRepository.AddOrUpdateStaffImageAsync(Request.Form.Files, studentId, loggedInUserInstituteId);
            return Ok();
        }

        [HttpPost("gallery/{studentId}")]
        public async Task<IActionResult> AddOrUpdateStudentGalleryAsync(int studentId)
        {
            var loggedInUser = await _userManager.FindByNameAsync(User.Identity.Name);
            await _studentManagementRepository.AddOrUpdateStudentGalleryAsync(Request.Form.Files, studentId, loggedInUser);
            return Ok();
        }

        [HttpDelete("{studentId}")]
        public async Task<IActionResult> ArchiveStudentAsync(int studentId)
        {
            return Ok(await _studentManagementRepository.ArchiveStudentAsync(studentId, await GetUserCurrentSelectedInstituteIdAsync()));
        }

        [HttpGet("inactive")]
        public async Task<IActionResult> GetAllInActiveStudentByInsituteIdAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var students = await _iMSDbContext.StudentBasicInformation.Where(x => x.InstituteId == loggedInUserInstituteId && !x.IsActive).ToListAsync();
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var academicYear = await _iMSDbContext.SelectedAcademicYears.FirstOrDefaultAsync(x => x.UserId == user.Id
            && x.AcademicYear.InstituteId == loggedInUserInstituteId);
            if (academicYear != null)
                students = students.Where(x => x.CurrentAcademicYearId == academicYear.AcademicYearId).ToList();
            return Ok(students);
        }

        [HttpDelete("inactive/{studentId}")]
        public async Task<IActionResult> MarkActiveAndInActiveStudentAsync(int studentId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var student = await _iMSDbContext.StudentBasicInformation.FirstOrDefaultAsync(x => x.Id == studentId && x.InstituteId == loggedInUserInstituteId);
            if (student != null)
            {
                student.IsActive = !student.IsActive;
                _iMSDbContext.StudentBasicInformation.Update(student);
                await _iMSDbContext.SaveChangesAsync();
                return Ok(new { HasError = false });
            }
            else
                return Ok(new { HasError = true, Message = "student not found" });
        }

        [HttpGet("user/{studentId}")]
        public async Task<IActionResult> GetStudentUserDetailsAsync(int studentId)
        {
            int loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _studentManagementRepository.GetStudentUserDetailsAsync(studentId, loggedInUserInstituteId));
        }

        [HttpPost("notification/send")]
        public async Task<IActionResult> SendNotificationAsync([FromBody] StudentNotificationAc studentNotificationAc)
        {
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _studentManagementRepository.SendNotificationAsync(studentNotificationAc, currentUser, await GetUserCurrentSelectedInstituteIdAsync()));
        }

        [HttpGet("articles")]
        public async Task<IActionResult> GetAllStudentsArticlesAsync()
        {
            return Ok(await _studentManagementRepository.GetAllStudentsArticlesAsync(await GetUserCurrentSelectedInstituteIdAsync()));
        }

        [HttpGet("articles/approve/{articleId}")]
        public async Task<IActionResult> ApproveStudentArticleAsync(int articleId)
        {
            int instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _studentManagementRepository.ApproveStudentArticleAsync(articleId, instituteId));
        }

        [HttpGet("dashboard")]
        public async Task<IActionResult> GetStudentManagementDashboardDetailsAsync()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _studentManagementRepository.GetStudentManagementDashboardDetailsAsync(user));
        }

        [HttpGet("initialdata/report")]
        public async Task<IActionResult> GetInitialDataForReportsAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var classes = await _iMSDbContext.InstituteClasses.Where(x => x.InstituteId == instituteId).ToListAsync();
            var sections = await _iMSDbContext.Sections.Where(x => x.InstituteId == instituteId).ToListAsync();
            var religions = await _iMSDbContext.Religions.Where(x => x.InstituteId == instituteId).ToListAsync();
            var academicYears = await _iMSDbContext.InstituteAcademicYears.Where(x => x.InstituteId == instituteId).ToListAsync();
            var genders = await _iMSDbContext.Genders.Where(x => x.InstituteId == instituteId).ToListAsync();
            var students = await _iMSDbContext.StudentBasicInformation.Include(s => s.CurrentClass).Include(s => s.Religion)
                .Include(s => s.Gender).Where(x => x.InstituteId == instituteId).ToListAsync();
            var currentYear = academicYears.FirstOrDefault(x => x.IsActive);
            if (currentYear != null)
                students = students.Where(x => x.CurrentAcademicYearId == currentYear.Id).ToList();
            var studentIds = students.Select(s => s.Id).Distinct().ToList();
            var attendances = await _iMSDbContext.StudentAttendances.Where(x => studentIds.Contains(x.StudentId)).ToListAsync();
            if (currentYear != null)
                attendances = attendances.Where(x => x.AcademicYearId == currentYear.Id).ToList();
            attendances.ForEach(x => x.AttendanceTypeDescription = EnumHelperService.GetDescription(x.AttendanceType));
            var classSubjectMappings = await _iMSDbContext.InstituteClassSubjectMappings.Where(x => x.InstituteClass.InstituteId == instituteId).ToListAsync();
            var staffs = await _iMSDbContext.StaffBasicPersonalInformation.Where(x => x.InstituteId == instituteId).ToListAsync();
            var notices = await _iMSDbContext.CircularNotices.Include(s => s.CreatedBy)
                .Where(x => x.InstituteId == instituteId && x.NoticeTo == NoticeToEnum.AllStudents).ToListAsync();
            foreach (var notice in notices)
            {
                notice.CircularNoticeRecipients = await _iMSDbContext.CircularNoticeRecipients.Include(s => s.Recipient)
                    .Where(x => x.CircularNoticeId == notice.Id).ToListAsync();
            }
            var examScores = await _iMSDbContext.ExamScoreEntrys.Include(s => s.Exam).Where(x => x.Student.InstituteId == instituteId).ToListAsync();
            var exams = await _iMSDbContext.ExamDefinitions.Where(x => x.InstituteId == instituteId).ToListAsync();
            var classExams = await _iMSDbContext.ClassExams.Where(x => x.Class.InstituteId == instituteId).ToListAsync();
            var allowedDates = await GetAttendanceDaysAsync(instituteId);
            return Ok(new
            {
                classes,
                sections,
                religions,
                academicYears,
                genders,
                students,
                attendances,
                classSubjectMappings,
                staffs,
                notices,
                examScores,
                exams,
                classExams,
                allowedDates
            });
        }

        [HttpPost("import")]
        public async Task<IActionResult> ImportStudentFromExcelAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var file = Request.Form.Files;
            if (file.Count != 0)
                return Ok(new { Message = await _studentManagementRepository.ImportStudentFromExcelAsync(instituteId, file[0], user.Id) });
            else
                return Ok(new { Message = "No file found" });
        }

        [HttpPost("document/{studentId}")]
        public async Task<IActionResult> AddOrUpdateStudentDocumentAsync(int studentId)
        {
            var isModel = Request.Form.TryGetValue("model-document", out StringValues modelData);
            if (isModel)
            {
                var files = Request.Form.Files;
                List<AddStudentDocumentMappingAc> model = JsonConvert.DeserializeObject<List<AddStudentDocumentMappingAc>>(modelData.ToString());
                var loggedInUser = await _userManager.FindByNameAsync(User.Identity.Name);
                await _studentManagementRepository.AddOrUpdateStudentDocumentsAsync(files, studentId, loggedInUser, model);
            }
            return Ok();
        }

        [HttpPut("documentdata/{studentId}")]
        public async Task<IActionResult> UpdateDocumentDataAsync([FromBody]List<AddStudentDocumentMappingAc> studentDocuments, int studentId)
        {
            var documents = await _iMSDbContext.StudentDocumentMappings.Where(x => x.StudentId == studentId).ToListAsync();
            _iMSDbContext.StudentDocumentMappings.RemoveRange(documents);
            await _iMSDbContext.SaveChangesAsync();
            List<StudentDocumentMapping> studentDocumentMappings = new List<StudentDocumentMapping>();
            foreach (var doc in studentDocuments)
            {
                studentDocumentMappings.Add(new StudentDocumentMapping()
                {
                    CreatedOn = DateTime.UtcNow,
                    ExpiredDate = doc.ExpiredDate,
                    FileType = EnumHelperService.GetValueFromDescription<FileTypeEnum>(doc.FileType),
                    FileUrl = doc.FileUrl,
                    MetaData = doc.MetaData,
                    Name = doc.Name,
                    StudentId = studentId
                });
            }
            _iMSDbContext.StudentDocumentMappings.AddRange(studentDocumentMappings);
            await _iMSDbContext.SaveChangesAsync();
            return Ok();
        }
        #endregion

        #region Private Method(s)
        /// <summary>
        /// Method to check student prior education list for validation - SS
        /// </summary>
        /// <param name="addStudentPriors">student prior list</param>
        /// <returns>True or False</returns>
        private bool CheckIfListOfStudentPriorEducations(List<AddStudentPriorEducationAc> addStudentPriors)
        {
            var names = addStudentPriors.Select(x => x.InstituteName).ToList();
            return names.Any(x => x.Trim() == string.Empty || x.Trim() == null);
        }

        /// <summary>
        /// Method to check student disciplines list for validation - SS
        /// </summary>
        /// <param name="addStudentDisciplines">student discipline list</param>
        /// <returns>True or False</returns>
        private bool CheckIfListOfStudentDisciplines(List<AddStudentDisciplineAc> addStudentDisciplines)
        {
            var names = addStudentDisciplines.Select(x => x.Subject).ToList();
            return names.Any(x => x.Trim() == string.Empty || x.Trim() == null);
        }

        /// <summary>
        /// Method to check student sport list for validation - SS
        /// </summary>
        /// <param name="addStudentSports">sports list</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>True or False</returns>
        private async Task<bool> CheckIfListOfStudentStudentSportIdAsync(List<AddStudentSportAc> addStudentSports, int instituteId)
        {
            var sportIds = addStudentSports.Select(x => x.SportId);
            var sports = await _iMSDbContext.SportDetails.CountAsync(x => x.InstituteId == instituteId && sportIds.Contains(x.Id));
            return (sportIds.Count() == sports);
        }

        /// <summary>
        /// Method to check student sport level list for validation - SS
        /// </summary>
        /// <param name="addStudentSports">sports list</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>True or False</returns>
        private async Task<bool> CheckIfListOfStudentStudentLevelIdAsync(List<AddStudentSportAc> addStudentSports, int instituteId)
        {
            var levelIds = addStudentSports.Select(x => x.LevelId);
            var level = await _iMSDbContext.Levels.CountAsync(x => x.InstituteId == instituteId && levelIds.Contains(x.Id));
            return (levelIds.Count() == level);
        }

        /// <summary>
        /// Method to check student award list for validation - SS
        /// </summary>
        /// <param name="addStudentAwards">student award list</param>
        /// <returns>True or False</returns>
        private bool CheckIfListOfStudentAwardAwardName(List<AddStudentAwardAc> addStudentAwards)
        {
            var names = addStudentAwards.Select(x => x.AwardName).ToList();
            return names.Any(x => x.Trim() == string.Empty || x.Trim() == null);
        }

        /// <summary>
        /// Method to check student award institute name list for validation - SS
        /// </summary>
        /// <param name="addStudentAwards">student award list</param>
        /// <returns>True or False</returns>
        private bool CheckIfListOfStudentAwardInstituteName(List<AddStudentAwardAc> addStudentAwards)
        {
            var names = addStudentAwards.Select(x => x.InstituteName).ToList();
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
