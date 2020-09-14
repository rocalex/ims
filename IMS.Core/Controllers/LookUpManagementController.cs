using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.LookUpManagement;
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
    public class LookUpManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly ILookUpManagementRepository _lookUpManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public LookUpManagementController(ILookUpManagementRepository lookUpManagementRepository, IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _lookUpManagementRepository = lookUpManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddLookUpMappingAsync([FromBody]AddLookUpManagementAc addLookUpManagement)
        {
            if (string.IsNullOrEmpty(addLookUpManagement.Name.Trim()))
                return Ok(new LookUpManagementResponse { ErrorType = LookUpManagementResponseType.Name, HasError = true, Message = "Look up name can't be null or empty" });
            else if (string.IsNullOrEmpty(addLookUpManagement.Code.Trim()))
                return Ok(new LookUpManagementResponse { ErrorType = LookUpManagementResponseType.Code, HasError = true, Message = "Look up code name can't be null or empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.LookUps.AnyAsync(x => x.InstituteId == loggedInUserInstituteId))
                    return Ok(await _lookUpManagementRepository.AddLookUpMappingAsync(addLookUpManagement, loggedInUserInstituteId));
                else
                    return Ok(new LookUpManagementResponse() { ErrorType = LookUpManagementResponseType.Other, HasError = true, Message = "Look up not found" });
            }
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllLookUpMappingAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _lookUpManagementRepository.GetAllLookUpMappingAsync(loggedInUserInstituteId));
        }

        [HttpGet("{lookUpId}")]
        public async Task<IActionResult> GetLookUpMappingDetailByIdAsync(int lookUpId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var LookUp = await _iMSDbContext.LookUpMappings.FirstOrDefaultAsync(x => x.Id == lookUpId && x.LookUp.InstituteId == loggedInUserInstituteId);
            if (LookUp != null)
                return Ok(LookUp);
            else
                return Ok(new { Message = "Look up not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateLookUpMappingAsync([FromBody]UpdateLookUpManagementAc updateLookUpManagement)
        {
            if (string.IsNullOrEmpty(updateLookUpManagement.Name.Trim()))
                return Ok(new LookUpManagementResponse { ErrorType = LookUpManagementResponseType.Name, HasError = true, Message = "Look up name can't be null or empty" });
            else if (string.IsNullOrEmpty(updateLookUpManagement.Code.Trim()))
                return Ok(new LookUpManagementResponse { ErrorType = LookUpManagementResponseType.Code, HasError = true, Message = "Look up code name can't be null or empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.LookUps.AnyAsync(x => x.InstituteId == loggedInUserInstituteId))
                {
                    if (await _iMSDbContext.LookUpMappings.AnyAsync(x => x.Id == updateLookUpManagement.Id && x.LookUp.InstituteId == loggedInUserInstituteId))
                        return Ok(await _lookUpManagementRepository.UpdateLookUpMappingAsync(updateLookUpManagement, loggedInUserInstituteId));
                    else
                        return Ok(new LookUpManagementResponse { ErrorType = LookUpManagementResponseType.Other, HasError = true, Message = "Look up not found" });
                }
                else
                    return Ok(new LookUpManagementResponse() { ErrorType = LookUpManagementResponseType.Other, HasError = true, Message = "Look up not found" });
            }
        }

        [HttpGet("lookups")]
        public async Task<IActionResult> GetAllLookUpsAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _lookUpManagementRepository.GetAllLookUpsAsync(loggedInUserInstituteId));
        }
        #endregion
    }
}
