using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.StudentFeeManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class StudentFeeManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly IStudentFeeManagementRepository _studentFeeManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public StudentFeeManagementController(IStudentFeeManagementRepository studentFeeManagementRepository, IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _studentFeeManagementRepository = studentFeeManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        [HttpGet("{studentId}")]
        public async Task<IActionResult> GetStudentFeeAsync(int studentId)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _studentFeeManagementRepository.GetStudentFeeAsync(studentId, user));
        }

        [HttpPut("{studentFeeId}")]
        public async Task<IActionResult> UpdateStudentFeeAsync([FromBody]List<StudentFeeComponent> studentFeeComponents, int studentFeeId)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _studentFeeManagementRepository.UpdateStudentFeeAsync(studentFeeComponents, studentFeeId, user));
        }

        [HttpGet("intitaldata")]
        public async Task<IActionResult> GetInitialDataAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var classes = await _iMSDbContext.InstituteClasses.Where(x => x.InstituteId == instituteId).ToListAsync();
            var sections = await _iMSDbContext.Sections.Where(x => x.InstituteId == instituteId).ToListAsync();
            return Ok(new { Classes = classes, Sections = sections });
        }
        #endregion
    }
}
