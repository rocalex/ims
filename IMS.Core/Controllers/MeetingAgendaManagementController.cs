using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.MeetingAgendaManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.MeetingAgendaManagement;
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
    public class MeetingAgendaManagementController : BaseController
    {
        #region Private variables

        private const string BaseUrl = "api/[controller]";
        private readonly IMeetingAgendaManagementRepository _meetingAgendaManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;

        #endregion

        #region Constructor

        public MeetingAgendaManagementController(IMeetingAgendaManagementRepository meetingAgendaManagementRepository,
            IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager, 
            IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _meetingAgendaManagementRepository = meetingAgendaManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }

        #endregion

        #region Public methods

        [HttpGet("")]
        public async Task<IActionResult> GetAllMeetingAgendasAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _meetingAgendaManagementRepository.GetAllMeetingAgendasAsync(loggedInUserInstituteId));
        }

        [HttpGet("{meetingId}")]
        public async Task<IActionResult> GetMeetingAgendaByIdAsync(int meetingId)
        {
            int loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            MeetingAgenda meeting = await _iMSDbContext.MeetingAgendas.FirstOrDefaultAsync(x => x.Id == meetingId && x.InstituteId == loggedInUserInstituteId);

            if (meeting != null)
                return Ok(meeting);
            else
                return Ok(new { Message = "Meeting Agenda not found" });
        }

        [HttpPost("")]
        public async Task<IActionResult> AddMeetingAgendaAsync([FromBody]AddMeetingAgendaAc addMeetingAgenda)
        {
            if (string.IsNullOrEmpty(addMeetingAgenda.Name.Trim()))
                return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Meeting Agenda name can't be empty" });
            else if (string.IsNullOrEmpty(addMeetingAgenda.Code.Trim()))
                return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Meeting Agenda code can't be empty" });
            else
            {
                int loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                return Ok(await _meetingAgendaManagementRepository.AddMeetingAgendaAsync(addMeetingAgenda, loggedInUserInstituteId));
            }
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateMeetingAgendaAsync([FromBody]UpdateMeetingAgendaAc updateMeetingAgenda)
        {
            if (string.IsNullOrEmpty(updateMeetingAgenda.Name.Trim()))
                return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Meeting Agenda name can't be empty" });
            else if (string.IsNullOrEmpty(updateMeetingAgenda.Code.Trim()))
                return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Meeting Agenda code can't be empty" });
            else
            {
                int loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.MeetingAgendas.AnyAsync(x => x.Id == updateMeetingAgenda.MeetingAgendaId && x.InstituteId == loggedInUserInstituteId))
                {
                    return Ok(await _meetingAgendaManagementRepository.UpdateMeetingAgendaAsync(updateMeetingAgenda, loggedInUserInstituteId));
                }
                else
                    return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Meeting Agenda not found" });
            }
        }

        #endregion
    }
}
