using IMS.DomainModel.ApplicationClasses.RoleManagement;
using IMS.DomainModel.Models;
using IMS.Repository.RoleManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class RoleManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly IRoleManagementRepository _roleManagementRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public RoleManagementController(IRoleManagementRepository roleManagementRepository, UserManager<ApplicationUser> userManager,
            IInstituteUserMappingHelperService instituteUserMappingHelperService) : base(instituteUserMappingHelperService)
        {
            _roleManagementRepository = roleManagementRepository;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        [Authorize]
        [HttpPost("")]
        public async Task<IActionResult> AddNewRoleAsync([FromBody]AddRoleAc addRole)
        {
            if (ModelState.IsValid)
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                var response = await _roleManagementRepository.AddNewRoleAsync(addRole.RoleName, loggedInUserInstituteId);
                return Ok(new { Message = response });
            }
            else
                return Ok(new { Message = "Role name can't be empty or null" });
        }

        [Authorize]
        [HttpGet("")]
        public async Task<IActionResult> GetAllRolesAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _roleManagementRepository.GetAllRolesAsync(loggedInUserInstituteId));
        }
        #endregion
    }
}
