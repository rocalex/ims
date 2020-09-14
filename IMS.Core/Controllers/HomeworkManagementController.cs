using IMS.DomainModel.ApplicationClasses.HomeworkManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.HomeworkManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class HomeworkManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IHomeworkManagementRepository _homeworkManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        #endregion

        #region Constructor
        public HomeworkManagementController(UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService
            instituteUserMappingHelperService, IHomeworkManagementRepository homeworkManagementRepository,
            IMSDbContext iMSDbContext) : base(instituteUserMappingHelperService)
        {
            _userManager = userManager;
            _homeworkManagementRepository = homeworkManagementRepository;
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddOrUpdateHomeworkAsync([FromBody]AddHomeworkManagementAc addHomework)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _homeworkManagementRepository.AddOrUpdateHomeworkAsync(addHomework, user));
        }

        [HttpPost("search")]
        public async Task<IActionResult> GetHomeworkAsync([FromBody]GetHomeworkAc getHomework)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _homeworkManagementRepository.GetHomeworkAsync(getHomework, instituteId));
        }

        [HttpGet("{staffId}/{classId}/{sectionId}")]
        public async Task<IActionResult> GetHomeworkAsync(int staffId, int classId, int sectionId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _homeworkManagementRepository.GetHomeworkAsync(staffId, classId, sectionId, instituteId));
        }

        [HttpGet("initialdata")]
        public async Task<IActionResult> GetInitialDataAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var classes = await _iMSDbContext.InstituteClasses.Where(x => x.InstituteId == instituteId).ToListAsync();
            var staffs = await _iMSDbContext.StaffBasicPersonalInformation.Where(x => x.InstituteId == instituteId).ToListAsync();
            var sections = await _iMSDbContext.Sections.Where(x => x.InstituteId == instituteId).ToListAsync();
            var subjects = await _iMSDbContext.InstituteSubjects.Where(x => x.InstituteId == instituteId).ToListAsync();
            var classSubjectMapping = await _iMSDbContext.InstituteClassSubjectMappings.Where(x => x.InstituteClass.InstituteId == instituteId).ToListAsync();
            var students = await _iMSDbContext.StudentBasicInformation.Where(x => x.InstituteId == instituteId).ToListAsync();
            return Ok(new { classes, staffs, sections, subjects, classSubjectMapping, students });
        }

        [HttpPost("message")]
        public async Task<IActionResult> SendMessageAsync([FromBody]AddHomeworkMessageMappingAc homeworkMessage)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _homeworkManagementRepository.SendMessageAsync(homeworkMessage, instituteId));
        }

        [HttpPost("mail")]
        public async Task<IActionResult> SendMailAsync([FromBody]AddHomeworkMailMappingAc homeworkMail)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _homeworkManagementRepository.SendMailAsync(homeworkMail, instituteId));
        }

        [HttpPost("studenthomework")]
        public async Task<IActionResult> GetStudentHomeworkAsync([FromBody]DateTime dateTime)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var student = await _iMSDbContext.StudentBasicInformation.FirstOrDefaultAsync(x => x.InstituteId == instituteId && x.UserId == user.Id);
            if (student == null)
                return Ok(new { HasError = true, Message = "Student not found" });
            else
            {
                var homeworks = await _iMSDbContext.Homeworks.Include(s=>s.HomeworkSubjectMappings)
                    .Where(x => x.ClassId == student.CurrentClassId && x.SectionId == student.SectionId
                    && x.HomeworkDate.Date == dateTime.Date).ToListAsync();
                foreach (var homework in homeworks)
                {
                    foreach (var subject in homework.HomeworkSubjectMappings)
                    {
                        subject.Subject = await _iMSDbContext.InstituteSubjects.FirstAsync(x => x.Id == subject.SubjectId);
                    }
                    homework.LastHomeworkMailMapping = await _iMSDbContext.HomeworkMailMappings.Include(q=>q.StudentRecieveHomeworkMailMappings)
                        .OrderByDescending(s=>s.CreatedOn).FirstOrDefaultAsync(x => x.HomeworkId == homework.Id);
                    homework.LastHomeworkMessageMapping = await _iMSDbContext.HomeworkMessageMappings.Include(q=>q.StudentRecieveHomeworkMessageMappings)
                        .OrderByDescending(s => s.CreatedOn).FirstOrDefaultAsync(x => x.HomeworkId == homework.Id);
                }
                return Ok(new { HasError = false, Data = homeworks, StudentId = student.Id });
            }
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllHomeworksAsync()
        {
            int instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _homeworkManagementRepository.GetAllHomeworksAsync(instituteId));
        }
        #endregion
    }
}
