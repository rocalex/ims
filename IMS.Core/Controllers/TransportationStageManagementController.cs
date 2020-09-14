using IMS.DomainModel.ApplicationClasses.TransportationStageManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.TransportationStageManagement;
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
    public class TransportationStageManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ITransportationStageManagementRepository _transportationStageManagementRepository;
        private readonly IMSDbContext _imsDbContext;
        #endregion

        #region Constructor
        public TransportationStageManagementController(UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService
            instituteUserMappingHelperService, ITransportationStageManagementRepository transportationStageManagementRepository,
            IMSDbContext imsDbContext) : base(instituteUserMappingHelperService)
        {
            _userManager = userManager;
            _transportationStageManagementRepository = transportationStageManagementRepository;
            _imsDbContext = imsDbContext;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddTransportationStageAsync([FromBody]AddTransportationStageManagementAc addTransportationStage)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _transportationStageManagementRepository.AddTransportationStageAsync(addTransportationStage, user));
        }

        [HttpGet("")]
        public async Task<IActionResult> GetTransportationStagesAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _transportationStageManagementRepository.GetTransportationStagesAsync(instituteId));
        }

        [HttpGet("{stageId}")]
        public async Task<IActionResult> GetTransportationStageAsync(int stageId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var driver = await _imsDbContext.TransportationStages.FirstOrDefaultAsync(x => x.Id == stageId && x.InstituteId == instituteId);
            if (driver != null)
                return Ok(driver);
            else
                return Ok(new { Message = "Stage not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateTransportationStageAsync([FromBody]UpdateTransportationStageManagementAc updateTransportationStage)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _transportationStageManagementRepository.UpdateTransportationStageAsync(updateTransportationStage, user));
        }

        [HttpGet("initialdata")]
        public async Task<IActionResult> GetInitialDataAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var slabs = await _imsDbContext.Slabs.Where(x => x.InstituteId == instituteId).ToListAsync();
            return Ok(new { slabs });
        }
        #endregion
    }
}
