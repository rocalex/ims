using IMS.DomainModel.ApplicationClasses.FeeReceiptManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Repository.AutoSequenceGeneratorManagement;
using IMS.Repository.FeeReceiptManagement;
using IMS.Repository.StudentFeeManagement;
using IMS.Utility.EnumHelper;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class FeeReceiptManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IFeeReceiptManagementRepository _feeReceiptManagementRepository;
        private readonly IMSDbContext _imsDbContext;
        private readonly IStudentFeeManagementRepository _studentFeeManagementRepository;
        private readonly IAutoSequenceGeneratorManagementRepository _autoSequenceGeneratorManagementRepository;
        #endregion

        #region Constructor
        public FeeReceiptManagementController(UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService,
            IFeeReceiptManagementRepository feeReceiptManagementRepository, IMSDbContext imsDbContext,
            IStudentFeeManagementRepository studentFeeManagementRepository,
            IAutoSequenceGeneratorManagementRepository autoSequenceGeneratorManagementRepository) : base(instituteUserMappingHelperService)
        {
            _userManager = userManager;
            _feeReceiptManagementRepository = feeReceiptManagementRepository;
            _imsDbContext = imsDbContext;
            _studentFeeManagementRepository = studentFeeManagementRepository;
            _autoSequenceGeneratorManagementRepository = autoSequenceGeneratorManagementRepository;
        }
        #endregion

        #region Public Method(s)
        [HttpGet("initialdata")]
        public async Task<IActionResult> GetInitialDataAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var religions = await _imsDbContext.Religions.Where(x => x.InstituteId == instituteId).ToListAsync();
            var classes = await _imsDbContext.InstituteClasses.Where(x => x.InstituteId == instituteId).ToListAsync();
            var sections = await _imsDbContext.Sections.Where(x => x.InstituteId == instituteId).ToListAsync();
            return Ok(new { religions, classes, sections });
        }

        [HttpGet("searchstudent/{classId}/{sectionId}/{religionId}")]
        public async Task<IActionResult> GetStudentByClassReligionAndSectionIdAsync(int classId, int sectionId, int? religionId)
        {
            if (religionId.HasValue)
                return Ok(await _imsDbContext.StudentBasicInformation.Where(x => x.CurrentClassId == classId
                && x.SectionId == sectionId && x.ReligionId == religionId.Value).ToListAsync());
            else
                return Ok(await _imsDbContext.StudentBasicInformation.Where(x => x.CurrentClassId == classId
                && x.SectionId == sectionId).ToListAsync());
        }

        [HttpGet("searchcomponent/{classId}/{religionId}")]
        public async Task<IActionResult> GetFeeComponentAsync(int classId, int? religionId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var academicYear = await _imsDbContext.InstituteAcademicYears.FirstOrDefaultAsync(x => x.InstituteId == instituteId && x.IsActive);
            if (academicYear != null)
            {
                CourseFeeTerm courseFeeTerms = new CourseFeeTerm();
                if (religionId.HasValue)
                    courseFeeTerms = await _imsDbContext.CourseFeeTerms.FirstOrDefaultAsync(x => x.ClassId == classId
                    && x.AcademicYearId == academicYear.Id && x.InstituteId == instituteId && x.ReligionId == religionId.Value);
                else
                    courseFeeTerms = await _imsDbContext.CourseFeeTerms.FirstOrDefaultAsync(x => x.ClassId == classId
                    && x.AcademicYearId == academicYear.Id && x.InstituteId == instituteId);
                if (courseFeeTerms != null)
                {
                    var courseFeeTermComponents = await _imsDbContext.CourseFeeTermDetails.Where(x => x.CourseFeeTermId == courseFeeTerms.Id).ToListAsync();
                    var feeComponents = await _imsDbContext.FeeComponents.OrderByDescending(x => x.Priority).Where(x => x.InstituteId == instituteId).ToListAsync();
                    feeComponents.Reverse();
                    var terms = (await _imsDbContext.InstituteClasses.FirstAsync(x => x.Id == classId)).NumberOfFeeTerms;
                    return Ok(new { courseFeeTermComponents, feeComponents, terms });
                }
                else
                    return Ok(new { Message = "No record found" });
            }
            else
                return Ok(new { Message = "No record found" });
        }

        [HttpPost("studentfeecomponent")]
        public async Task<IActionResult> GetStudentFeesAsync([FromBody]List<int> studentIds)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var studentFees = await _imsDbContext.StudentFees.Include(s => s.StudentFeeComponents).Where(x => studentIds.Contains(x.StudentId)).ToListAsync();
            return Ok(studentFees);
        }

        [HttpPost("")]
        public async Task<IActionResult> AddFeeReceiptAsync([FromBody]List<AddFeeReceiptManagementAc> addFeeReceipts)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var studentIds = addFeeReceipts.Select(x => x.StudentId).ToList();
            studentIds = studentIds.Distinct().ToList();
            var studentCount = await _imsDbContext.StudentBasicInformation.CountAsync(x => studentIds.Contains(x.Id));
            if (studentIds.Count == studentCount)
            {
                var user = await _userManager.FindByNameAsync(User.Identity.Name);
                return Ok(await _feeReceiptManagementRepository.AddFeeReceiptAsync(addFeeReceipts, user));
            }
            else
                return Ok(new FeeReceiptManagementResponse() { HasError = true, Message = "Student not found", ErrorType = FeeReceiptManagementType.StudentId });
        }
        
        [HttpGet("")]
        public async Task<IActionResult> GetAllFeeReceiptsAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _feeReceiptManagementRepository.GetAllFeeReceiptsAsync(instituteId));
        }

        [HttpGet("{feeReceiptId}")]
        public async Task<IActionResult> GetFeeReceiptsByIdAsync(int feeReceiptId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var feeReceipt = await _imsDbContext.FeeReceipts.Include(s=>s.FeeReceiptComponents).FirstOrDefaultAsync(x => x.Id == feeReceiptId 
            && x.Student.InstituteId == instituteId);
            if (feeReceipt != null)
            {
                feeReceipt.ReceiptTypeDescription = EnumHelperService.GetDescription(feeReceipt.ReceiptType);
                return Ok(feeReceipt);
            }
            else
                return Ok(new { Message = "Fee receipt not found" });
        }

        [HttpGet("generator/{count}")]
        public async Task<IActionResult> GetAutoSequenceNumberByTypeAndInstituteIdAsync(int count)
        {
            List<string> receiptNumber = new List<string>();
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            for (int i = 0; i < count; i++)
            {
                var response = await _autoSequenceGeneratorManagementRepository
                    .GetAutoSequenceNumberByTypeAndInstituteIdAsync(instituteId, AutoSequenceGeneratorTypeEnum.ReceiptNumber);
                if (response.HasValue)
                    receiptNumber.Add(response.Data);
            }
            return Ok(receiptNumber);
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateFeeReceiptAsync([FromBody]FeeReceipt feeReceipt)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            if (await _imsDbContext.FeeReceipts.AnyAsync(x => x.Id == feeReceipt.Id && x.Student.InstituteId == instituteId))
            {
                var user = await _userManager.FindByNameAsync(User.Identity.Name);
                feeReceipt.UpdatedById = user.Id;
                feeReceipt.ReceiptType = EnumHelperService.GetValueFromDescription<ReceiptTypeEnum>(feeReceipt.ReceiptTypeDescription);
                feeReceipt.UpdatedOn = DateTime.UtcNow;
                _imsDbContext.FeeReceipts.Update(feeReceipt);
                await _imsDbContext.SaveChangesAsync();
                return Ok(new { HasError = false, Message = "Fee receipt updated successfully" });
            }
            else
                return Ok(new { HasError = true, Message = "Fee receipt not found" });
        }

        [HttpGet("initialdata/report")]
        public async Task<IActionResult> GetInitialDataForReportsAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var classes = await _imsDbContext.InstituteClasses.Where(x => x.InstituteId == instituteId).ToListAsync();
            var sections = await _imsDbContext.Sections.Where(x => x.InstituteId == instituteId).ToListAsync();
            var religions = await _imsDbContext.Religions.Where(x => x.InstituteId == instituteId).ToListAsync();
            var academicYears = await _imsDbContext.InstituteAcademicYears.Where(x => x.InstituteId == instituteId).ToListAsync();
            var genders = await _imsDbContext.Genders.Where(x => x.InstituteId == instituteId).ToListAsync();
            var students = await _imsDbContext.StudentBasicInformation.Include(s => s.CurrentClass).Include(s => s.Religion)
                .Include(s => s.Gender).Where(x => x.InstituteId == instituteId).ToListAsync();
            var currentYear = academicYears.FirstOrDefault(x => x.IsActive);
            if (currentYear != null)
                students = students.Where(x => x.CurrentAcademicYearId == currentYear.Id).ToList();
            var feeReciepts = await _imsDbContext.FeeReceipts.Include(s=>s.Student).Include(w=>w.UpdatedBy).Where(x => x.Class.InstituteId == instituteId).ToListAsync();
            var refunds = await _imsDbContext.FeeRefunds.Include(s => s.Student).Include(w => w.UpdatedBy).Where(x => x.Student.InstituteId == instituteId).ToListAsync();
            return Ok(new { classes, sections, religions, academicYears, genders, students, feeReciepts, refunds });
        }
        #endregion
    }
}
