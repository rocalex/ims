using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.MarkManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.MarkManagement;
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
    public class MarkManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly IMarkManagementRepository _markManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public MarkManagementController(IMarkManagementRepository markManagementRepository, IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _markManagementRepository = markManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        #region Exam Definition
        [HttpPost("examdefinition")]
        public async Task<IActionResult> AddExamDefinitionAsync([FromBody]AddExamDefinitionAc addExamDefinitionManagement)
        {
            if (string.IsNullOrEmpty(addExamDefinitionManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Exam definition name can't be empty" });
            else if (string.IsNullOrEmpty(addExamDefinitionManagement.Code.Trim()))
                return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Exam definition code can't be empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                return Ok(await _markManagementRepository.AddExamDefinitionAsync(addExamDefinitionManagement, loggedInUserInstituteId));
            }
        }

        [HttpGet("examdefinition")]
        public async Task<IActionResult> GetAllExamDefinitionAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _markManagementRepository.GetAllExamDefinitionAsync(loggedInUserInstituteId));
        }

        [HttpGet("examdefinition/{examDefinitionId}")]
        public async Task<IActionResult> GetExamDefinitionDetailByIdAsync(int examDefinitionId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var examDefinition = await _iMSDbContext.ExamDefinitions.FirstOrDefaultAsync(x => x.Id == examDefinitionId && x.InstituteId == loggedInUserInstituteId);
            if (examDefinition != null)
                return Ok(examDefinition);
            else
                return Ok(new { Message = "Exam definition not found" });
        }

        [HttpPut("examdefinition")]
        public async Task<IActionResult> UpdateExamDefinitionAsync([FromBody]UpdateExamDefinitionAc updateExamDefinitionManagement)
        {
            if (string.IsNullOrEmpty(updateExamDefinitionManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Exam definition name can't be empty" });
            else if (string.IsNullOrEmpty(updateExamDefinitionManagement.Code.Trim()))
                return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Exam definition code can't be empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.ExamDefinitions.AnyAsync(x => x.Id == updateExamDefinitionManagement.ExamDefinitionId && x.InstituteId == loggedInUserInstituteId))
                {
                    return Ok(await _markManagementRepository.UpdateExamDefinitionAsync(updateExamDefinitionManagement, loggedInUserInstituteId));
                }
                else
                    return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Exam definition not found" });
            }
        }
        #endregion

        #region Class Exam
        [HttpGet("classexam/initialdata")]
        public async Task<IActionResult> GetInititalDataAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var classes = await _iMSDbContext.InstituteClasses.Where(x => x.InstituteId == instituteId).ToListAsync();
            var sections = await _iMSDbContext.Sections.Where(x => x.InstituteId == instituteId).ToListAsync();
            var examDefinitions = await _iMSDbContext.ExamDefinitions.Where(x => x.InstituteId == instituteId).ToListAsync();
            var subjects = await _iMSDbContext.InstituteSubjects.Where(x => x.InstituteId == instituteId).ToListAsync();
            return Ok(new { classes, sections, examDefinitions, subjects });
        }

        [HttpPost("classexam")]
        public async Task<IActionResult> AddClassExamAsync([FromBody]AddClassExamAc addClassExam)
        {
            var loggedInUser = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _markManagementRepository.AddClassExamAsync(addClassExam, loggedInUser));
        }

        [HttpGet("classexam")]
        public async Task<IActionResult> GetAllClassExamsAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _markManagementRepository.GetAllClassExamsAsync(instituteId));
        }

        [HttpGet("classexam/{classexamId}")]
        public async Task<IActionResult> GetClassExamsAsync(int classexamId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var classexam = await _iMSDbContext.ClassExams.FirstOrDefaultAsync(x => x.Id == classexamId && x.Exam.InstituteId == instituteId);
            if (classexam != null)
            {
                var list = await _iMSDbContext.ClassExamSubjectMappings.Where(x => x.ClassExamId == classexamId).ToListAsync();
                classexam.ClassExamSubjectMappings = list;
                return Ok(classexam);
            }
            else
                return Ok(new { Message = "Class exam not found" });
        }

        [HttpPut("classexam")]
        public async Task<IActionResult> UpdateClassExamResponseAsync([FromBody]UpdateClassExamAc updateClassExam)
        {
            var loggedInUser = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _markManagementRepository.UpdateClassExamResponseAsync(updateClassExam, loggedInUser));
        }
        #endregion

        #region Exam Score Entry
        [HttpPost("examscoreentry")]
        public async Task<IActionResult> AddOrUpdateExamScoreEntryAsync([FromBody]List<AddExamScoreEntryAc> addExamScoreEntries)
        {
            var loggedInUser = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _markManagementRepository.AddOrUpdateExamScoreEntryAsync(addExamScoreEntries, loggedInUser));
        }

        [HttpGet("examscoreentry/{examId}")]
        public async Task<IActionResult> GetExamScoreEntriesAsync(int examId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _markManagementRepository.GetExamScoreEntriesAsync(examId, instituteId));
        }

        [HttpGet("examscoreentry/classexam/{classId}/{sectionId}")]
        public async Task<IActionResult> GetClassExamByClassAndSectionIdAsync(int classId, int sectionId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var list = await _iMSDbContext.ClassExams.Include(s=>s.Exam).Where(x => x.ClassId == classId && x.SectionId == sectionId
            && x.Exam.InstituteId == instituteId).ToListAsync();
            return Ok(list);
        }
        #endregion
        #endregion
    }
}
