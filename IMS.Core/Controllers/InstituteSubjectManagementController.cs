using IMS.DomainModel.ApplicationClasses.InstituteSubjectManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.InstituteSubjectManagement;
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
    public class InstituteSubjectManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly IInstituteSubjectManagementRepository _instituteSubjectManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public InstituteSubjectManagementController(IInstituteSubjectManagementRepository instituteSubjectManagementRepository,
            IMSDbContext iMSDbContext, UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _instituteSubjectManagementRepository = instituteSubjectManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddInstituteSubjectAsync([FromBody]AddInstituteSubjectManagementAc addInstituteSubjectManagement)
        {
            if (string.IsNullOrEmpty(addInstituteSubjectManagement.Name.Trim()))
                return Ok(new InstituteSubjectResponse { ErrorType = InstituteSubjectResponseType.Name, HasError = true, Message = "Subject name can't be null or empty" });
            else if (string.IsNullOrEmpty(addInstituteSubjectManagement.Code.Trim()))
                return Ok(new InstituteSubjectResponse { ErrorType = InstituteSubjectResponseType.Code, HasError = true, Message = "Subject code name can't be null or empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                return Ok(await _instituteSubjectManagementRepository.AddInstituteSubjectAsync(addInstituteSubjectManagement, loggedInUserInstituteId));
            }
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllInstituteSubjectsAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _instituteSubjectManagementRepository.GetAllInstituteSubjectsAsync(loggedInUserInstituteId));
        }

        [HttpGet("{subjectId}")]
        public async Task<IActionResult> GetInstituteSubjectDetailByIdAsync(int subjectId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var InstituteSubject = await _iMSDbContext.InstituteSubjects.FirstOrDefaultAsync(x => x.Id == subjectId && x.InstituteId == loggedInUserInstituteId);
            if (InstituteSubject != null)
                return Ok(InstituteSubject);
            else
                return Ok(new { Message = "Subject not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateInstituteSubjectAsync([FromBody]UpdateInstituteSubjectManagementAc updateInstituteSubjectManagement)
        {
            if (string.IsNullOrEmpty(updateInstituteSubjectManagement.Name.Trim()))
                return Ok(new InstituteSubjectResponse { ErrorType = InstituteSubjectResponseType.Name, HasError = true, Message = "Subject name can't be null or empty" });
            else if (string.IsNullOrEmpty(updateInstituteSubjectManagement.Code.Trim()))
                return Ok(new InstituteSubjectResponse { ErrorType = InstituteSubjectResponseType.Code, HasError = true, Message = "Subject code name can't be null or empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.InstituteSubjects.AnyAsync(x => x.Id == updateInstituteSubjectManagement.Id && x.InstituteId == loggedInUserInstituteId))
                    return Ok(await _instituteSubjectManagementRepository.UpdateInstituteSubjectAsync(updateInstituteSubjectManagement, loggedInUserInstituteId));
                else
                    return Ok(new InstituteSubjectResponse { ErrorType = InstituteSubjectResponseType.Other, HasError = true, Message = "Subject not found" });
            }
        }
        #endregion
    }
}
