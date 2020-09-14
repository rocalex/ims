using IMS.DomainModel.ApplicationClasses.ActivityStatusManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.ActivityStatusManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route(BaseUrl)]
    public class ActivityStatusManagementController : BaseController
    {
        #region Private variables

        private const string BaseUrl = "api/[controller]";
        private readonly IActivityStatusManagementRepository _activityStatusManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;

        #endregion

        #region Constructor

        public ActivityStatusManagementController(IActivityStatusManagementRepository activityStatusManagementRepository,
            IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager,
            IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _activityStatusManagementRepository = activityStatusManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }

        #endregion

        #region Public methods

        [HttpGet("")]
        public async Task<IActionResult> GetAllActivityStatusAsync()
        {
            int loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _activityStatusManagementRepository.GetAllActivityStatusAsync(loggedInUserInstituteId, currentUser));
        }

        [HttpGet("{activityStatusId}")]
        public async Task<IActionResult> GetActivityStatusByIdAsync(int activityStatusId)
        {
            int loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            ActivityStatus activityStatus = await _iMSDbContext.ActivityStatus.FirstOrDefaultAsync(x => x.Id == activityStatusId && x.InstituteId == loggedInUserInstituteId);

            if (activityStatus != null)
                return Ok(activityStatus);
            else
                return Ok(new { Message = "Activity Status Agenda not found" });
        }

        [HttpPost("")]
        public async Task<IActionResult> AddActivityStatusAsync([FromBody]AddActivityStatusAC addActivityStatus)
        {
            if (string.IsNullOrEmpty(addActivityStatus.Name.Trim()))
                return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Activity Status name can't be empty" });
            else if (string.IsNullOrEmpty(addActivityStatus.Code.Trim()))
                return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Activity Status code can't be empty" });
            else
            {
                int loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                return Ok(await _activityStatusManagementRepository.AddActivityStatusAsync(addActivityStatus, loggedInUserInstituteId));
            }
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateActivityStatusAsync([FromBody]UpdateActivityStatusAC updateActivityStatus)
        {
            if (string.IsNullOrEmpty(updateActivityStatus.Name.Trim()))
                return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Activity Status name can't be empty" });
            else if (string.IsNullOrEmpty(updateActivityStatus.Code.Trim()))
                return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Activity Status code can't be empty" });
            else
            {
                int loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.ActivityStatus.AnyAsync(x => x.Id == updateActivityStatus.ActivityStatusId && x.InstituteId == loggedInUserInstituteId))
                {
                    return Ok(await _activityStatusManagementRepository.UpdateActivityStatusAsync(updateActivityStatus, loggedInUserInstituteId));
                }
                else
                    return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Activity Status not found" });
            }
        }

        #endregion
    }
}
