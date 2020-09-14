using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.QualificationManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.QualificationManagement;
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
    public class QualificationManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly IQualificationManagementRepository _qualificationManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public QualificationManagementController(IQualificationManagementRepository qualificationManagementRepository,
            IMSDbContext iMSDbContext, UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _qualificationManagementRepository = qualificationManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddQualificationAsync([FromBody]AddQualificationManagementAc addQualificationManagement)
        {
            if (string.IsNullOrEmpty(addQualificationManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Name, Message = "Qualification name can't be empty" });
            else if (string.IsNullOrEmpty(addQualificationManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Qualification code can't be empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                return Ok(await _qualificationManagementRepository.AddQualificationAsync(addQualificationManagement, loggedInUserInstituteId));
            }
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllQualificationAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _qualificationManagementRepository.GetAllQualificationAsync(loggedInUserInstituteId));
        }

        [HttpGet("{qualificationId}")]
        public async Task<IActionResult> GetQualificationDetailByIdAsync(int qualificationId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var Qualification = await _iMSDbContext.Qualifications.FirstOrDefaultAsync(x => x.Id == qualificationId && x.InstituteId == loggedInUserInstituteId);
            if (Qualification != null)
                return Ok(Qualification);
            else
                return Ok(new { Message = "Qualification not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateQualificationAsync([FromBody]UpdateQualificationManagementAc updateQualificationManagement)
        {
            if (string.IsNullOrEmpty(updateQualificationManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Name, Message = "Qualification name can't be empty" });
            else if (string.IsNullOrEmpty(updateQualificationManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Qualification code can't be empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.Qualifications.AnyAsync(x => x.Id == updateQualificationManagement.QualificationId && x.InstituteId == loggedInUserInstituteId))
                    return Ok(await _qualificationManagementRepository.UpdateQualificationAsync(updateQualificationManagement, loggedInUserInstituteId));
                else
                    return Ok(new SharedLookUpResponse { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Qualification not found" });
            }
        }
        #endregion
    }
}
