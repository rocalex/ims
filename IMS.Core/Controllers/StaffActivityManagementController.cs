using IMS.DomainModel.ApplicationClasses.StaffManagement;
using IMS.DomainModel.ApplicationClasses.UserManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Repository.ActivityStatusManagement;
using IMS.Repository.MeetingAgendaManagement;
using IMS.Repository.StaffActivityManagement;
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
    public class StaffActivityManagementController : Controller
    {
        #region Private variables

        private const string BaseUrl = "api/[controller]";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMSDbContext _imsDbContext;        
        private readonly IStaffActivityManagementRepository _staffActivityManagementRepository;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        private readonly IActivityStatusManagementRepository _activityStatusManagementRepository;
        private readonly IMeetingAgendaManagementRepository _meetingAgendaManagementRepository;

        #endregion

        #region Constructor

        public StaffActivityManagementController(UserManager<ApplicationUser> userManager,
            IMSDbContext imsDbContext,            
            IStaffActivityManagementRepository staffActivityManagementRepository,
            IInstituteUserMappingHelperService instituteUserMappingHelperService,
            IActivityStatusManagementRepository activityStatusManagementRepository,
            IMeetingAgendaManagementRepository meetingAgendaManagementRepository)
        {
            _userManager = userManager;
            _imsDbContext = imsDbContext;            
            _staffActivityManagementRepository = staffActivityManagementRepository;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
            _activityStatusManagementRepository = activityStatusManagementRepository;
            _meetingAgendaManagementRepository = meetingAgendaManagementRepository;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Method for fetching the initial data for creating/updating staff activities - RS
        /// </summary>
        /// <returns></returns>
        [HttpGet("initial")]
        public async Task<IActionResult> GetActivityInitialData()
        {
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);

            // Activity Status
            List<ActivityStatus> activityStatusList = await _activityStatusManagementRepository.GetAllActivityStatusAsync(currentUserInstituteId, currentUser);

            // Meeting Agenda
            List<MeetingAgenda> meetingAgendaList = await _meetingAgendaManagementRepository.GetAllMeetingAgendasAsync(currentUserInstituteId);

            // Staffs (Attendee)
            List<StaffBasicPersonalInformation> staffsList = await _imsDbContext.StaffBasicPersonalInformation.Where(x => x.InstituteId == currentUserInstituteId).ToListAsync();

            // Students (Attendee)
            List<StudentBasicInformation> studentsList = await _staffActivityManagementRepository.GetAttendeeStudentsListAsync(currentUserInstituteId);

            // System Users (Attendee)
            List<UserAc> systemUsersList = await _staffActivityManagementRepository.GetAttendeeSystemUsersListAsync(currentUserInstituteId);

            return Ok(new
            {
                MeetingAgendaList = meetingAgendaList,
                ActivityStatusList = activityStatusList,
                StaffsList = staffsList,
                StudentsList = studentsList,
                SystemUsersList = systemUsersList
            });
        }

        /// <summary>
        /// Method for fetching the list of all activities - RS
        /// </summary>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        [HttpGet("")]
        public async Task<IActionResult> GetAllActivitiesAsync()
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            return Ok(await _staffActivityManagementRepository.GetAllActivitiesAsync(currentUser));
        }

        /// <summary>
        /// Method for fetching an activity by id - RS
        /// </summary>
        /// <param name="activityId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        [HttpGet("{activityId}")]
        public async Task<IActionResult> GetActivityByIdAsync(int activityId)
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            return Ok(await _staffActivityManagementRepository.GetActivityByIdAsync(activityId, currentUser));
        }

        /// <summary>
        /// Method for adding new activity - RS
        /// </summary>
        /// <param name="newStaffActivity"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        [HttpPost("")]
        public async Task<IActionResult> AddActivityAsync([FromBody] StaffActivityAc newStaffActivityAc)
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            return Ok(await _staffActivityManagementRepository.AddActivityAsync(newStaffActivityAc, currentUser));
        }

        /// <summary>
        /// Method for updating an existing activity - RS
        /// </summary>
        /// <param name="activityId"></param>
        /// <param name="updatedStaffActivity"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        [HttpPut("{activityId}")]
        public async Task<IActionResult> UpdateActivityAsync(int activityId, [FromBody] StaffActivityAc updatedStaffActivityAc)
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            return Ok(await _staffActivityManagementRepository.UpdateActivityAsync(activityId, updatedStaffActivityAc, currentUser));
        }

        #endregion
    }
}
