using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.OccupationManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.OccupationManagement;
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
    public class OccupationManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly IOccupationManagementRepository _occupationManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public OccupationManagementController(IOccupationManagementRepository occupationManagementRepository, IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _occupationManagementRepository = occupationManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddOccupationAsync([FromBody]AddOccupationManagementAc addOccupationManagement)
        {
            if (string.IsNullOrEmpty(addOccupationManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Occupation name can't be empty" });
            else if (string.IsNullOrEmpty(addOccupationManagement.Code.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Occupation code can't be empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                return Ok(await _occupationManagementRepository.AddOccupationAsync(addOccupationManagement, loggedInUserInstituteId));
            }
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllOccupationAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _occupationManagementRepository.GetAllOccupationAsync(loggedInUserInstituteId));
        }

        [HttpGet("{occupationId}")]
        public async Task<IActionResult> GetOccupationDetailByIdAsync(int occupationId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var Occupation = await _iMSDbContext.Occupations.FirstOrDefaultAsync(x => x.Id == occupationId && x.InstituteId == loggedInUserInstituteId);
            if (Occupation != null)
                return Ok(Occupation);
            else
                return Ok(new { Message = "Occupation not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateOccupationAsync([FromBody]UpdateOccupationManagementAc updateOccupationManagement)
        {
            if (string.IsNullOrEmpty(updateOccupationManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Occupation name can't be empty" });
            else if (string.IsNullOrEmpty(updateOccupationManagement.Code.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Occupation code can't be empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.Occupations.AnyAsync(x => x.Id == updateOccupationManagement.OccupationId && x.InstituteId == loggedInUserInstituteId))
                {
                    return Ok(await _occupationManagementRepository.UpdateOccupationAsync(updateOccupationManagement, loggedInUserInstituteId));
                }
                else
                    return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Occupation not found" });
            }
        }
        #endregion
    }
}
