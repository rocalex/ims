using IMS.DomainModel.ApplicationClasses.EventManagement;
using IMS.DomainModel.Models;
using IMS.Repository.EventManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class EventManagementController : BaseController
    {
        #region Private variables

        private const string BaseUrl = "api/[controller]";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEventManagementRepository _eventManagementRepository;

        #endregion

        #region Constructor

        public EventManagementController(UserManager<ApplicationUser> userManager,
            IInstituteUserMappingHelperService instituteUserMappingHelperService,
            IEventManagementRepository eventManagementRepository)
            : base(instituteUserMappingHelperService)
        {
            _userManager = userManager;
            _eventManagementRepository = eventManagementRepository;
        }

        #endregion

        #region Public methods

        #region Event Info

        [HttpGet("info")]
        public async Task<IActionResult> GetEventInfoListAsync()
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _eventManagementRepository.GetEventInfoListAsync(currentUserInstituteId));
        }

        [HttpGet("info/{eventInfoId}")]
        public async Task<IActionResult> GetEventInfoByIdAsync(int eventInfoId)
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _eventManagementRepository.GetEventInfoByIdAsync(eventInfoId, currentUserInstituteId));
        }

        [HttpPost("info")]
        public async Task<IActionResult> AddNewEventInfoAsync([FromBody] EventInfo addedEventInfo)
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _eventManagementRepository.AddNewEventInfoAsync(addedEventInfo, currentUserInstituteId, currentUser));
        }

        [HttpPut("info")]
        public async Task<IActionResult> UpdateEventInfoAsync([FromBody] EventInfo updatedEventInfo)
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _eventManagementRepository.UpdateEventInfoAsync(updatedEventInfo, currentUserInstituteId));
        }

        #endregion

        #region Report

        [HttpPost("report")]
        public async Task<FileResult> GenerateEventReportAsync([FromBody] EventManagementReportQueryAc eventManagementReportQueryAc)
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            EventManagementReportResponseAc eventManagementReportResponse = await _eventManagementRepository.GenerateEventReportAsync(eventManagementReportQueryAc, currentUserInstituteId);
            return File(eventManagementReportResponse.FileByteArray, eventManagementReportResponse.ResponseType, eventManagementReportResponse.FileName);
        }

        #endregion

        #endregion
    }
}
