using IMS.Core.ActionFilter;
using IMS.DomainModel.ApplicationClasses.CasteManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Repository.CasteManagement;
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
    public class CasteManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly ICasteManagementRepository _casteManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public CasteManagementController(ICasteManagementRepository casteManagementRepository, IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _casteManagementRepository = casteManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddCasteAsync([FromBody]AddCasteManagementAc addCasteManagement)
        {
            if (string.IsNullOrEmpty(addCasteManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Caste name can't be null or empty" });
            else if (string.IsNullOrEmpty(addCasteManagement.Code.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Caste code can't be null or empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                return Ok(await _casteManagementRepository.AddCasteAsync(addCasteManagement, loggedInUserInstituteId));
            }
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllCasteAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _casteManagementRepository.GetAllCasteAsync(loggedInUserInstituteId));
        }

        [HttpGet("{casteId}")]
        public async Task<IActionResult> GetCasteDetailByIdAsync(int casteId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var Caste = await _iMSDbContext.Castes.FirstOrDefaultAsync(x => x.Id == casteId && x.InstituteId == loggedInUserInstituteId);
            if (Caste != null)
                return Ok(Caste);
            else
                return Ok(new { Message = "Caste not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateCasteAsync([FromBody]UpdateCasteManagementAc updateCasteManagement)
        {
            if (string.IsNullOrEmpty(updateCasteManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Caste name can't be null or empty" });
            else if (string.IsNullOrEmpty(updateCasteManagement.Code.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Caste code can't be null or empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.Castes.AnyAsync(x => x.Id == updateCasteManagement.CasteId && x.InstituteId == loggedInUserInstituteId))
                {
                    return Ok(await _casteManagementRepository.UpdateCasteAsync(updateCasteManagement, loggedInUserInstituteId));
                }
                else
                    return Ok(new SharedLookUpResponse { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Caste not found" });
            }
        }
        #endregion
    }
}
