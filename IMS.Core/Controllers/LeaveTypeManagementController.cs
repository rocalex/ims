using IMS.DomainModel.ApplicationClasses.LeaveTypeManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.LeaveTypeManagement;
using IMS.Utility.EnumHelper;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class LeaveTypeManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILeaveTypeManagementRepository _leaveTypeManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        #endregion

        #region Constructor
        public LeaveTypeManagementController(UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService
            instituteUserMappingHelperService, ILeaveTypeManagementRepository leaveTypeManagementRepository,
            IMSDbContext iMSDbContext) : base(instituteUserMappingHelperService)
        {
            _userManager = userManager;
            _leaveTypeManagementRepository = leaveTypeManagementRepository;
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddLeaveType([FromBody]AddLeaveTypeManagementAc addLeaveType)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _leaveTypeManagementRepository.AddLeaveType(addLeaveType, user));
        }

        [HttpGet("")]
        public async Task<IActionResult> GetLeaveTypesAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _leaveTypeManagementRepository.GetLeaveTypesAsync(instituteId));
        }

        [HttpGet("{leaveTypeId}")]
        public async Task<IActionResult> GetLeaveTypeAsync(int leaveTypeId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var leaveType = await _iMSDbContext.LeaveTypes.Include(s=>s.LeaveAssignedTos).FirstOrDefaultAsync(x => x.Id == leaveTypeId && x.InstituteId == instituteId);
            leaveType.LeaveAssignedTypeEnumDescription = EnumHelperService.GetDescription(leaveType.LeaveAssignedTypeEnum);
            return Ok(leaveType);
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateLeaveType([FromBody]UpdateLeaveTypeManagementAc updateLeaveType)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _leaveTypeManagementRepository.UpdateLeaveType(updateLeaveType, user));
        }

        [HttpGet("initialdata")]
        public async Task<IActionResult> GetInititalDataAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var users = await _iMSDbContext.UserInstituteMappings.Include(s=>s.User).Where(x=>x.InstituteId == instituteId).Select(s=>s.User).Distinct().ToListAsync();
            var staffs = await _iMSDbContext.StaffBasicPersonalInformation.Where(x => x.InstituteId == instituteId).ToListAsync();
            var students = await _iMSDbContext.StudentBasicInformation.Where(x => x.InstituteId == instituteId).ToListAsync();
            var studentAndStaffId = staffs.Select(x => x.UserId).Distinct().ToList();
            studentAndStaffId = students.Select(x => x.UserId).Distinct().ToList();
            var normalUser = users.Select(x => x.Id).ToList();
            normalUser = normalUser.Except(studentAndStaffId).ToList();
            var staffIds = staffs.Select(x => x.UserId).Distinct().ToList();
            var studentIds = students.Select(x => x.UserId).Distinct().ToList();
            var groupUsers = new { staffs = users.Where(x => staffIds.Contains(x.Id)),
                students = users.Where(x => studentIds.Contains(x.Id)), users = users.Where(x=> normalUser.Contains(x.Id)) };
            return Ok(new { groupUsers });
        }
        #endregion
    }
}
