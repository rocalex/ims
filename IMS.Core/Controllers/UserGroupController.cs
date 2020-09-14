using IMS.DomainModel.ApplicationClasses.UserGroup;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.UserGroupManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class UserGroupController : Controller
    {
        #region Private variables

        private const string BaseUrl = "api/[controller]";
        private readonly IUserGroupManagementRepository _userGroupManagementRepository;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMSDbContext _iMSDbContext;

        #endregion

        #region Constructor

        public UserGroupController(IUserGroupManagementRepository userGroupManagementRepository,
            IInstituteUserMappingHelperService instituteUserMappingHelperService,
            UserManager<ApplicationUser> userManager,
            IMSDbContext iMSDbContext)
        {
            _userGroupManagementRepository = userGroupManagementRepository;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
            _userManager = userManager;
            _iMSDbContext = iMSDbContext;
        }

        #endregion

        #region Public Methods

        #region User Groups

        /// <summary>
        /// Method for fetching the list of all user groups
        /// </summary>
        /// <returns></returns>
        [HttpGet("")]
        public async Task<IActionResult> GetAllUserGroupsAsync()
        {
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _userGroupManagementRepository.GetAllUserGroupsAsync(currentUser));
        }

        /// <summary>
        /// Method for fetching a particular user role by id
        /// </summary>
        /// <returns></returns>
        [HttpGet("{userGroupId}")]
        public async Task<IActionResult> GetUserGroupByIdAsync(int userGroupId)
        {
            UserGroup userGroup = await _userGroupManagementRepository.GetUserGroupByIdAsync(userGroupId);
            if (userGroup == null)
            {
                return NotFound(new { Message = "Please verify the user role id", HasError = true });
            }

            return Ok(userGroup);
        }

        /// <summary>
        /// Method for adding new user role
        /// </summary>
        /// <returns></returns>
        [HttpPost("")]
        public async Task<IActionResult> AddNewUserGroupAsync([FromBody] AddUserGroupAc newUserGroupAc)
        {
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);
            UserGroup existingUserGroup = await _iMSDbContext.UserGroups.FirstOrDefaultAsync(x => x.Code.Equals(newUserGroupAc.Code) && x.InstituteId == currentUserInstituteId);

            if (existingUserGroup != null)
            {
                return Ok(new { Message = "User Role already exists with this code", HasError = true });
            }

            if (ModelState.IsValid)
            {
                await _userGroupManagementRepository.AddNewUserGroupAsync(newUserGroupAc, currentUser);
                return Ok(new { Message = "New User Role Added Successfully" });
            }
            else
            {
                if (string.IsNullOrEmpty(newUserGroupAc.Code))
                {
                    return Ok(new { Message = "User Role Code can't be empty", HasError = true });
                }
                else
                {
                    return Ok(new { Message = "User Role Name can't be empty", HasError = true });
                }
            }
        }

        /// <summary>
        /// Method for updating a particular user group's details
        /// </summary>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUserGroupAsync(int id, [FromBody] AddUserGroupAc updatedUserGroupAc)
        {
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);

            UserGroup existingUserGroup = await _iMSDbContext.UserGroups.FirstOrDefaultAsync(x => x.Code.Equals(updatedUserGroupAc.Code) && x.InstituteId == currentUserInstituteId && x.Id != id);
            if (existingUserGroup != null)
            {
                return Ok(new { Message = "User group already exists with this code", HasError = true });
            }

            if (ModelState.IsValid)
            {
                if ((await _userGroupManagementRepository.GetUserGroupByIdAsync(id)) == null)
                {
                    return Ok(new { Message = "Please make sure the user group exists", HasError = true });
                }

                await _userGroupManagementRepository.UpdateUserGroupAsync(id, updatedUserGroupAc, currentUser);

                return Ok(new { Message = "User Group updated successfully" });
            }
            else
            {
                if (string.IsNullOrEmpty(updatedUserGroupAc.Code))
                {
                    return Ok(new { Message = "User Group Code can't be null or empty", HasError = true });
                }
                else
                {
                    return Ok(new { Message = "User Group Name can't be null or empty", HasError = true });
                }
            }
        }

        #endregion

        #region User Group Feature

        [HttpGet("feature/{userGroupId}")]
        public async Task<IActionResult> GetUserGroupFeaturesByUserGroupIdAsync(int userGroupId)
        {
            ApplicationUser loggedInUser = await _userManager.FindByNameAsync(User.Identity.Name);
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);

            var userGroup = await _iMSDbContext.UserGroups.FirstOrDefaultAsync(x => x.Id == userGroupId && x.InstituteId == currentUserInstituteId);
            if (userGroup != null)
                return Ok(await _userGroupManagementRepository.GetAllUserGroupFeaturesByUserGroupIdAsync(userGroupId));
            else
                return Ok(new { Message = "User Group not found" });
        }

        [HttpPut("feature")]
        public async Task<IActionResult> BulkUpdateUserGroupFeatureAsync([FromBody]List<UserGroupFeature> userGroupFeatures)
        {
            await _userGroupManagementRepository.BulkUpdateUserGroupFeatureAsync(userGroupFeatures);
            return Ok();
        }

        #endregion

        #endregion
    }
}
