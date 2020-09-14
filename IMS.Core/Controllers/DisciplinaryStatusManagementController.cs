using IMS.DomainModel.ApplicationClasses.DisciplinaryStatusManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.DisciplinaryStatusManagement;
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
    public class DisciplinaryStatusManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly IDisciplinaryStatusManagementRepository _disciplinaryStatusManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public DisciplinaryStatusManagementController(IDisciplinaryStatusManagementRepository disciplinaryStatusManagementRepository, IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _disciplinaryStatusManagementRepository = disciplinaryStatusManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddDisciplinaryStatusAsync([FromBody]AddDisciplinaryStatusManagementAc addDisciplinaryStatusManagement)
        {
            if (string.IsNullOrEmpty(addDisciplinaryStatusManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Disciplinary status name can't be empty" });
            if (string.IsNullOrEmpty(addDisciplinaryStatusManagement.Code.Trim()))
                return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Disciplinary status code can't be empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                return Ok(await _disciplinaryStatusManagementRepository.AddDisciplinaryStatusAsync(addDisciplinaryStatusManagement, loggedInUserInstituteId));
            }
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllDisciplinaryStatusAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _disciplinaryStatusManagementRepository.GetAllDisciplinaryStatusAsync(loggedInUserInstituteId));
        }

        [HttpGet("{disciplinaryStatusId}")]
        public async Task<IActionResult> GetDisciplinaryStatusDetailByIdAsync(int disciplinaryStatusId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var DisciplinaryStatus = await _iMSDbContext.DisciplinaryStatuses.FirstOrDefaultAsync(x => x.Id == disciplinaryStatusId && x.InstituteId == loggedInUserInstituteId);
            if (DisciplinaryStatus != null)
                return Ok(DisciplinaryStatus);
            else
                return Ok(new { Message = "Disciplinary status not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateDisciplinaryStatusAsync([FromBody]UpdateDisciplinaryStatusManagementAc updateDisciplinaryStatusManagement)
        {
            if (string.IsNullOrEmpty(updateDisciplinaryStatusManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Disciplinary status name can't be empty" });
            if (string.IsNullOrEmpty(updateDisciplinaryStatusManagement.Code.Trim()))
                return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Disciplinary status code can't be empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.DisciplinaryStatuses.AnyAsync(x => x.Id == updateDisciplinaryStatusManagement.Id && x.InstituteId == loggedInUserInstituteId))
                {
                    return Ok(await _disciplinaryStatusManagementRepository.UpdateDisciplinaryStatusAsync(updateDisciplinaryStatusManagement, loggedInUserInstituteId));
                }
                else
                    return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Disciplinary status not found" });
            }
        }
        #endregion
    }
}
