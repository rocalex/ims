using IMS.DomainModel.ApplicationClasses.CircularNoticeManagement;
using IMS.DomainModel.ApplicationClasses.UserManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.CircularNoticeManagement;
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
    public class CircularNoticeManagementController : BaseController
    {
        #region Private variables

        private const string BaseUrl = "api/[controller]";
        private readonly ICircularNoticeManagementRepository _circularNoticeManagementRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMSDbContext _imsDbContext;

        #endregion

        #region Constructor

        public CircularNoticeManagementController(IInstituteUserMappingHelperService instituteUserMappingHelperService,
            ICircularNoticeManagementRepository circularNoticeManagementRepository,
            UserManager<ApplicationUser> userManager,
            IMSDbContext imsDbContext)
             : base(instituteUserMappingHelperService)
        {
            _circularNoticeManagementRepository = circularNoticeManagementRepository;
            _userManager = userManager;
            _imsDbContext = imsDbContext;
        }

        #endregion

        #region Public methods

        [HttpGet("initial")]
        public async Task<IActionResult> GetNoticeInitialData()
        {
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();

            // Staffs (Attendee)
            List<StaffBasicPersonalInformation> staffsList = await _imsDbContext.StaffBasicPersonalInformation.Where(x => x.InstituteId == currentUserInstituteId).ToListAsync();

            // Students (Attendee)
            List<StudentBasicInformation> studentsList = await _circularNoticeManagementRepository.GetAttendeeStudentsListAsync(currentUserInstituteId);

            // System Users (Attendee)
            List<UserAc> systemUsersList = await _circularNoticeManagementRepository.GetAttendeeSystemUsersListAsync(currentUserInstituteId);

            // Class (Filter)
            List<InstituteClass> classList = await _imsDbContext.InstituteClasses.Where(x => x.InstituteId == currentUserInstituteId).ToListAsync();

            // Sections (Filter)
            List<Section> sectionsList = await _imsDbContext.Sections.Where(x => x.InstituteId == currentUserInstituteId).ToListAsync();

            return Ok(new
            {
                StaffsList = staffsList,
                StudentsList = studentsList,
                SystemUsersList = systemUsersList,
                ClassList = classList,
                SectionsList = sectionsList
            });
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllCircularNoticeAsync()
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _circularNoticeManagementRepository.GetAllCircularNoticeAsync(currentUserInstituteId));
        }

        [HttpGet("{noticeId}")]
        public async Task<IActionResult> GetCircularNoticeByIdAsync(int noticeId)
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _circularNoticeManagementRepository.GetCircularNoticeByIdAsync(currentUserInstituteId, noticeId));
        }

        [HttpPost("")]
        public async Task<IActionResult> AddNewCircularNoticeAsync([FromBody] CircularNoticeAc addedCircularNoticeAc)
        {
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _circularNoticeManagementRepository.AddNewCircularNoticeAsync(currentUserInstituteId, addedCircularNoticeAc, currentUser));
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateCircularNoticeAsync([FromBody] CircularNoticeAc updatedCircularNoticeAc)
        {
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _circularNoticeManagementRepository.UpdateCircularNoticeAsync(currentUserInstituteId, updatedCircularNoticeAc, currentUser));
        }

        [HttpDelete("{noticeId}")]
        public async Task<IActionResult> DeleteCircularNoticeAsync(int noticeId)
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _circularNoticeManagementRepository.DeleteCircularNoticeAsync(noticeId, currentUserInstituteId));
        }

        #endregion
    }
}
