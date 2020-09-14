using IMS.DomainModel.Models;
using IMS.Repository.NotificationManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class NotificationManagementController : BaseController
    {
        #region Private variables

        private const string BaseUrl = "api/[controller]";
        private readonly INotificationManagementRepository _notificationManagementRepository;
        private readonly UserManager<ApplicationUser> _userManager;

        #endregion

        #region Constructor

        public NotificationManagementController(IInstituteUserMappingHelperService instituteUserMappingHelperService,
            INotificationManagementRepository notificationManagementRepository,
            UserManager<ApplicationUser> userManager)
            : base(instituteUserMappingHelperService)
        {
            _notificationManagementRepository = notificationManagementRepository;
            _userManager = userManager;
        }

        #endregion

        #region Public methods

        [HttpGet("current/unread")]
        public async Task<IActionResult> GetUnreadNotificationsForCurrentUserAsync()
        {
            string currentUserId = (await _userManager.FindByNameAsync(User.Identity.Name)).Id;
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _notificationManagementRepository.GetNotificationsForCurrentUserAsync(currentUserId, currentUserInstituteId, true));
        }

        [HttpGet("current/all")]
        public async Task<IActionResult> GetAllNotificationsForCurrentUserAsync()
        {
            string currentUserId = (await _userManager.FindByNameAsync(User.Identity.Name)).Id;
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _notificationManagementRepository.GetNotificationsForCurrentUserAsync(currentUserId, currentUserInstituteId, false));
        }

        [HttpGet("current/markread/{notificationId}")]
        public async Task<IActionResult> MarkNotificationAsReadByIdAsync(int notificationId)
        {
            string currentUserId = (await _userManager.FindByNameAsync(User.Identity.Name)).Id;
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _notificationManagementRepository.MarkNotificationAsReadByIdAsync(notificationId, currentUserId, currentUserInstituteId));
        }

        [HttpGet("current/markread/all")]
        public async Task<IActionResult> MarkAllNotificationsAsReadAsync()
        {
            string currentUserId = (await _userManager.FindByNameAsync(User.Identity.Name)).Id;
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _notificationManagementRepository.MarkAllNotificationsAsReadAsync(currentUserId, currentUserInstituteId));
        }

        #endregion
    }
}
