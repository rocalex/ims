using IMS.DomainModel.Models;
using IMS.Repository.DepartmentManagement;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class DepartmentManagementController : Controller
    {
        #region Private Variable(s)

        private const string BaseUrl = "api/[controller]";
        private readonly IDepartmentManagementRepository _departmentManagementRepository;
        private readonly UserManager<ApplicationUser> _userManager;

        #endregion

        #region Constructor

        public DepartmentManagementController(IDepartmentManagementRepository departmentManagementRepository,
            UserManager<ApplicationUser> userManager)
        {
            _departmentManagementRepository = departmentManagementRepository;
            _userManager = userManager;
        }

        #endregion

        #region Public Method(s)

        /// <summary>
        /// Method for fetching the list of all departments
        /// </summary>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        [HttpGet("")]
        public async Task<IActionResult> GetAllDepartmentsAsync()
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            return Ok(await _departmentManagementRepository.GetAllDepartmentsAsync(currentUser));
        }

        /// <summary>
        /// Method for fetching department by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDepartmentByIdAsync(int id)
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            return Ok(await _departmentManagementRepository.GetDepartmentByIdAsync(id, currentUser));
        }

        /// <summary>
        /// Method for adding new department
        /// </summary>
        /// <param name="newDepartment"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        [HttpPost("")]
        public async Task<IActionResult> AddDepartmentAsync([FromBody] Department newDepartment)
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            return Ok(await _departmentManagementRepository.AddDepartmentAsync(newDepartment, currentUser));
        }

        /// <summary>
        /// Method for updating department
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedDepartment"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDepartmentAsync(int id, [FromBody] Department updatedDepartment)
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            return Ok(await _departmentManagementRepository.UpdateDepartmentAsync(id, updatedDepartment, currentUser));
        }

        #endregion
    }
}
