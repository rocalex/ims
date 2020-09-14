using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.ReligionManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.ReligionManagement;
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
    public class ReligionManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly IReligionManagementRepository _religionManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public ReligionManagementController(IReligionManagementRepository religionManagementRepository, IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _religionManagementRepository = religionManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddReligionAsync([FromBody]AddReligionManagementAc addReligionManagement)
        {
            if (string.IsNullOrEmpty(addReligionManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse { HasError = true, ErrorType = SharedLookUpResponseType.Name, Message = "Religion name can't be empty" });
            else if (string.IsNullOrEmpty(addReligionManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Religion code can't be empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                return Ok(await _religionManagementRepository.AddReligionAsync(addReligionManagement, loggedInUserInstituteId));
            }
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllReligionAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _religionManagementRepository.GetAllReligionAsync(loggedInUserInstituteId));
        }

        [HttpGet("{religionId}")]
        public async Task<IActionResult> GetReligionDetailByIdAsync(int religionId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var religion = await _iMSDbContext.Religions.FirstOrDefaultAsync(x => x.Id == religionId && x.InstituteId == loggedInUserInstituteId);
            if (religion != null)
                return Ok(religion);
            else
                return Ok(new { Message = "Religion not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateReligionAsync([FromBody]UpdateReligionManagementAc updateReligionManagement)
        {
            if (string.IsNullOrEmpty(updateReligionManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse { HasError = true, ErrorType = SharedLookUpResponseType.Name, Message = "Religion name can't be empty" });
            else if (string.IsNullOrEmpty(updateReligionManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Religion code can't be empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.Religions.AnyAsync(x => x.Id == updateReligionManagement.ReligionId && x.InstituteId == loggedInUserInstituteId))
                {
                    return Ok(await _religionManagementRepository.UpdateReligionAsync(updateReligionManagement, loggedInUserInstituteId));
                }
                else
                    return Ok(new SharedLookUpResponse { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Religion not found" });
            }
        }
        #endregion
    }
}
