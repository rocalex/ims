using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.SportDetailManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.SportDetailManagement;
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
    public class SportDetailManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly ISportDetailManagementRepository _sportDetailManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public SportDetailManagementController(ISportDetailManagementRepository sportDetailManagementRepository, IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _sportDetailManagementRepository = sportDetailManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddSportDetailAsync([FromBody]AddSportDetailManagementAc addSportDetailManagement)
        {
            if (string.IsNullOrEmpty(addSportDetailManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse { HasError = true, ErrorType = SharedLookUpResponseType.Name, Message = "Sport detail name can't be empty" });
            else if (string.IsNullOrEmpty(addSportDetailManagement.Code.Trim()))
                return Ok(new SharedLookUpResponse { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Sport detail code can't be empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                return Ok(await _sportDetailManagementRepository.AddSportDetailAsync(addSportDetailManagement, loggedInUserInstituteId));
            }
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllSportDetailAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _sportDetailManagementRepository.GetAllSportDetailAsync(loggedInUserInstituteId));
        }

        [HttpGet("{sportDetailId}")]
        public async Task<IActionResult> GetSportDetailDetailByIdAsync(int sportDetailId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var SportDetail = await _iMSDbContext.SportDetails.FirstOrDefaultAsync(x => x.Id == sportDetailId && x.InstituteId == loggedInUserInstituteId);
            if (SportDetail != null)
                return Ok(SportDetail);
            else
                return Ok(new { Message = "Sport detail not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateSportDetailAsync([FromBody]UpdateSportDetailManagementAc updateSportDetailManagement)
        {
            if (string.IsNullOrEmpty(updateSportDetailManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse { HasError = true, ErrorType = SharedLookUpResponseType.Name, Message = "Sport detail name can't be empty" });
            else if (string.IsNullOrEmpty(updateSportDetailManagement.Code.Trim()))
                return Ok(new SharedLookUpResponse { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Sport detail code can't be empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.SportDetails.AnyAsync(x => x.Id == updateSportDetailManagement.SportDetailId && x.InstituteId == loggedInUserInstituteId))
                {
                    return Ok(await _sportDetailManagementRepository.UpdateSportDetailAsync(updateSportDetailManagement, loggedInUserInstituteId));
                }
                else
                    return Ok(new SharedLookUpResponse { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Sport detail not found" });
            }
        }
        #endregion
    }
}
