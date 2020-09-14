using IMS.DomainModel.ApplicationClasses.StaffAttendanceManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.StaffAttendanceManagement;
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
    public class StaffAttendanceManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly IStaffAttendanceManagementRepository _staffAttendanceManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public StaffAttendanceManagementController(IStaffAttendanceManagementRepository staffAttendanceManagementRepository, IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _staffAttendanceManagementRepository = staffAttendanceManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddStaffAttendanceAsync([FromBody]List<AddStaffAttendanceManagementWrapperAc> StaffAttendances)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            await _staffAttendanceManagementRepository.AddStaffAttendanceAsync(StaffAttendances, user);
            return Ok();
        }

        [HttpPost("search")]
        public async Task<IActionResult> GetStaffAttendanceAsync([FromBody]GetStaffAttendanceManagementAc getStaff)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _staffAttendanceManagementRepository.GetStaffAttendanceAsync(getStaff, user));
        }

        [HttpGet("weekoff")]
        public async Task<IActionResult> GetWeekOffsByCurrentAcademicYearIdAsync()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _staffAttendanceManagementRepository.GetWeekOffsByCurrentAcademicYearIdAsync(user));
        }

        [HttpGet("intialdata")]
        public async Task<IActionResult> GetInitialDataAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var staffs = await _iMSDbContext.StaffBasicPersonalInformation.Where(x => x.InstituteId == instituteId).ToListAsync();
            return Ok(new { staffs });
        }
        #endregion
    }
}
