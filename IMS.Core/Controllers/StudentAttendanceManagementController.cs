using IMS.DomainModel.ApplicationClasses.StudentAttendanceManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.StudentAttendanceManagement;
using IMS.Utility.EnumHelper;
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
    public class StudentAttendanceManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly IStudentAttendanceManagementRepository _studentAttendanceManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public StudentAttendanceManagementController(IStudentAttendanceManagementRepository studentAttendanceManagementRepository, IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _studentAttendanceManagementRepository = studentAttendanceManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddStudentAttendanceAsync([FromBody]AddStudentAttendanceManagementWrapperAc studentAttendances)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            await _studentAttendanceManagementRepository.AddStudentAttendanceAsync(studentAttendances, user);
            return Ok();
        }

        [HttpPost("search")]
        public async Task<IActionResult> GetStudentAttendanceAsync([FromBody]GetStudentAttendanceManagementAc getStudent)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _studentAttendanceManagementRepository.GetStudentAttendanceAsync(getStudent, user));
        }

        [HttpGet("weekoff")]
        public async Task<IActionResult> GetWeekOffsByCurrentAcademicYearIdAsync()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _studentAttendanceManagementRepository.GetWeekOffsByCurrentAcademicYearIdAsync(user));
        }

        [HttpPost("search/studentdashboard")]
        public async Task<IActionResult> GetStudentAttendanceForStudentDashboardAsync([FromBody]GetStudentAttendanceForStudentDashboardAc attendance)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var student = await _iMSDbContext.StudentBasicInformation.FirstOrDefaultAsync(x => x.UserId == user.Id && x.InstituteId == instituteId);
            List<StudentAttendance> attendances = new List<StudentAttendance>();
            if (student != null)
            {
                var academicYear = await _iMSDbContext.InstituteAcademicYears.FirstOrDefaultAsync(x => x.InstituteId == instituteId && x.IsActive);
                attendances = await _iMSDbContext.StudentAttendances.Where(x => x.StudentId == student.Id && x.AttendanceDate >= attendance.FromDate
                && x.AttendanceDate <= attendance.EndDate && x.PeriodOrderId == 0).ToListAsync();
                if (academicYear != null)
                    attendances = attendances.Where(x => x.AcademicYearId == academicYear.Id).ToList();
                attendances.ForEach(x => x.AttendanceTypeDescription = EnumHelperService.GetDescription(x.AttendanceType));
            }
            return Ok(attendances);
        }
        #endregion
    }
}
