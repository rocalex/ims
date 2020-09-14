using IMS.DomainModel.ApplicationClasses.StudentRelievingManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.StudentRelievingManagement;
using IMS.Utility.EnumHelper;
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
    public class StudentRelievingManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly IStudentRelievingManagementRepository _studentRelievingManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public StudentRelievingManagementController(IStudentRelievingManagementRepository studentRelievingManagementRepository, IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _studentRelievingManagementRepository = studentRelievingManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddStudentRelievingAsync([FromBody]List<AddStudentRelievingManagementAc> addStudentRelieving)
        {
            var studentIds = addStudentRelieving.Select(x => x.StudentId).ToList();
            var students = await _iMSDbContext.StudentBasicInformation.CountAsync(x => studentIds.Contains(x.Id));
            if (studentIds.Count != students)
                return Ok(new StudentRelievingManagementResponse() { HasError = true, Message = "Student not found", ErrorType = StudentRelievingManagementResponseType.StudentId });
            else
                return Ok(await _studentRelievingManagementRepository.AddStudentRelievingAsync(addStudentRelieving, await _userManager.FindByNameAsync(User.Identity.Name)));
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllStudentRelievingMappingsAsync()
        {
            var loggedInUser = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _studentRelievingManagementRepository.GetAllStudentRelievingMappingsAsync(loggedInUser));
        }

        [HttpGet("{relievingId}")]
        public async Task<IActionResult> GetStudentRelievingDetailByIdAsync(int relievingId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var relieving = await _iMSDbContext.StudentRelievingMappings.Include(s=>s.Student).FirstOrDefaultAsync(x => x.Id == relievingId && x.Student.InstituteId == loggedInUserInstituteId);
            if (relieving == null)
                return Ok(new StudentRelievingManagementResponse() { HasError = true, Message = "Student not found", ErrorType = StudentRelievingManagementResponseType.StudentId });
            else
            {
                relieving.StudentRelievingDescription = EnumHelperService.GetDescription(relieving.StudentRelieving);
                return Ok(relieving);
            }
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateStudentRelievingAsync([FromBody]UpdateStudentRelievingManagementAc updateStudentRelieving)
        {
            var loggedInUser = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _studentRelievingManagementRepository.UpdateStudentRelievingAsync(updateStudentRelieving, loggedInUser));
        }

        [HttpGet("classstudent/{classId}")]
        public async Task<IActionResult> GetStudentByClassIdAsync(int classId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            if (await _iMSDbContext.InstituteClasses.AnyAsync(x => x.Id == classId && x.InstituteId == instituteId))
            {
                List<StudentBasicInformation> studentBasicInformation = new List<StudentBasicInformation>();
                var students = await _iMSDbContext.StudentBasicInformation.Where(x => x.CurrentClassId == classId).ToListAsync();
                var relievedStudents = await _iMSDbContext.StudentRelievingMappings.Where(x => x.Student.InstituteId == instituteId).Select(x => x.StudentId).ToListAsync();
                students.ForEach(x =>
                {
                    if (!relievedStudents.Contains(x.Id))
                        studentBasicInformation.Add(x);
                });
                var user = await _userManager.FindByNameAsync(User.Identity.Name);
                var academicYear = await _iMSDbContext.SelectedAcademicYears.FirstOrDefaultAsync(x => x.UserId == user.Id &&
                x.AcademicYear.InstituteId == instituteId);
                if (academicYear != null)
                    studentBasicInformation = studentBasicInformation.Where(x => x.CurrentAcademicYearId == academicYear.AcademicYearId).ToList();
                return Ok(studentBasicInformation);
            }
            else
                return Ok(new { Message = "Class not found" });
        }
        #endregion
    }
}
