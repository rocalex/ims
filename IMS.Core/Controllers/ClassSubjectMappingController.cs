using IMS.DomainModel.ApplicationClasses;
using IMS.DomainModel.ApplicationClasses.UserManagement;
using IMS.DomainModel.Models;
using IMS.Repository.ClassSubjectMappingManagement;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class ClassSubjectMappingController : Controller
    {
        #region Private variables

        private const string BaseUrl = "api/[controller]";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IClassSubjectMappingManagementRepository _classSubjectMappingManagementRepository;

        #endregion

        #region Constructor

        public ClassSubjectMappingController(UserManager<ApplicationUser> userManager,
            IClassSubjectMappingManagementRepository classSubjectMappingManagementRepository)
        {
            _userManager = userManager;
            _classSubjectMappingManagementRepository = classSubjectMappingManagementRepository;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Method for fetching the class-subject mappings by class id
        /// </summary>
        /// <param name="classId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        [HttpGet("{classId}")]
        public async Task<IActionResult> GetClassSubjectMappingByClassIdAsync(int classId)
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            Tuple<List<StaffBasicPersonalInformation>, List<ClassSubjectMappingAc>> result = await _classSubjectMappingManagementRepository.GetClassSubjectMappingByClassIdAsync(classId, currentUser);
            return Ok(new { Faculties = result.Item1, ClassSubjectMappings = result.Item2 });
        }

        /// <summary>
        /// Method for bulk updating class-subject mappings
        /// </summary>
        /// <param name="classSubjectMappingsList"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        [HttpPut("")]
        public async Task<IActionResult> BulkUpdateClassSubjectMapping([FromBody] List<ClassSubjectMappingAc> classSubjectMappingsList)
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            return Ok(await _classSubjectMappingManagementRepository.BulkUpdateClassSubjectMapping(classSubjectMappingsList, currentUser));
        }

        #endregion
    }
}
