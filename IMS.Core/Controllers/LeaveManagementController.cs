using IMS.DomainModel.ApplicationClasses.LeaveManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Repository.LeaveManagement;
using IMS.Repository.NotificationManagement;
using IMS.Repository.TemplateManagement;
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
    public class LeaveManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly ILeaveManagementRepository _leaveManagementRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMSDbContext _iMSDbContext;
        private readonly ITemplateManagementRepository _templateManagementRepository;
        private readonly INotificationManagementRepository _notificationManagementRepository;
        #endregion

        #region Constructor
        public LeaveManagementController(ILeaveManagementRepository leaveManagementRepository, UserManager<ApplicationUser> userManager,
            IMSDbContext iMSDbContext, IInstituteUserMappingHelperService instituteUserMappingHelperService,
            ITemplateManagementRepository templateManagementRepository,
            INotificationManagementRepository notificationManagementRepository) : base(instituteUserMappingHelperService)
        {
            _leaveManagementRepository = leaveManagementRepository;
            _userManager = userManager;
            _iMSDbContext = iMSDbContext;
            _templateManagementRepository = templateManagementRepository;
            _notificationManagementRepository = notificationManagementRepository;
        }
        #endregion

        #region Public Method(s)
        #region Student
        [HttpPost("student")]
        public async Task<IActionResult> AddStudentLeaveAsync([FromBody]AddStudentLeaveAc addStudentLeave)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _leaveManagementRepository.AddStudentLeaveAsync(addStudentLeave, instituteId, currentUser));
        }

        [HttpGet("student")]
        public async Task<IActionResult> GetStudentLeavesAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            var classes = await _iMSDbContext.InstituteClasses.Where(m => m.InstituteId == instituteId).ToListAsync();
            var leaveTypes = await _iMSDbContext.LeaveTypes.Include(s => s.LeaveAssignedTos).Where(m => m.InstituteId == instituteId).ToListAsync();
            return Ok(new { Leaves = await _leaveManagementRepository.GetStudentLeavesAsync(currentUser), classes, leaveTypes });
        }

        [HttpGet("student/{leaveId}")]
        public async Task<IActionResult> GetStudentLeaveAsync(int leaveId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var leave = await _iMSDbContext.StudentLeaves.Include(s => s.ApprovedBy).Include(s => s.LeaveStatus).Include(s => s.Student)
                .Include(s => s.Student).FirstOrDefaultAsync(x => x.Student.InstituteId == instituteId && x.Id == leaveId);
            return Ok(leave);
        }

        [HttpPut("student")]
        public async Task<IActionResult> UpdateStudentLeaveAsync([FromBody]UpdateStudentLeaveAc updateStudentLeave)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _leaveManagementRepository.UpdateStudentLeaveAsync(updateStudentLeave, instituteId, currentUser));
        }

        [HttpGet("student/initialdata")]
        public async Task<IActionResult> GetInitialDataForStudentLeaveAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var userId = (await _userManager.FindByNameAsync(User.Identity.Name)).Id;
            var student = await _iMSDbContext.StudentBasicInformation.FirstOrDefaultAsync(x => x.UserId == userId && x.InstituteId == instituteId);
            var classes = await _iMSDbContext.InstituteClasses.Include(s => s.ClassTeacher).Where(m => m.InstituteId == instituteId).ToListAsync();
            var students = await _iMSDbContext.StudentBasicInformation.Where(m => m.InstituteId == instituteId).ToListAsync();
            var leaveTypes = await _iMSDbContext.LeaveTypes.Include(s => s.LeaveAssignedTos).Where(m => m.InstituteId == instituteId).ToListAsync();
            var leaveStatuses = await _iMSDbContext.LeaveStatuses.Where(m => m.InstituteId == instituteId).ToListAsync();
            var staffs = await _iMSDbContext.StaffBasicPersonalInformation.Where(m => m.InstituteId == instituteId).ToListAsync();
            var academicYear = await _iMSDbContext.SelectedAcademicYears.FirstOrDefaultAsync(x => x.UserId == userId &&
                    x.AcademicYear.InstituteId == instituteId);
            if (academicYear != null)
                students = students.Where(x => x.CurrentAcademicYearId == academicYear.AcademicYearId).ToList();
            return Ok(new { classes, students, leaveTypes, leaveStatuses, staffs, student });
        }

        [HttpPost("student/leavecount")]
        public async Task<IActionResult> GetStudentAlreadyTakenLeaveCountAsync([FromBody]StudentLeaveCountAc studentLeaveCount)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var currentAcademicYear = await _iMSDbContext.InstituteAcademicYears.FirstOrDefaultAsync(x => x.IsActive && x.InstituteId == instituteId);
            if (currentAcademicYear != null)
            {
                var approved = await _iMSDbContext.LeaveStatuses.FirstAsync(x => x.Code == "Approve" && x.InstituteId == instituteId);
                var leaves = await _iMSDbContext.StudentLeaves.Where(x => x.LeaveTypeId == studentLeaveCount.LeaveTypeId
                && x.AcademicYearId == currentAcademicYear.Id && x.StudentId == studentLeaveCount.StudentId
                && x.StatusId == approved.Id).ToListAsync();
                double count = 0;
                foreach (var leave in leaves)
                {
                    count += leave.EndDate.Date.Subtract(leave.FromDate.Date).TotalDays;
                }
                return Ok(new { Count = count });
            }
            else
                return Ok(new { Count = 0 });
        }

        [HttpPost("student/approveandreject")]
        public async Task<IActionResult> ApproveAndRejectStudentLeaveAsync([FromBody]ApproveAndRejectStudentLeaveAc approveAndReject)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            var leave = await _iMSDbContext.StudentLeaves.FirstOrDefaultAsync(x => x.Id == approveAndReject.LeaveId && x.Student.InstituteId == instituteId);
            if (leave == null)
                return Ok(new { Message = "Leave not found" });
            else
            {
                var status = await _iMSDbContext.LeaveStatuses.FirstOrDefaultAsync(x => x.Code.ToLowerInvariant() == approveAndReject.Type.ToLowerInvariant() && x.InstituteId == instituteId);
                if (status == null)
                    return Ok(new { Message = "Leave status not found" });
                else
                {
                    leave.StatusId = status.Id;
                    _iMSDbContext.StudentLeaves.Update(leave);
                    await _iMSDbContext.SaveChangesAsync();

                    #region Send Mail/Message
                    leave = await _iMSDbContext.StudentLeaves.Include(s => s.Student).Include(s => s.LeaveType)
                        .Include(s => s.LeaveStatus).Include(s => s.ApprovedBy).FirstAsync(x => x.Id == leave.Id);
                    await _templateManagementRepository.TriggerMailOrMessageAsync(instituteId, TemplateTypeEnum.StudentLeaveApproveReject,
                        TemplateFormatEnum.Email, leave);
                    await _templateManagementRepository.TriggerMailOrMessageAsync(instituteId, TemplateTypeEnum.StudentLeaveApproveReject,
                        TemplateFormatEnum.Sms, leave);
                    #endregion

                    await _leaveManagementRepository.SendBellNotificationsForStudentLeaveApproveRejectAsync(currentUser, leave, instituteId);

                    return Ok(new { Message = "Leave updated" });
                }
            }
        }

        [HttpGet("student/bystudentid")]
        public async Task<IActionResult> GetStudentLeavesPersonalAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var studentId = (await _iMSDbContext.StudentBasicInformation.FirstAsync(x => x.UserId == user.Id && x.InstituteId == instituteId)).Id;
            var leaveTypes = await _iMSDbContext.LeaveTypes.Include(s => s.LeaveAssignedTos).Where(m => m.InstituteId == instituteId).ToListAsync();
            var leaves = await _leaveManagementRepository.GetStudentLeavesAsync(user);
            leaves = leaves.Where(x => x.StudentId == studentId).ToList();
            return Ok(new { leaves, leaveTypes });
        }
        #endregion

        #region Staff
        [HttpPost("staff")]
        public async Task<IActionResult> AddStaffLeaveAsync([FromBody]AddStaffLeaveAc addStaffLeave)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _leaveManagementRepository.AddStaffLeaveAsync(addStaffLeave, instituteId, currentUser));
        }

        [HttpGet("staff")]
        public async Task<IActionResult> GetStaffLeavesAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            var leaveTypes = await _iMSDbContext.LeaveTypes.Include(s => s.LeaveAssignedTos).Where(m => m.InstituteId == instituteId).ToListAsync();
            return Ok(new { Leaves = await _leaveManagementRepository.GetStaffLeavesAsync(currentUser), leaveTypes });
        }

        [HttpGet("staff/{leaveId}")]
        public async Task<IActionResult> GetStaffLeaveAsync(int leaveId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var leave = await _iMSDbContext.StaffLeaves.Include(s => s.ApprovedBy).Include(s => s.LeaveStatus).Include(s => s.Staff)
                .Include(s => s.Staff).FirstOrDefaultAsync(x => x.Staff.InstituteId == instituteId && x.Id == leaveId);
            return Ok(leave);
        }

        [HttpPut("staff")]
        public async Task<IActionResult> UpdateStaffLeaveAsync([FromBody]UpdateStaffLeaveAc updateStaffLeave)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _leaveManagementRepository.UpdateStaffLeaveAsync(updateStaffLeave, instituteId, currentUser));
        }

        [HttpGet("staff/initialdata")]
        public async Task<IActionResult> GetInitialDataForStaffLeaveAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var userId = (await _userManager.FindByNameAsync(User.Identity.Name)).Id;
            var staff = await _iMSDbContext.StaffBasicPersonalInformation.FirstOrDefaultAsync(x => x.UserId == userId && x.InstituteId == instituteId);
            var staffs = await _iMSDbContext.StaffBasicPersonalInformation.Where(m => m.InstituteId == instituteId).ToListAsync();
            var leaveTypes = await _iMSDbContext.LeaveTypes.Include(s => s.LeaveAssignedTos).Where(m => m.InstituteId == instituteId).ToListAsync();
            var leaveStatuses = await _iMSDbContext.LeaveStatuses.Where(m => m.InstituteId == instituteId).ToListAsync();
            var adminRole = await _iMSDbContext.Roles.FirstAsync(x => x.Name == "Admin");
            var adminIds = await _iMSDbContext.UserRoles.Where(x => x.RoleId == adminRole.Id).Select(s => s.UserId).ToListAsync();
            var admin = (await _iMSDbContext.UserInstituteMappings.Include(s => s.User).Where(x => adminIds.Contains(x.UserId)
              && x.InstituteId == instituteId).FirstAsync()).User;
            var users = await _iMSDbContext.Users.ToListAsync();
            return Ok(new { staffs, leaveTypes, leaveStatuses, admin, users, staff });
        }

        [HttpPost("staff/leavecount")]
        public async Task<IActionResult> GetStaffAlreadyTakenLeaveCountAsync([FromBody]StaffLeaveCountAc staffLeaveCount)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var currentAcademicYear = await _iMSDbContext.InstituteAcademicYears.FirstOrDefaultAsync(x => x.IsActive && x.InstituteId == instituteId);
            if (currentAcademicYear != null)
            {
                var approved = await _iMSDbContext.LeaveStatuses.FirstAsync(x => x.Code == "Approve" && x.InstituteId == instituteId);
                var leaves = await _iMSDbContext.StaffLeaves.Where(x => x.LeaveTypeId == staffLeaveCount.LeaveTypeId
                && x.AcademicYearId == currentAcademicYear.Id && x.StaffId == staffLeaveCount.StaffId
                && x.StatusId == approved.Id).ToListAsync();
                double count = 0;
                foreach (var leave in leaves)
                {
                    count += leave.EndDate.Date.Subtract(leave.FromDate.Date).TotalDays;
                }
                return Ok(new { Count = count });
            }
            else
                return Ok(new { Count = 0 });
        }

        [HttpPost("staff/approveandreject")]
        public async Task<IActionResult> ApproveAndRejectStaffLeaveAsync([FromBody]ApproveAndRejectStudentLeaveAc approveAndReject)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            var leave = await _iMSDbContext.StaffLeaves.FirstOrDefaultAsync(x => x.Id == approveAndReject.LeaveId && x.Staff.InstituteId == instituteId);
            if (leave == null)
                return Ok(new { Message = "Leave not found" });
            else
            {
                var status = await _iMSDbContext.LeaveStatuses.FirstOrDefaultAsync(x => x.Code.ToLowerInvariant() == approveAndReject.Type.ToLowerInvariant() && x.InstituteId == instituteId);
                if (status == null)
                    return Ok(new { Message = "Leave status not found" });
                else
                {
                    leave.StatusId = status.Id;
                    _iMSDbContext.StaffLeaves.Update(leave);
                    await _iMSDbContext.SaveChangesAsync();

                    #region Send Mail/Message
                    leave = await _iMSDbContext.StaffLeaves.Include(s => s.Staff).ThenInclude(e => e.User).Include(s => s.LeaveType)
                        .Include(s => s.LeaveStatus).Include(s => s.ApprovedBy).FirstAsync(x => x.Id == leave.Id);
                    await _templateManagementRepository.TriggerMailOrMessageAsync(instituteId, TemplateTypeEnum.StaffLeaveApproveReject,
                        TemplateFormatEnum.Email, leave);
                    await _templateManagementRepository.TriggerMailOrMessageAsync(instituteId, TemplateTypeEnum.StaffLeaveApproveReject,
                        TemplateFormatEnum.Sms, leave);
                    #endregion

                    await _leaveManagementRepository.SendBellNotificationForStaffLeaveApproveRejectAsync(currentUser, leave, instituteId);
                    
                    return Ok(new { Message = "Leave updated" });
                }
            }
        }

        [HttpGet("staff/bystaffid")]
        public async Task<IActionResult> GetStaffLeavesPersonalAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var staffId = (await _iMSDbContext.StaffBasicPersonalInformation.FirstAsync(x => x.UserId == user.Id && x.InstituteId == instituteId)).Id;
            var leaveTypes = await _iMSDbContext.LeaveTypes.Include(s => s.LeaveAssignedTos).Where(m => m.InstituteId == instituteId).ToListAsync();
            var leaves = await _leaveManagementRepository.GetStaffLeavesAsync(user);
            leaves = leaves.Where(x => x.StaffId == staffId).ToList();
            return Ok(new { leaves, leaveTypes, staffId });
        }

        [HttpGet("student/bystaffid/{staffId}")]
        public async Task<IActionResult> GetStudentPendingLeavesByStaffIdAsync(int staffId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var pending = await _iMSDbContext.LeaveStatuses.FirstAsync(x => x.Code == "Pending" && x.InstituteId == instituteId);
            var academicYear = await _iMSDbContext.InstituteAcademicYears.FirstAsync(x => x.InstituteId == instituteId && x.IsActive);
            var leaves = await _iMSDbContext.StudentLeaves.Include(s => s.LeaveStatus).Include(s => s.Student)
                .Include(s => s.LeaveType).Where(x => x.StatusId == pending.Id && x.Student.InstituteId == instituteId
                && x.ApprovedById == staffId && x.AcademicYearId == academicYear.Id).ToListAsync();
            return Ok(leaves);
        }
        #endregion
        #endregion
    }
}
