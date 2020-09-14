using IMS.DomainModel.ApplicationClasses.FeeManagement;
using IMS.DomainModel.ApplicationClasses.StudentFeeManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Repository.FeeManagement;
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
    public class FeeManagementController : BaseController
    {
        #region Private Variable(s)

        private const string BaseUrl = "api/[controller]";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IFeeManagementRepository _feeManagementRepository;
        private readonly IMSDbContext _imsDbContext;

        #endregion

        #region Constructor

        public FeeManagementController(UserManager<ApplicationUser> userManager,
            IInstituteUserMappingHelperService instituteUserMappingHelperService,
            IFeeManagementRepository feeManagementRepository,
            IMSDbContext imsDbContext)
            : base(instituteUserMappingHelperService)
        {
            _userManager = userManager;
            _feeManagementRepository = feeManagementRepository;
            _imsDbContext = imsDbContext;
        }

        #endregion

        #region Public Method(s)

        #region Fee Component

        [HttpGet("component")]
        public async Task<IActionResult> GetAllFeeComponentsAsync()
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _feeManagementRepository.GetAllFeeComponentsAsync(currentUserInstituteId));
        }

        [HttpGet("component/{feeComponentId}")]
        public async Task<IActionResult> GetFeeComponentByIdAsync(int feeComponentId)
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _feeManagementRepository.GetFeeComponentByIdAsync(feeComponentId, currentUserInstituteId));
        }

        [HttpPost("component")]
        public async Task<IActionResult> AddNewFeeComponentAsync([FromBody] FeeComponent addedFeeComponent)
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            return Ok(await _feeManagementRepository.AddNewFeeComponentAsync(addedFeeComponent, currentUser, currentUserInstituteId));
        }

        [HttpPut("component")]
        public async Task<IActionResult> UpdateFeeComponentAsync([FromBody] FeeComponent updatedFeeComponent)
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _feeManagementRepository.UpdateFeeComponentAsync(currentUserInstituteId, updatedFeeComponent));
        }

        #endregion

        #region Course Fee Terms

        [HttpGet("coursefeeterms/class")]
        public async Task<IActionResult> GetClassListForCourseFeeTermsAsync()
        {
            return Ok(await _feeManagementRepository.GetClassListForCourseFeeTermsAsync(await GetUserCurrentSelectedInstituteIdAsync()));
        }

        [HttpGet("coursefeeterms/bundle/{classId}")]
        public async Task<IActionResult> GetCourseFeeTermInitialDataAsync(int classId)
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            InstituteClass instituteClass = await _imsDbContext.InstituteClasses.FirstOrDefaultAsync(x => x.Id == classId && x.InstituteId == currentUserInstituteId);
            List<Religion> religionsList = await _imsDbContext.Religions.Where(x => x.InstituteId == currentUserInstituteId).ToListAsync();
            List<FeeComponent> feeComponentsList = await _imsDbContext.FeeComponents.Where(x => x.InstituteId == currentUserInstituteId && x.FeeComponentType == FeeComponentTypeEnum.ApplicableToAll).ToListAsync();
            List<InstituteAcademicYear> academicYearsList = await _imsDbContext.InstituteAcademicYears.Where(x => x.InstituteId == currentUserInstituteId).ToListAsync();

            List<CourseFeeTerm> courseFeeTermsList = await _imsDbContext.CourseFeeTerms.Where(x => x.ClassId == classId).ToListAsync();

            return Ok(new { Class = instituteClass, ReligionsList = religionsList, FeeComponentsList = feeComponentsList, AcademicYearsList = academicYearsList, CourseFeeTermsList = courseFeeTermsList });
        }

        [HttpGet("coursefeeterms/details/{courseFeeTermId}/term/{termNumber}")]
        public async Task<IActionResult> GetDistributedFeeStructureAsync(int courseFeeTermId, int termNumber)
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _feeManagementRepository.GetDistributedFeeStructureAsync(currentUserInstituteId, courseFeeTermId, termNumber));
        }

        [HttpPost("coursefeeterms/addorupdate")]
        public async Task<IActionResult> AddOrUpdateCourseFeeTermsAsync([FromBody] AddCourseFeeTermAc addCourseFeeTermAc)
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            return Ok(await _feeManagementRepository.AddOrUpdateCourseFeeTermsAsync(addCourseFeeTermAc, currentUserInstituteId, currentUser));
        }

        #endregion

        #region Student Fee Report

        [HttpGet("report/initialdata")]
        public async Task<IActionResult> GetStudentFeeReportInitialDataAsync()
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();

            List<Religion> religionsList = await _imsDbContext.Religions.Where(x => x.InstituteId == currentUserInstituteId).ToListAsync();
            List<InstituteClass> classList = await _imsDbContext.InstituteClasses.Where(x => x.InstituteId == currentUserInstituteId).ToListAsync();
            List<Section> sectionsList = await _imsDbContext.Sections.Where(x => x.InstituteId == currentUserInstituteId).ToListAsync();
            List<StudentBasicInformation> studentsList = await _imsDbContext.StudentBasicInformation.Where(x => x.InstituteId == currentUserInstituteId).ToListAsync();

            return Ok(new { ReligionsList = religionsList, ClassList = classList, SectionsList = sectionsList, StudentsList = studentsList });
        }

        [HttpPost("report/excel/download")]
        public async Task<FileResult> GenerateStudentFeeExcelReportAsync([FromBody] FeeManagementReportQueryAc feeManagementReportQueryAc)
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            FeeManagementReportResponseAc feeManagementReportResponse = await _feeManagementRepository.GenerateStudentFeeReportAsync(feeManagementReportQueryAc, currentUserInstituteId);
            return File(feeManagementReportResponse.FileByteArray, feeManagementReportResponse.ResponseType, feeManagementReportResponse.FileName);
        }

        [HttpPost("report/pdf/download")]
        public async Task<IActionResult> GenerateStudentFeePdfReportAsync([FromBody] FeeManagementReportQueryAc feeManagementReportQueryAc)
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            FeeManagementReportResponseAc feeManagementReportResponse = await _feeManagementRepository.GenerateStudentFeeReportAsync(feeManagementReportQueryAc, currentUserInstituteId);
            return Ok(feeManagementReportResponse);
        }

        #endregion

        #endregion
    }
}
