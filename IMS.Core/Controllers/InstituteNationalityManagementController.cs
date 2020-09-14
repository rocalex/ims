using IMS.DomainModel.ApplicationClasses.InstituteNationalityManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.InstituteNationalityManagement;
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
    public class InstituteNationalityManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IInstituteNationalityManagementRepository _instituteNationalityManagementRepository;
        #endregion

        #region Constructor
        public InstituteNationalityManagementController(IMSDbContext iMSDbContext, UserManager<ApplicationUser> userManager,
            IInstituteNationalityManagementRepository instituteNationalityManagementRepository, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
            _instituteNationalityManagementRepository = instituteNationalityManagementRepository;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddInstituteNationalityAsync([FromBody]AddInstituteNationalityAc addInstituteNationality)
        {
            if (string.IsNullOrEmpty(addInstituteNationality.Name.Trim()))
                return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Name, Message = "Nationality name can't be empty" });
            else if (string.IsNullOrEmpty(addInstituteNationality.Code.Trim()))
                return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Nationality code can't be empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                return Ok(await _instituteNationalityManagementRepository.AddInstituteNationalityAsync(addInstituteNationality, loggedInUserInstituteId));
            }
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllInstituteNationalityAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _instituteNationalityManagementRepository.GetAllInstituteNationalityAsync(loggedInUserInstituteId));
        }

        [HttpGet("{nationalityId}")]
        public async Task<IActionResult> GetInstituteNationalityDetailAsync(int nationalityId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var nationality = await _iMSDbContext.InstituteNationalities.FirstOrDefaultAsync(x => x.Id == nationalityId
             && x.InstituteId == loggedInUserInstituteId);
            if (nationality != null)
                return Ok(nationality);
            else
                return Ok(new { Message = "Nationality not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateInstituteNationalityAsync([FromBody]UpdateInstituteNationalityAc updateInstituteNationality)
        {
            if (string.IsNullOrEmpty(updateInstituteNationality.Name.Trim()))
                return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Name, Message = "Nationality name can't be empty" });
            else if (string.IsNullOrEmpty(updateInstituteNationality.Code.Trim()))
                return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Nationality code can't be empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.InstituteNationalities.AnyAsync(x => x.InstituteId == loggedInUserInstituteId && x.Id == updateInstituteNationality.NationalityId))
                    return Ok(await _instituteNationalityManagementRepository.UpdateInstituteNationalityAsync(updateInstituteNationality, loggedInUserInstituteId));
                else
                    return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Nationality not found" });
            }
        }
        #endregion
    }
}
