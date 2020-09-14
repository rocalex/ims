using IMS.DomainModel.ApplicationClasses.UserManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.InstituteManagement;
using IMS.Repository.UserGroupManagement;
using IMS.Repository.UserManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class UserManagementController : Controller
    {
        #region Private variables
        private const string BaseUrl = "api/[controller]";
        private readonly IUserManagementRepository _userManagementRepository;
        private readonly IInstituteManagementRepository _instituteManagementRepository;
        private readonly IUserGroupManagementRepository _userGroupManagementRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        private readonly IMSDbContext _iMSDbContext;
        #endregion

        #region Constructor
        public UserManagementController(IUserManagementRepository userManagementRepository,
            IInstituteManagementRepository instituteManagementRepository,
            IUserGroupManagementRepository userGroupManagementRepository, IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
        {
            _userManagementRepository = userManagementRepository;
            _instituteManagementRepository = instituteManagementRepository;
            _userGroupManagementRepository = userGroupManagementRepository;
            _userManager = userManager;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public methods

        /// <summary>
        /// Method for fetching the list of all users
        /// </summary>
        /// <returns></returns>
        [HttpGet("")]
        public async Task<IActionResult> GetAllUsersAsync()
        {
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _userManagementRepository.GetAllUsersAsync(currentUser));
        }

        /// <summary>
        /// Method for fetching the details of a particular user by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserByIdAsync(string userId)
        {
            return Ok(await _userManagementRepository.GetUserByIdAsync(userId));
        }

        /// <summary>
        /// Method for adding a new user
        /// </summary>
        /// <param name="newUserAc"></param>
        /// <returns></returns>
        [HttpPost("")]
        public async Task<IActionResult> AddNewUserAsync([FromBody] AddUserAc newUserAc)
        {
            ApplicationUser existingUserWithEmail = await _userManager.FindByEmailAsync(newUserAc.Email);
            if (existingUserWithEmail != null)
            {
                return Ok(new { Message = "User already exist with this email", HasError = true });
            }

            if (ModelState.IsValid)
            {
                ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
                await _userManagementRepository.AddNewUserAsync(newUserAc, currentUser);

                return Ok(new { Message = "User has been created successfully" });
            }
            else
            {
                if (string.IsNullOrEmpty(newUserAc.Name))
                {
                    return Ok(new { Message = "User's Name can't be null or empty", HasError = true });
                }
                else if (string.IsNullOrEmpty(newUserAc.Password))
                {
                    return Ok(new { Message = "User's Password can't be null or empty", HasError = true });
                }
                else if (newUserAc.UserGroupIdList.Count == 0)
                {
                    return Ok(new { Message = "Please select user role", HasError = true });
                }
                else
                {
                    return Ok(new { Message = "User's Institute can't be null or empty", HasError = true });
                }
            }
        }

        /// <summary>
        /// Method for updating an existing user
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedUserAc"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUserAsync(string id, [FromBody] UpdateUserAc updatedUserAc)
        {
            if (string.IsNullOrEmpty(updatedUserAc.Name))
            {
                return Ok(new { Message = "User's Name can't be null or empty", HasError = true });
            }
            else if (updatedUserAc.UserGroupIdList.Count == 0)
            {
                return Ok(new { Message = "Please select user role", HasError = true });
            }
            else if (updatedUserAc.InstituteId == 0)
            {
                return Ok(new { Message = "User's Institute can't be null or empty", HasError = true });
            }
            else
            {
                if ((await _userManagementRepository.GetUserByIdAsync(id)) == null)
                {
                    return Ok(new { Message = "Please make sure the user exists", HasError = true });
                }

                ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
                await _userManagementRepository.UpdateUserAsync(id, updatedUserAc, currentUser);
                return Ok(new { Message = "User has been updated successfully" });
            }
        }

        /// <summary>
        /// Method for fetching the list of all institutes and roles while adding/updating a user
        /// </summary>
        /// <returns></returns>
        [HttpGet("institutes/usergroups/all")]
        public async Task<IActionResult> GetInstitutesAndUserGroupsListAsync()
        {
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(new
            {
                Institutes = (await _instituteManagementRepository.GetAllLoggedInUserInstitutesAsync(currentUser)),
                UserGroups = (await _userGroupManagementRepository.GetAllUserGroupsAsync(currentUser))
            });
        }

        /// <summary>
        /// Method for fetching the profile details of the currently logged in user
        /// </summary>
        /// <returns></returns>
        [HttpGet("profile")]
        public async Task<IActionResult> GetLoggedInUserProfileDetails()
        {
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _userManagementRepository.GetUserByIdAsync(currentUser.Id));
        }

        /// <summary>
        /// Method for updating the details of logged in user
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedUserAc"></param>
        /// <returns></returns>
        [HttpPut("profile/update")]
        public async Task<IActionResult> UpdateLoggedInUserProfileDetails([FromBody] UpdateUserAc updatedUserAc)
        {
            if (string.IsNullOrEmpty(updatedUserAc.Name))
            {
                return Ok(new { Message = "Name can't be null or empty", HasError = true });
            }
            else
            {
                ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
                await _userManagementRepository.UpdateLoggedInUserProfileDetails(updatedUserAc, currentUser);
                return Ok(new { Message = "Profile has been updated successfully" });
            }
        }

        /// <summary>
        /// Method for fetching the dashboard details for logged in non-admin users - RS
        /// </summary>
        /// <returns></returns>
        [HttpGet("dashboard/academicyear/{academicYearId}")]
        public async Task<IActionResult> GetLoggedInUserDashboard(int academicYearId)
        {
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _userManagementRepository.GetLoggedInUserDashboard(currentUser, academicYearId));
        }

        [HttpGet("selectacademicyear/{academicYearId}")]
        public async Task<IActionResult> AddorUpdateSelectedAcademicYearAsync(int academicYearId)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(user.Id, true);
            if (await _iMSDbContext.InstituteAcademicYears.AnyAsync(x => x.Id == academicYearId && x.InstituteId == instituteId))
            {
                var selected = await _iMSDbContext.SelectedAcademicYears.FirstOrDefaultAsync(x => x.UserId == user.Id && x.AcademicYear.InstituteId
                == instituteId);
                if(selected == null)
                {
                    selected = new SelectedAcademicYear()
                    {
                        AcademicYearId = academicYearId,
                        CreatedOn = DateTime.UtcNow,
                        UserId = user.Id
                    };
                    _iMSDbContext.SelectedAcademicYears.Add(selected);
                }
                else
                {
                    selected.AcademicYearId = academicYearId;
                    _iMSDbContext.SelectedAcademicYears.Update(selected);
                }
                await _iMSDbContext.SaveChangesAsync();
                return Ok();
            }
            else
                return Ok(new { Message = "Academic year not found" });
        }

        [HttpGet("selectacademicyear")]
        public async Task<IActionResult> GetSelectedAcademicYearAsync()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            Console.WriteLine(user);
            var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(user.Id, true);
            Console.WriteLine(instituteId);
            var selected = await _iMSDbContext.SelectedAcademicYears.Include(s=>s.AcademicYear).FirstOrDefaultAsync(x => x.UserId == user.Id 
            && x.AcademicYear.InstituteId == instituteId);
            return Ok(selected);
        }
        #endregion
    }
}
