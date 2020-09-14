using IMS.DomainModel.ApplicationClasses.FeeRefundManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.FeeRefundManagement;
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
    public class FeeRefundManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly IFeeRefundManagementRepository _feeRefundManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public FeeRefundManagementController(IFeeRefundManagementRepository feeRefundManagementRepository, IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _feeRefundManagementRepository = feeRefundManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddFeeRefundAsync([FromBody]AddFeeRefundManagementAc addFeeRefund)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _feeRefundManagementRepository.AddFeeRefundAsync(addFeeRefund, user));
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllFeeRefundsAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _feeRefundManagementRepository.GetAllFeeRefundsAsync(instituteId));
        }

        [HttpGet("{feeRefundId}")]
        public async Task<IActionResult> GetFeeRefundByIdAsync(int feeRefundId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var feeRefund = await _iMSDbContext.FeeRefunds.Include(s=>s.Student).FirstOrDefaultAsync(x => x.Id == feeRefundId && x.Student.InstituteId == instituteId);
            if (feeRefund != null)
                return Ok(feeRefund);
            else
                return Ok(new { Message = "Fee refund not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateFeeRefundAsync([FromBody]UpdateFeeRefundManagementAc updateFeeRefund)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _feeRefundManagementRepository.UpdateFeeRefundAsync(updateFeeRefund, user));
        }

        [HttpGet("intitaldata")]
        public async Task<IActionResult> GetInitialDataAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var loggedInUser = await _userManager.FindByNameAsync(User.Identity.Name);
            var classes = await _iMSDbContext.InstituteClasses.Where(x => x.InstituteId == instituteId).ToListAsync();
            var sections = await _iMSDbContext.Sections.Where(x => x.InstituteId == instituteId).ToListAsync();
            var users = await _iMSDbContext.UserInstituteMappings.Include(s=>s.User).Where(x => x.InstituteId == instituteId).ToListAsync();
            return Ok(new { Classes = classes, Sections = sections, Users = users, LoggedInUser = loggedInUser });
        }

        [HttpGet("searchstudent/{classId}/{sectionId}")]
        public async Task<IActionResult> GetStudentByClassAndSectionIdAsync(int classId, int sectionId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _iMSDbContext.StudentBasicInformation.Where(x => x.CurrentClassId == classId && x.SectionId == sectionId
            && x.InstituteId == instituteId).ToListAsync());
        }
        #endregion
    }
}
