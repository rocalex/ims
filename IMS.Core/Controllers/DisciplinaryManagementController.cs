using IMS.DomainModel.ApplicationClasses.DisciplinaryManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.DisciplinaryManagement;
using IMS.Utility.InstituteUserMappingHelper;
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
    public class DisciplinaryManagementController: BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IDisciplinaryManagementRepository _disciplinaryManagementRepository;
        #endregion

        #region Constructor
        public DisciplinaryManagementController(IInstituteUserMappingHelperService instituteUserMappingHelperService,
            IMSDbContext iMSDbContext, UserManager<ApplicationUser> userManager, IDisciplinaryManagementRepository 
            disciplinaryManagementRepository)
            :base(instituteUserMappingHelperService)
        {
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
            _disciplinaryManagementRepository = disciplinaryManagementRepository;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddDisciplinaryAsync([FromBody]AddDisciplinaryManagementAc addDisciplinary)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _disciplinaryManagementRepository.AddDisciplinaryAsync(addDisciplinary, user));
        }

        [HttpGet("")]
        public async Task<IActionResult> GetDisciplinariesAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _disciplinaryManagementRepository.GetDisciplinariesAsync(instituteId));
        }

        [HttpGet("{disciplinaryId}")]
        public async Task<IActionResult> GetDisciplinaryAsync(int disciplinaryId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var disciplinary = await _iMSDbContext.Disciplinaries.FirstOrDefaultAsync(x => x.Id == disciplinaryId && x.Student.InstituteId == instituteId);
            return Ok(disciplinary);
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateDisciplinaryAsync([FromBody]UpdateDisciplinaryManagementAc updateDisciplinary)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _disciplinaryManagementRepository.UpdateDisciplinaryAsync(updateDisciplinary, user));
        }

        [HttpGet("initialdata")]
        public async Task<IActionResult> GetInitialDataAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var classes = await _iMSDbContext.InstituteClasses.Where(x => x.InstituteId == instituteId).ToListAsync();
            var staffs = await _iMSDbContext.StaffBasicPersonalInformation.Where(x => x.InstituteId == instituteId).ToListAsync();
            var sections = await _iMSDbContext.Sections.Where(x => x.InstituteId == instituteId).ToListAsync();
            var classSubjectMapping = await _iMSDbContext.InstituteClassSubjectMappings.Where(x => x.InstituteClass.InstituteId == instituteId).ToListAsync();
            var students = await _iMSDbContext.StudentBasicInformation.Where(x => x.InstituteId == instituteId).ToListAsync();
            var statuses = await _iMSDbContext.DisciplinaryStatuses.Where(x => x.InstituteId == instituteId).ToListAsync();
            return Ok(new { classes, staffs, sections, classSubjectMapping, students, statuses });
        }

        [HttpGet("staff")]
        public async Task<IActionResult> GetDisciplinariesForStaffAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var staff = await _iMSDbContext.StaffBasicPersonalInformation.FirstOrDefaultAsync(x => x.UserId == user.Id && x.InstituteId == instituteId);
            var classes = await _iMSDbContext.InstituteClassSubjectMappings.Where(x => x.FacultyId == staff.Id || x.AlternateFacultyId == staff.Id
            && x.InstituteClass.InstituteId == instituteId).Select(s => s.ClassId).ToListAsync();
            var disciplinaries = await _iMSDbContext.Disciplinaries.Include(s=>s.Student).Include(s=>s.Status)
                .Where(x => classes.Contains(x.Student.CurrentClassId)).ToListAsync();
            return Ok(disciplinaries);
        }
        #endregion
    }
}
