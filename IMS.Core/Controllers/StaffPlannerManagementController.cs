using IMS.DomainModel.ApplicationClasses.StaffManagement;
using IMS.DomainModel.ApplicationClasses.UserManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.StaffPlannerManagement;
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
    public class StaffPlannerManagementController : Controller
    {
        #region Private variables

        private const string BaseUrl = "api/[controller]";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IStaffPlannerManagementRepository _staffPlannerManagementRepository;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        private readonly IMSDbContext _imsDbContext;

        #endregion

        #region Constructor

        public StaffPlannerManagementController(UserManager<ApplicationUser> userManager,
            IStaffPlannerManagementRepository staffPlannerManagementRepository,
            IInstituteUserMappingHelperService instituteUserMappingHelperService,
            IMSDbContext imsDbContext)
        {
            _userManager = userManager;
            _staffPlannerManagementRepository = staffPlannerManagementRepository;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
            _imsDbContext = imsDbContext;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Method for fetching the initial data for creating/updating staff planners - RS
        /// </summary>
        /// <returns></returns>
        [HttpGet("initial")]
        public async Task<IActionResult> GetPlannerInitialData()
        {
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);

            // Staffs (Attendee)
            List<StaffBasicPersonalInformation> staffsList = await _imsDbContext.StaffBasicPersonalInformation.Where(x => x.InstituteId == currentUserInstituteId).ToListAsync();
            
            // Students (Attendee)
            List<StudentBasicInformation> studentsList = await _staffPlannerManagementRepository.GetAttendeeStudentsListAsync(currentUserInstituteId);

            // System Users (Attendee)
            List<UserAc> systemUsersList = await _staffPlannerManagementRepository.GetAttendeeSystemUsersListAsync(currentUserInstituteId);

            return Ok(new
            {
                StaffsList = staffsList,
                StudentsList = studentsList,
                SystemUsersList = systemUsersList
            });
        }

        /// <summary>
        /// Method for fetching the list of all plans
        /// </summary>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        [HttpGet("")]
        public async Task<IActionResult> GetAllStaffPlansAsync()
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            return Ok(await _staffPlannerManagementRepository.GetAllStaffPlansAsync(currentUser));
        }

        /// <summary>
        /// Method for fetching an staff plan by id
        /// </summary>
        /// <param name="planId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        [HttpGet("{planId}")]
        public async Task<IActionResult> GetStaffPlanByIdAsync(int planId)
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            return Ok(await _staffPlannerManagementRepository.GetStaffPlanByIdAsync(planId, currentUser));
        }

        /// <summary>
        /// Method for adding new staff plan
        /// </summary>
        /// <param name="newStaffPlan"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        [HttpPost("")]
        public async Task<IActionResult> AddStaffPlanAsync([FromBody] StaffPlannerAc newStaffPlanAc)
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            return Ok(await _staffPlannerManagementRepository.AddStaffPlanAsync(newStaffPlanAc, currentUser));
        }

        /// <summary>
        /// Method for updating an existing staff plan
        /// </summary>
        /// <param name="planId"></param>
        /// <param name="updatedStaffPlan"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        [HttpPut("{planId}")]
        public async Task<IActionResult> UpdateStaffPlanAsync(int planId, [FromBody] StaffPlannerAc updatedStaffPlanAc)
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            return Ok(await _staffPlannerManagementRepository.UpdateStaffPlanAsync(planId, updatedStaffPlanAc, currentUser));
        }

        #endregion
    }
}
