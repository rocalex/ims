using IMS.DomainModel.ApplicationClasses.InstituteLanguageMasterManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.InstituteLanguageMasterManagement;
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
    public class InstituteLanguageManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly IInstituteLanguageMasterManagementRepository _instituteLanguageMasterManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public InstituteLanguageManagementController(IInstituteLanguageMasterManagementRepository instituteLanguageMasterManagementRepository, IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _instituteLanguageMasterManagementRepository = instituteLanguageMasterManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddInstituteLanguageMasterAsync([FromBody]AddInstituteLanguageMasterManagementAc addInstituteLanguageMasterManagement)
        {
            if (string.IsNullOrEmpty(addInstituteLanguageMasterManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Name, Message = "Language name can't be null or empty" });
            else if (string.IsNullOrEmpty(addInstituteLanguageMasterManagement.Code.Trim()))
                return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Name, Message = "Language code can't be null or empty" });
            else
                return Ok(await _instituteLanguageMasterManagementRepository.AddInstituteLanguageMasterAsync(addInstituteLanguageMasterManagement, await GetUserCurrentSelectedInstituteIdAsync()));
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllInstituteLanguageMasterAsync()
        {
            return Ok(await _instituteLanguageMasterManagementRepository.GetAllInstituteLanguageMasterAsync(await GetUserCurrentSelectedInstituteIdAsync()));
        }

        [HttpGet("{instituteLanguageMasterId}")]
        public async Task<IActionResult> GetInstituteLanguageMasterDetailByIdAsync(int instituteLanguageMasterId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var InstituteLanguageMaster = await _iMSDbContext.InstituteLanguageMasters.FirstOrDefaultAsync(x => x.Id == instituteLanguageMasterId && x.InstituteId == instituteId);
            if (InstituteLanguageMaster != null)
                return Ok(InstituteLanguageMaster);
            else
                return Ok(new { Message = "Language not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateInstituteLanguageMasterAsync([FromBody]UpdateInstituteLanguageMasterManagementAc updateInstituteLanguageMasterManagement)
        {
            if (string.IsNullOrEmpty(updateInstituteLanguageMasterManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Language name can't be null or empty" });
            else if (string.IsNullOrEmpty(updateInstituteLanguageMasterManagement.Code.Trim()))
                return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Name, Message = "Language code can't be null or empty" });
            else
            {
                var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.InstituteLanguageMasters.AnyAsync(x => x.Id == updateInstituteLanguageMasterManagement.Id && x.InstituteId == instituteId))
                {
                    return Ok(await _instituteLanguageMasterManagementRepository.UpdateInstituteLanguageMasterAsync(updateInstituteLanguageMasterManagement, await GetUserCurrentSelectedInstituteIdAsync()));
                }
                else
                    return Ok(new SharedLookUpResponse { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Language not found" });
            }
        }
        #endregion
    }
}
