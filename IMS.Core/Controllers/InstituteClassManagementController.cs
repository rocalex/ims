using IMS.DomainModel.ApplicationClasses.InstituteClassManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.InstituteClassManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class InstituteClassManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly IInstituteClassManagementRepository _instituteClassManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public InstituteClassManagementController(IInstituteClassManagementRepository instituteClassManagementRepository, IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _instituteClassManagementRepository = instituteClassManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddInstituteClassAsync([FromBody]AddInstituteClassManagementAc addInstituteClassManagement)
        {
            if (string.IsNullOrEmpty(addInstituteClassManagement.Name.Trim()))
                return Ok(new InstituteClassResponse { ErrorType = InstituteClassResponseType.Name, HasError = true, Message = "Class name can't be null or empty" });
            else if (string.IsNullOrEmpty(addInstituteClassManagement.GroupCode.Trim()))
                return Ok(new InstituteClassResponse { ErrorType = InstituteClassResponseType.GroupCode, HasError = true, Message = "Group code name can't be null or empty" });
            else if (addInstituteClassManagement.Duration < 0)
                return Ok(new InstituteClassResponse { ErrorType = InstituteClassResponseType.Duration, HasError = true, Message = "Duration value must be greater then zero" });
            else if (addInstituteClassManagement.ClassOrder < 0)
                return Ok(new InstituteClassResponse { ErrorType = InstituteClassResponseType.ClassOrder, HasError = true, Message = "Class order value must be greater then zero" });
            else if (addInstituteClassManagement.NumberOfFeeTerms < 0)
                return Ok(new InstituteClassResponse { ErrorType = InstituteClassResponseType.NumberOfFeeTerms, HasError = true, Message = "Number of fee terms value must be greater then zero" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                return Ok(await _instituteClassManagementRepository.AddInstituteClassAsync(addInstituteClassManagement, loggedInUserInstituteId));
            }
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllInstituteClassesAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _instituteClassManagementRepository.GetAllInstituteClassesAsync(loggedInUserInstituteId));
        }

        [HttpGet("{classId}")]
        public async Task<IActionResult> GetInstituteClassDetailByIdAsync(int classId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var InstituteClass = await _iMSDbContext.InstituteClasses.FirstOrDefaultAsync(x => x.Id == classId && x.InstituteId == loggedInUserInstituteId);
            if (InstituteClass != null)
                return Ok(InstituteClass);
            else
                return Ok(new { Message = "Class not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateInstituteClassAsync([FromBody]UpdateInstituteClassManagementAc updateInstituteClassManagement)
        {
            if (string.IsNullOrEmpty(updateInstituteClassManagement.Name.Trim()))
                return Ok(new InstituteClassResponse { ErrorType = InstituteClassResponseType.Name, HasError = true, Message = "Class name can't be null or empty" });
            else if (string.IsNullOrEmpty(updateInstituteClassManagement.GroupCode.Trim()))
                return Ok(new InstituteClassResponse { ErrorType = InstituteClassResponseType.GroupCode, HasError = true, Message = "Group code name can't be null or empty" });
            else if (updateInstituteClassManagement.Duration < 0)
                return Ok(new InstituteClassResponse { ErrorType = InstituteClassResponseType.Duration, HasError = true, Message = "Duration value must be greater then zero" });
            else if (updateInstituteClassManagement.ClassOrder < 0)
                return Ok(new InstituteClassResponse { ErrorType = InstituteClassResponseType.ClassOrder, HasError = true, Message = "Class order value must be greater then zero" });
            else if (updateInstituteClassManagement.NumberOfFeeTerms < 0)
                return Ok(new InstituteClassResponse { ErrorType = InstituteClassResponseType.NumberOfFeeTerms, HasError = true, Message = "Number of fee terms value must be greater then zero" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.InstituteClasses.AnyAsync(x => x.Id == updateInstituteClassManagement.Id && x.InstituteId == loggedInUserInstituteId))
                    return Ok(await _instituteClassManagementRepository.UpdateInstituteClassAsync(updateInstituteClassManagement, loggedInUserInstituteId));
                else
                    return Ok(new InstituteClassResponse { ErrorType = InstituteClassResponseType.Other, HasError = true, Message = "Class not found" });
            }
        }

        [HttpGet("initialdata")]
        public async Task<IActionResult> GetInitialDataAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var staffs = await _iMSDbContext.StaffBasicPersonalInformation.Where(x => x.InstituteId == instituteId).ToListAsync();
            return Ok(new { staffs });
        }
        #endregion
    }
}
