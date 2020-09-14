using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.ReligionCategoryManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.ReligionCategoryManagement;
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
    public class ReligionCategoryManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly IReligionCategoryManagementRepository _religionCategoryManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public ReligionCategoryManagementController(IReligionCategoryManagementRepository religionCategoryManagementRepository,
            IMSDbContext iMSDbContext, UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _religionCategoryManagementRepository = religionCategoryManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddReligionCategoryAsync([FromBody]AddReligionCategoryManagementAc addReligionCategoryManagement)
        {
            if (string.IsNullOrEmpty(addReligionCategoryManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Name, Message = "Religion category name can't be empty" });
            else if (string.IsNullOrEmpty(addReligionCategoryManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Religion category code can't be empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                return Ok(await _religionCategoryManagementRepository.AddReligionCategoryAsync(addReligionCategoryManagement, loggedInUserInstituteId));
            }
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllReligionCategoryAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _religionCategoryManagementRepository.GetAllReligionCategoryAsync(loggedInUserInstituteId));
        }

        [HttpGet("{ReligionCategoryId}")]
        public async Task<IActionResult> GetReligionCategoryDetailByIdAsync(int ReligionCategoryId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var ReligionCategory = await _iMSDbContext.ReligionCategories.FirstOrDefaultAsync(x => x.Id == ReligionCategoryId && x.InstituteId == loggedInUserInstituteId);
            if (ReligionCategory != null)
                return Ok(ReligionCategory);
            else
                return Ok(new { Message = "Religion category not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateReligionCategoryAsync([FromBody]UpdateReligionCategoryManagementAc updateReligionCategoryManagement)
        {
            if (string.IsNullOrEmpty(updateReligionCategoryManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Name, Message = "Religion category name can't be empty" });
            else if (string.IsNullOrEmpty(updateReligionCategoryManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Religion category code can't be empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.ReligionCategories.AnyAsync(x => x.Id == updateReligionCategoryManagement.ReligionCategoryId && x.InstituteId == loggedInUserInstituteId))
                {
                    return Ok(await _religionCategoryManagementRepository.UpdateReligionCategoryAsync(updateReligionCategoryManagement, loggedInUserInstituteId));
                }
                else
                    return Ok(new SharedLookUpResponse { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Religion category not found" });
            }
        }
        #endregion
    }
}
