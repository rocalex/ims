using IMS.DomainModel.ApplicationClasses.MaritalStatusManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.MaritalStatusManagement;
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
    public class MaritalStatusManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly IMaritalStatusManagementRepository _maritalStatusManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public MaritalStatusManagementController(IMaritalStatusManagementRepository maritalStatusManagementRepository, IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _maritalStatusManagementRepository = maritalStatusManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddMaritalStatusAsync([FromBody]AddMaritalStatusManagementAc addMaritalStatusManagement)
        {
            if (string.IsNullOrEmpty(addMaritalStatusManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Marital status name can't be empty" });
            else if (string.IsNullOrEmpty(addMaritalStatusManagement.Code.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Marital status name can't be empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                return Ok(await _maritalStatusManagementRepository.AddMaritalStatusAsync(addMaritalStatusManagement, loggedInUserInstituteId));
            }
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllMaritalStatusAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _maritalStatusManagementRepository.GetAllMaritalStatusAsync(loggedInUserInstituteId));
        }

        [HttpGet("{maritalStatusId}")]
        public async Task<IActionResult> GetMaritalStatusDetailByIdAsync(int maritalStatusId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var MaritalStatus = await _iMSDbContext.MaritalStatuses.FirstOrDefaultAsync(x => x.Id == maritalStatusId && x.InstituteId == loggedInUserInstituteId);
            if (MaritalStatus != null)
                return Ok(MaritalStatus);
            else
                return Ok(new { Message = "Marital status not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateMaritalStatusAsync([FromBody]UpdateMaritalStatusManagementAc updateMaritalStatusManagement)
        {
            if (string.IsNullOrEmpty(updateMaritalStatusManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Marital status name can't be empty" });
            else if (string.IsNullOrEmpty(updateMaritalStatusManagement.Code.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Marital status name can't be empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.MaritalStatuses.AnyAsync(x => x.Id == updateMaritalStatusManagement.MaritalStatusId && x.InstituteId == loggedInUserInstituteId))
                {
                    return Ok(await _maritalStatusManagementRepository.UpdateMaritalStatusAsync(updateMaritalStatusManagement, loggedInUserInstituteId));
                }
                else
                    return Ok(new SharedLookUpResponse { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Marital status not found" });
            }
        }
        #endregion
    }
}
