using IMS.DomainModel.ApplicationClasses.Library.ExamPaperManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.Library.ExamPaperManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class ExamPaperController : BaseController
    {
        #region
        private const string BaseUrl = "api/[controller]";
        private readonly IExamManagementRepository examManagementRepository;
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public ExamPaperController(
            IExamManagementRepository _examManagementRepository,
            IMSDbContext _iMSDbContext,
            IInstituteUserMappingHelperService instituteUserMappingHelperService) : base(instituteUserMappingHelperService)
        {
            examManagementRepository = _examManagementRepository;
            iMSDbContext = _iMSDbContext;
        }
        #endregion

        #region Public methods
        [HttpGet("")]
        public async Task<IActionResult> GetAllGroupsAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await examManagementRepository.GetExamPapersAsync(instituteId));
        }

        [HttpPost("")]
        public async Task<IActionResult> AddGroupAsync([FromBody]AddExam addGroupAc)
        {
            if (string.IsNullOrEmpty(addGroupAc.PublisherName.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Publisher name can't be null or empty"
                });
            else if (addGroupAc.MappingId == null)
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Subject can't be null or empty"
                });
            else
                return Ok(await examManagementRepository.AddExamPaperAsync(addGroupAc, await GetUserCurrentSelectedInstituteIdAsync()));
        }

        [HttpGet("mapping/{classId}")]
        public async Task<IActionResult> GetClassSbujectMappingAsync(int classId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await iMSDbContext.InstituteClassSubjectMappings
                .Include(x => x.InstituteClass)
                .Include(x => x.InstituteSubject)
                .Include(x => x.Faculty.User)
                .Include(x => x.AlternateFaculty.User)
                .Where(x => x.ClassId == classId && x.InstituteClass.InstituteId == instituteId && x.InstituteSubject.InstituteId == instituteId).ToListAsync());
        }

        [HttpGet("{examPaperId}")]
        public async Task<IActionResult> GetGroupDetailByIdAsync(int examPaperId)
        {
            var institudeId = await GetUserCurrentSelectedInstituteIdAsync();
            var gruop = await iMSDbContext.ExamPapers.Include(s => s.Mapping).Include(s => s.Mapping.InstituteSubject).Include(s => s.Mapping.InstituteClass).FirstOrDefaultAsync(x => x.Id == examPaperId && x.InstituteId == institudeId);
            if (gruop != null)
            {
                return Ok(gruop);
            }
            else
                return Ok(new { Message = "Exam Paper Not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateGroupAsync([FromBody]UpdateExam updateComponentGroupAc)
        {
            if (string.IsNullOrEmpty(updateComponentGroupAc.PublisherName.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Publisher name can't be null or empty"
                });
            else if (updateComponentGroupAc.MappingId == null)
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Subject can't be null or empty"
                });
            else
            {
                var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await iMSDbContext.ExamPapers.AnyAsync(x => x.Id == updateComponentGroupAc.Id && x.InstituteId == instituteId))
                {
                    return Ok(await examManagementRepository.UpdateExamPaperAsync(updateComponentGroupAc, instituteId));
                }
                else
                    return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Exam Paper not found" });
            }
        }
        #endregion
    }
}
