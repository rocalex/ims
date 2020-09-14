using IMS.DomainModel.ApplicationClasses.InstituteManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.InstituteManagement;
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
    public class InstituteManagementController : Controller
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly IInstituteManagementRepository _instituteManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public InstituteManagementController(IInstituteManagementRepository instituteManagementRepository, IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager)
        {
            _instituteManagementRepository = instituteManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        [Authorize(Roles = "SuperAdmin")]
        [HttpPost("")]
        public async Task<IActionResult> AddInstituteAsync([FromBody]AddInstituteAc addInstitute)
        {
            if (ModelState.IsValid)
            {
                if (!await _iMSDbContext.Institutes.AnyAsync(x => x.Code.ToLowerInvariant() == addInstitute.Code.ToLowerInvariant()))
                {
                    if (!await _iMSDbContext.Institutes.AnyAsync(x => x.Name.ToLowerInvariant() == addInstitute.InstituteName.ToLowerInvariant()))
                    {
                        await _instituteManagementRepository.AddInstituteAsync(addInstitute);
                        return Ok(new InstituteResponseAc() { HasError = false, Message = "Added Successfully" });
                    }
                    else
                        return Ok(new InstituteResponseAc { ErrorType = InstituteResponseType.InstituteName, HasError = true, Message = "Institute with same name already exist" });
                }
                else
                    return Ok(new InstituteResponseAc { ErrorType = InstituteResponseType.Code, HasError = true, Message = "Institute with same code already exist" });
            }
            else
            {
                if (string.IsNullOrEmpty(addInstitute.InstituteName.Trim()))
                    return Ok(new InstituteResponseAc() { ErrorType = InstituteResponseType.InstituteName, HasError = true, Message = "Institute name can't be empty" });
                else if (string.IsNullOrEmpty(addInstitute.Code.Trim()))
                    return Ok(new InstituteResponseAc() { ErrorType = InstituteResponseType.Code, HasError = true, Message = "Institute code can't be empty" });
                else
                    return Ok(new InstituteResponseAc() { ErrorType = InstituteResponseType.InstituteAdminEmail, HasError = true, Message = "Email address can't be empty" });
            }
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpGet("")]
        public async Task<IActionResult> GetAllInstituteAsync()
        {
            return Ok(await _instituteManagementRepository.GetAllInstituteAsync());
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpGet("{instituteId}")]
        public async Task<IActionResult> GetInstituteDetailAsync(int instituteId)
        {
            var institute = await _iMSDbContext.Institutes.FirstOrDefaultAsync(x => x.Id == instituteId);
            return Ok(institute);
        }

        [HttpGet("institutesforuser")]
        public async Task<IActionResult> GetInstitutesForLoggedInUserAsync()
        {
            var loggedInUser = await _userManager.FindByNameAsync(User.Identity.Name);
            var list = await _iMSDbContext.UserInstituteMappings.Include(c => c.Institute).Where(x => x.UserId == loggedInUser.Id).ToListAsync();
            return Ok(list);
        }

        [HttpGet("institutesforuser/{instituteId}")]
        public async Task<IActionResult> UpdateCurrentInstituteAsync(int instituteId)
        {
            var loggedInUser = await _userManager.FindByNameAsync(User.Identity.Name);
            if (!await _iMSDbContext.UserInstituteMappings.AnyAsync(x => x.InstituteId == instituteId && x.UserId == loggedInUser.Id))
                return Ok(new { Message = "Institute not found" });
            else
            {
                var mappings = await _iMSDbContext.UserInstituteMappings.Where(x => x.UserId == loggedInUser.Id).ToListAsync();
                mappings.ForEach(x =>
                {
                    if (x.InstituteId == instituteId)
                        x.IsActive = true;
                    else
                        x.IsActive = false;
                });
                _iMSDbContext.UserInstituteMappings.UpdateRange(mappings);
                await _iMSDbContext.SaveChangesAsync();
                return Ok(new { Message = "User institute mapping updated successfully" });
            }
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpGet("allusers")]
        public async Task<IActionResult> GetAllUserAsnyc()
        {
            return Ok(await _iMSDbContext.Users.ToListAsync());
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpPut("")]
        public async Task<IActionResult> UpdateInstituteAsync([FromBody]UpdateInstituteAc updateInstitute)
        {
            return Ok(await _instituteManagementRepository.UpdateInstituteAsync(updateInstitute));
        }
        #endregion
    }
}
