using IMS.DomainModel.ApplicationClasses.MotherTongueManagement;
using IMS.DomainModel.Models;
using IMS.Repository.MotherTongueManagement;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class MotherTongueManagementController : Controller
    {
        #region Private Variable(s)

        private const string BaseUrl = "api/[controller]";
        private readonly IMotherTongueManagementRepository _motherTongueManagementRepository;
        private readonly UserManager<ApplicationUser> _userManager;

        #endregion

        #region Constructor

        public MotherTongueManagementController(IMotherTongueManagementRepository motherTongueManagementRepository,
            UserManager<ApplicationUser> userManager)
        {
            _motherTongueManagementRepository = motherTongueManagementRepository;
            _userManager = userManager;
        }

        #endregion

        #region Public Method(s)

        /// <summary>
        /// Method for fetching the list of all mother tongues
        /// </summary>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        [HttpGet("")]
        public async Task<IActionResult> GetAllMotherTonguesAsync()
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            return Ok(await _motherTongueManagementRepository.GetAllMotherTonguesAsync(currentUser));
        }

        /// <summary>
        /// Method for fetching mother tongue by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMotherTongueByIdAsync(int id)
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            return Ok(await _motherTongueManagementRepository.GetMotherTongueByIdAsync(id, currentUser));
        }

        /// <summary>
        /// Method for adding new mother tongue
        /// </summary>
        /// <param name="newMotherTongue"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        [HttpPost("")]
        public async Task<IActionResult> AddMotherTongueAsync([FromBody] MotherTongueAc newMotherTongueAc)
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            return Ok(await _motherTongueManagementRepository.AddMotherTongueAsync(newMotherTongueAc, currentUser));
        }

        /// <summary>
        /// Method for updating mother tongue
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedMotherTongue"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMotherTongueAsync(int id, [FromBody] MotherTongueAc updatedMotherTongueAc)
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            return Ok(await _motherTongueManagementRepository.UpdateMotherTongueAsync(id, updatedMotherTongueAc, currentUser));
        }

        #endregion
    }
}
