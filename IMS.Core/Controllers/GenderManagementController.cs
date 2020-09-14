using IMS.DomainModel.ApplicationClasses.GenderManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.GenderManagement;
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
    public class GenderManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly IGenderManagementRepository _genderManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public GenderManagementController(IGenderManagementRepository genderManagementRepository, IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _genderManagementRepository = genderManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddGenderAsync([FromBody]AddGenderManagementAc addGenderManagement)
        {
            if (string.IsNullOrEmpty(addGenderManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse() {ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Gender name can't be empty" });
            else if (string.IsNullOrEmpty(addGenderManagement.Code.Trim()))
                return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Gender name can't be empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                return Ok(await _genderManagementRepository.AddGenderAsync(addGenderManagement, loggedInUserInstituteId));
            }
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllGenderAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _genderManagementRepository.GetAllGenderAsync(loggedInUserInstituteId));
        }

        [HttpGet("{genderId}")]
        public async Task<IActionResult> GetGenderDetailByIdAsync(int genderId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var Gender = await _iMSDbContext.Genders.FirstOrDefaultAsync(x => x.Id == genderId && x.InstituteId == loggedInUserInstituteId);
            if (Gender != null)
                return Ok(Gender);
            else
                return Ok(new { Message = "Gender not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateGenderAsync([FromBody]UpdateGenderManagementAc updateGenderManagement)
        {
            if (string.IsNullOrEmpty(updateGenderManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Gender name can't be empty" });
            else if (string.IsNullOrEmpty(updateGenderManagement.Code.Trim()))
                return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Gender name can't be empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.Genders.AnyAsync(x => x.Id == updateGenderManagement.GenderId && x.InstituteId == loggedInUserInstituteId))
                {
                    return Ok(await _genderManagementRepository.UpdateGenderAsync(updateGenderManagement, loggedInUserInstituteId));
                }
                else
                    return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Gender not found" });
            }
        }
        #endregion
    }
}
