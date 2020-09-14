using IMS.DomainModel.ApplicationClasses.StudentPromotionManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.StudentPromotionManagement;
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
    public class StudentPromotionManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly IStudentPromotionManagementRepository _studentPromotionManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public StudentPromotionManagementController(IStudentPromotionManagementRepository studentPromotionManagementRepository, IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _studentPromotionManagementRepository = studentPromotionManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddStudentPromotionAsync([FromBody]List<AddStudentPromotionManagementAc> addStudentPromotions)
        {
            var loggedInUser = await _userManager.FindByNameAsync(User.Identity.Name);
            var classIds = addStudentPromotions.Select(x => x.CurrentClassId).ToList();
            classIds.AddRange(addStudentPromotions.Select(x => x.PromotedToClassId).ToList());
            classIds = classIds.Distinct().ToList();
            var classCount = await _iMSDbContext.InstituteClasses.CountAsync(x => classIds.Contains(x.Id));
            var sectionIds = addStudentPromotions.Select(x => x.CurrentSectionId).ToList();
            sectionIds.AddRange(addStudentPromotions.Select(x => x.PromotedToSectionId).ToList());
            sectionIds = sectionIds.Distinct().ToList();
            var sectionCount = await _iMSDbContext.Sections.CountAsync(x => sectionIds.Contains(x.Id));
            var studentIds = addStudentPromotions.Select(x => x.StudentId).ToList();
            var studentCount = await _iMSDbContext.StudentBasicInformation.CountAsync(x => studentIds.Contains(x.Id));
            if (classCount != classIds.Count)
                return Ok(new StudentPromotionManagementResponse() { HasError = true, Message = "Class not found", ErrorType = StudentPromotionManagementResponseType.ClassId });
            else if (sectionIds.Count != sectionCount)
                return Ok(new StudentPromotionManagementResponse() { HasError = true, Message = "Section not found", ErrorType = StudentPromotionManagementResponseType.SectionId });
            else if (studentIds.Count != studentCount)
                return Ok(new StudentPromotionManagementResponse() { HasError = true, Message = "Student not found", ErrorType = StudentPromotionManagementResponseType.StudentId });
            else
                return Ok(await _studentPromotionManagementRepository.AddStudentPromotionAsync(addStudentPromotions, loggedInUser));
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllStudentPromotionAsync()
        {
            var loggedInUser = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _studentPromotionManagementRepository.GetAllStudentPromotionAsync(loggedInUser));
        }

        [HttpGet("{promotionId}")]
        public async Task<IActionResult> GetStudentPromotionByIdAsync(int promotionId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var relieving = await _iMSDbContext.StudentPromotionMappings.Include(a => a.Student).Include(a => a.CurrentClass)
                .Include(a => a.CurrentSection).Include(a => a.PromotedToClass).Include(a => a.PromotedToSection)
                .FirstOrDefaultAsync(x => x.Id == promotionId && x.Student.InstituteId == loggedInUserInstituteId);
            if (relieving == null)
                return Ok(new StudentPromotionManagementResponse() { HasError = true, Message = "Student not found", ErrorType = StudentPromotionManagementResponseType.StudentId });
            else
                return Ok(relieving);
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateStudentPromotionAsync([FromBody]UpdateStudentPromotionManagementAc updateStudentPromotion)
        {
            var loggedInUser = await _userManager.FindByNameAsync(User.Identity.Name);
            var classIds = new List<int>() { updateStudentPromotion.CurrentClassId, updateStudentPromotion.PromotedToClassId };
            classIds = classIds.Distinct().ToList();
            var classCount = await _iMSDbContext.InstituteClasses.CountAsync(x => classIds.Contains(x.Id));
            var sectionIds = new List<int>() { updateStudentPromotion.CurrentSectionId, updateStudentPromotion.PromotedToSectionId };
            var sectionCount = await _iMSDbContext.Sections.CountAsync(x => sectionIds.Contains(x.Id));
            sectionIds = sectionIds.Distinct().ToList();
            if (classCount != classIds.Count)
                return Ok(new StudentPromotionManagementResponse() { HasError = true, Message = "Class not found", ErrorType = StudentPromotionManagementResponseType.ClassId });
            else if (sectionIds.Count != sectionCount)
                return Ok(new StudentPromotionManagementResponse() { HasError = true, Message = "Section not found", ErrorType = StudentPromotionManagementResponseType.SectionId });
            else
                return Ok(await _studentPromotionManagementRepository.UpdateStudentPromotionAsync(updateStudentPromotion, loggedInUser));
        }

        [HttpGet("intialdata")]
        public async Task<IActionResult> GetIntialDataForPromotionAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var classes = await _iMSDbContext.InstituteClasses.Where(x => x.InstituteId == instituteId).ToListAsync();
            var sections = await _iMSDbContext.Sections.Where(x => x.InstituteId == instituteId).ToListAsync();
            return Ok(new { Classes = classes, Sections = sections });
        }

        [HttpGet("classstudent/{classId}/{sectionId}")]
        public async Task<IActionResult> GetStudentByClassIdAsync(int classId, int sectionId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            if (await _iMSDbContext.InstituteClasses.AnyAsync(x => x.Id == classId && x.InstituteId == instituteId))
            {
                if (!await _iMSDbContext.Sections.AnyAsync(x => x.Id == sectionId))
                    return Ok(new { Message = "Class not found" });
                else
                {
                    List<StudentBasicInformation> studentBasicInformation = new List<StudentBasicInformation>();
                    var students = await _iMSDbContext.StudentBasicInformation.Where(x => x.CurrentClassId == classId && x.SectionId == sectionId).ToListAsync();
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
            }
            else
                return Ok(new { Message = "Class not found" });
        }
        #endregion
    }
}
