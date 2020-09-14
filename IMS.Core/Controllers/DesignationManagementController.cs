using IMS.DomainModel.Models;
using IMS.Repository.DesignationManagement;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class DesignationManagementController : Controller
    {
        #region Private Variable(s)

        private const string BaseUrl = "api/[controller]";
        private readonly IDesignationManagementRepository _designationManagementRepository;
        private readonly UserManager<ApplicationUser> _userManager;

        #endregion

        #region Constructor

        public DesignationManagementController(IDesignationManagementRepository designationManagementRepository,
            UserManager<ApplicationUser> userManager)
        {
            _designationManagementRepository = designationManagementRepository;
            _userManager = userManager;
        }

        #endregion

        #region Public Method(s)

        /// <summary>
        /// Method for fetching the list of all designations
        /// </summary>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        [HttpGet("")]
        public async Task<IActionResult> GetAllDesignationsAsync()
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            return Ok(await _designationManagementRepository.GetAllDesignationsAsync(currentUser));
        }

        /// <summary>
        /// Method for fetching designation by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDesignationByIdAsync(int id)
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            return Ok(await _designationManagementRepository.GetDesignationByIdAsync(id, currentUser));
        }

        /// <summary>
        /// Method for adding new designation
        /// </summary>
        /// <param name="newDesignation"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        [HttpPost("")]
        public async Task<IActionResult> AddDesignationAsync([FromBody] Designation newDesignation)
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            return Ok(await _designationManagementRepository.AddDesignationAsync(newDesignation, currentUser));
        }

        /// <summary>
        /// Method for updating designation
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedDesignation"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDesignationAsync(int id, [FromBody] Designation updatedDesignation)
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            return Ok(await _designationManagementRepository.UpdateDesignationAsync(id, updatedDesignation, currentUser));
        }

        #endregion
    }
}
