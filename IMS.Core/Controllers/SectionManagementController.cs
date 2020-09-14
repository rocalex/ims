using IMS.DomainModel.ApplicationClasses.SectionManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.SectionManagement;
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
    public class SectionManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly ISectionManagementRepository _sectionManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public SectionManagementController(ISectionManagementRepository sectionManagementRepository, IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _sectionManagementRepository = sectionManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddSectionAsync([FromBody]AddSectionManagementAc addSectionManagement)
        {
            if (string.IsNullOrEmpty(addSectionManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Section name can't be empty" });
            else if (string.IsNullOrEmpty(addSectionManagement.Code.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Section name can't be empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                return Ok(await _sectionManagementRepository.AddSectionAsync(addSectionManagement, loggedInUserInstituteId));
            }
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllSectionAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _sectionManagementRepository.GetAllSectionAsync(loggedInUserInstituteId));
        }

        [HttpGet("{sectionId}")]
        public async Task<IActionResult> GetSectionDetailByIdAsync(int sectionId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var Section = await _iMSDbContext.Sections.FirstOrDefaultAsync(x => x.Id == sectionId && x.InstituteId == loggedInUserInstituteId);
            if (Section != null)
                return Ok(Section);
            else
                return Ok(new { Message = "Section not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateSectionAsync([FromBody]UpdateSectionManagementAc updateSectionManagement)
        {
            if (string.IsNullOrEmpty(updateSectionManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Section name can't be empty" });
            else if (string.IsNullOrEmpty(updateSectionManagement.Code.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Section name can't be empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.Sections.AnyAsync(x => x.Id == updateSectionManagement.SectionId && x.InstituteId == loggedInUserInstituteId))
                {
                    return Ok(await _sectionManagementRepository.UpdateSectionAsync(updateSectionManagement, loggedInUserInstituteId));
                }
                else
                    return Ok(new SharedLookUpResponse { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Section not found" });
            }
        }
        #endregion
    }
}
