using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.TeachingStaffManagementManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.TeachingStaffManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class TeachingStaffManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly ITeachingStaffManagementRepository _teachingStaffManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public TeachingStaffManagementController(ITeachingStaffManagementRepository teachingStaffManagementRepository, IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _teachingStaffManagementRepository = teachingStaffManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddTeachingStaffAsync([FromBody]AddTeachingStaffManagementAc addTeachingStaffManagement)
        {
            if (string.IsNullOrEmpty(addTeachingStaffManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Teaching staff name can't be empty" });
            else if (string.IsNullOrEmpty(addTeachingStaffManagement.Code.Trim()))
                return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Teaching staff name can't be empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                return Ok(await _teachingStaffManagementRepository.AddTeachingStaffAsync(addTeachingStaffManagement, loggedInUserInstituteId));
            }
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllTeachingStaffAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _teachingStaffManagementRepository.GetAllTeachingStaffsAsync(loggedInUserInstituteId));
        }

        [HttpGet("{TeachingStaffId}")]
        public async Task<IActionResult> GetTeachingStaffDetailByIdAsync(int TeachingStaffId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var TeachingStaff = await _iMSDbContext.TeachingStaffs.FirstOrDefaultAsync(x => x.Id == TeachingStaffId && x.InstituteId == loggedInUserInstituteId);
            if (TeachingStaff != null)
                return Ok(TeachingStaff);
            else
                return Ok(new { Message = "Teaching staff not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateTeachingStaffAsync([FromBody]UpdateTeachingStaffManagementAc updateTeachingStaffManagement)
        {
            if (string.IsNullOrEmpty(updateTeachingStaffManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Teaching staff name can't be empty" });
            else if (string.IsNullOrEmpty(updateTeachingStaffManagement.Code.Trim()))
                return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Teaching staff name can't be empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.TeachingStaffs.AnyAsync(x => x.Id == updateTeachingStaffManagement.TeachingStaffId && x.InstituteId == loggedInUserInstituteId))
                {
                    return Ok(await _teachingStaffManagementRepository.UpdateTeachingStaffAsync(updateTeachingStaffManagement, loggedInUserInstituteId));
                }
                else
                    return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Teaching staff not found" });
            }
        }
        #endregion
    }
}
