using IMS.Core.ActionFilter;
using IMS.DomainModel.ApplicationClasses.BloodGroupManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Repository.BloodGroupManagement;
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
    public class BloodGroupManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly IBloodGroupManagementRepository _bloodGroupManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public BloodGroupManagementController(IBloodGroupManagementRepository bloodGroupManagementRepository, IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _bloodGroupManagementRepository = bloodGroupManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddBloodGroupAsync([FromBody]AddBloodGroupManagementAc addBloodGroupManagement)
        {
            if (string.IsNullOrEmpty(addBloodGroupManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Name, Message = "Blood group name can't be null or empty" });
            else if (string.IsNullOrEmpty(addBloodGroupManagement.Code.Trim()))
                return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Name, Message = "Blood group code can't be null or empty" });
            else
                return Ok(await _bloodGroupManagementRepository.AddBloodGroupAsync(addBloodGroupManagement, await GetUserCurrentSelectedInstituteIdAsync()));
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllBloodGroupAsync()
        {
            return Ok(await _bloodGroupManagementRepository.GetAllBloodGroupAsync(await GetUserCurrentSelectedInstituteIdAsync()));
        }

        [HttpGet("{bloodGroupId}")]
        public async Task<IActionResult> GetBloodGroupDetailByIdAsync(int bloodGroupId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var BloodGroup = await _iMSDbContext.BloodGroups.FirstOrDefaultAsync(x => x.Id == bloodGroupId && x.InstituteId == instituteId);
            if (BloodGroup != null)
                return Ok(BloodGroup);
            else
                return Ok(new { Message = "Blood group not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateBloodGroupAsync([FromBody]UpdateBloodGroupManagementAc updateBloodGroupManagement)
        {
            if (string.IsNullOrEmpty(updateBloodGroupManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Blood group name can't be null or empty" });
            else if (string.IsNullOrEmpty(updateBloodGroupManagement.Code.Trim()))
                return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Name, Message = "Blood group code can't be null or empty" });
            else
            {
                var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.BloodGroups.AnyAsync(x => x.Id == updateBloodGroupManagement.BloodGroupId && x.InstituteId == instituteId))
                {
                    return Ok(await _bloodGroupManagementRepository.UpdateBloodGroupAsync(updateBloodGroupManagement, await GetUserCurrentSelectedInstituteIdAsync()));
                }
                else
                    return Ok(new SharedLookUpResponse { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Blood group not found" });
            }
        }
        #endregion
    }
}
