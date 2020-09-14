using IMS.DomainModel.ApplicationClasses.InstituteWeekOff;
using IMS.DomainModel.ApplicationClasses.TimeTableManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.InstituteAcademicYearManagement;
using IMS.Repository.InstituteClassManagement;
using IMS.Repository.InstituteSubjectManagement;
using IMS.Repository.SectionManagement;
using IMS.Repository.TimeTableManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class TimeTableManagementController : BaseController
    {
        #region Private variables

        private const string BaseUrl = "api/[controller]";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ITimeTableManagementRepository _timeTableManagementRepository;
        private readonly IInstituteAcademicYearManagementRepository _instituteAcademicYearManagementRepository;
        private readonly IInstituteSubjectManagementRepository _instituteSubjectManagementRepository;
        private readonly IMSDbContext _imsDbContext;

        #endregion

        #region Constructor

        public TimeTableManagementController(IInstituteUserMappingHelperService instituteUserMappingHelperService,
            ITimeTableManagementRepository timeTableManagementRepository,
            IInstituteAcademicYearManagementRepository instituteAcademicYearManagementRepository,
            IInstituteSubjectManagementRepository instituteSubjectManagementRepository,
            UserManager<ApplicationUser> userManager,
            IMSDbContext imsDbContext)
            :base(instituteUserMappingHelperService)
        {
            _timeTableManagementRepository = timeTableManagementRepository;
            _instituteAcademicYearManagementRepository = instituteAcademicYearManagementRepository;
            _instituteSubjectManagementRepository = instituteSubjectManagementRepository;
            _userManager = userManager;
            _imsDbContext = imsDbContext;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Method for fetching the class and sections list
        /// </summary>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        [HttpGet("class/sections/all")]
        public async Task<IActionResult> GetClassSectionsListAsync()
        {
            return Ok(await _timeTableManagementRepository.GetClassSectionsListAsync(await GetUserCurrentSelectedInstituteIdAsync()));
        }

        /// <summary>
        /// Method for fetching the details of a time table based on class, section, institute and academic year
        /// </summary>
        /// <param name="classId"></param>
        /// <param name="sectionId"></param>
        /// <param name="academicYearId"></param>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        [HttpGet("details/{classId}/{sectionId}/{academicYearId}")]
        public async Task<IActionResult> GetTimeTableDetailsAsync(int classId, int sectionId, int academicYearId)
        {
            int instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _timeTableManagementRepository.GetTimeTableDetailsAsync(classId, sectionId, academicYearId, instituteId));
        }

        /// <summary>
        /// Method for fetching the details of a time table based on class, section, institute and academic year for a particular staff
        /// </summary>
        /// <param name="classId"></param>
        /// <param name="sectionId"></param>
        /// <param name="academicYearId"></param>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        [HttpGet("staff/details/{classId}/{sectionId}/{academicYearId}")]
        public async Task<IActionResult> GetTimeTableDetailsForStaffAsync(int classId, int sectionId, int academicYearId)
        {
            int instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            string currentUserId = (await _userManager.FindByNameAsync(User.Identity.Name)).Id;
            int staffId = (await _imsDbContext.StaffBasicPersonalInformation.FirstAsync(x => x.UserId == currentUserId)).Id;
            return Ok(await _timeTableManagementRepository.GetTimeTableForStaffAsync(classId, sectionId, staffId, academicYearId, instituteId));
        }

        /// <summary>
        /// Method for fetching the initial data
        /// </summary>
        /// <returns></returns>
        [HttpGet("initialdata/{classId}/{sectionId}")]
        public async Task<IActionResult> GetTimeTableInitialDataAsync(int classId, int sectionId)
        {
            int loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();

            List<WeekDaysEnumDetails> weekDaysEnumDetailsList = _timeTableManagementRepository.GetDaysOfWeek(loggedInUserInstituteId);
            List<InstituteAcademicYear> academicYears = await _instituteAcademicYearManagementRepository.GetAcademicYearsListAsync(loggedInUserInstituteId);
            List<InstituteSubject> subjects = await _instituteSubjectManagementRepository.GetAllInstituteSubjectsAsync(loggedInUserInstituteId);
            InstituteClass instituteClass = await _imsDbContext.InstituteClasses.FirstOrDefaultAsync(x => x.Id == classId && x.InstituteId == loggedInUserInstituteId);
            Section section = await _imsDbContext.Sections.FirstOrDefaultAsync(x => x.Id == sectionId && x.InstituteId == loggedInUserInstituteId);

            return Ok(new { AcademicYears = academicYears.Where(x => x.IsActive), Subjects = subjects, daysOfWeek = weekDaysEnumDetailsList, Class = instituteClass, Section = section });
        }

        /// <summary>
        /// Method for add or update time table details
        /// </summary>
        /// <param name="addedTimeTable"></param>
        /// <param name="instituteId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        [HttpPost("")]
        public async Task<IActionResult> AddUpdateTimeTableAsync([FromBody] AddTimeTableAc addedTimeTable)
        {
            int instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            return Ok(await _timeTableManagementRepository.AddUpdateTimeTableAsync(addedTimeTable, instituteId, currentUser));
        }

        #endregion
    }
}
